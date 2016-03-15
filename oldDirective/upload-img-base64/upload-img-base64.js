module.directive('uploadImgBase64', function() {
    return {
        templateUrl: 'application/directive/upload-img-base64/upload-img-base64.html',
        restrict: 'E',
        replace: true,
        transclude: true,
        scope: {
            uploadData: '='
        },
        controller: function($scope, $timeout, $http,service) {
            //uploadData：
            // $scope.uploadData = {
            //     uploadNum: 0,   //上传图片位置
            //     upCancel: false, //是否取消上传
            //     scope: {},      //返回$scope
            //     cb: function() {}
            // };
            //------------------------------------------------------------------------------------------------------------
            $scope.uploadData.scope = $scope;

            //显示隐藏Loading
            $scope.upLoading = false;
            //封面默认图
            $scope.newImg = 'img/icon-65.gif';
            /**
             * [selectImg 选择要上传的图片]
             * @return {[type]} [description]
             */
            $scope.selectImg = function() {
                $('#input-image').trigger('click');
            };

            //确认上传图片
            $scope.confirmImg = function() {
                if ($scope.upLoading === true) {
                    return;
                }
                var result = imgCropper.cropper('getCroppedCanvas', {
                    width: 320,
                    style: 'display:none',
                    fillColor:'#FFFFFF'
                });

                result.id = 'canvas';
                result.display = false;
                $('#view-img').html(result);
                imgCropper.on({
                    'zoom.cropper': function(e) {
                        console.log(e.type, e.ratio);
                    }
                });
                $timeout(function() {
                    var code = $('#canvas')[0].toDataURL('img/png');
                    console.log(code);

                    var arr = code.split(',');
                    if (arr.length !== 2) {
                        service.dialog.alert('图片转换失败，请重试');
                        return;
                    }
                    $scope.upLoading = true;
                    $scope.uploadBasePic({
                        baseCode: arr[1]
                    });
                });
            };

            //取消上传图片
            $scope.cancelImg = function() {
                $scope.upLoading = false;
                if ($('#upload-img').get(0).style.display === "block") {
                    $('#upload-img').get(0).off();
                }
                $scope.uploadData.upCancel = true;
            };

            //base64图片上传
            $scope.uploadBasePic = function(args) {
                var postData = {
                    m: args.m || 'C',
                    pub: args.pub || '1',
                    picType: args.picType || '1',
                    fileName: args.fileName || '1.png',
                    base64: 1,
                    token: rcpAid.getToken()
                };
                $http({
                    method: 'POST',
                    url: g_conf.uploadAddrNew + '?' + $.param(postData),
                    data: args.baseCode || '',
                    headers: {
                        'Content-Type': 'text/plain; charset=utf-8'
                    }
                }).success(function(rs) {
                    $scope.upLoading = false;
                    if ($('#upload-img').get(0).style.display === "block") {
                        $('#upload-img').get(0).off();
                    }
                    $scope.uploadData.cb(rs);
                }).error(function(data) {
                    $scope.upLoading = false;
                    console.log(data);
                });
            };

            //切割组件功能初始化
            var imgCropper = $('.cropper-img > img');
            imgCropper.cropper({
                aspectRatio: 16 / 9,
                autoCropArea: 0.85,
                preview: '.img-preview',
                strict: false,
                guides: true,
                highlight: true,
                dragCrop: false,
                cropBoxMovable: true,
                cropBoxResizable: false
            });
            //切割组件运行
            var imgCropCtrl = {
                URL: window.URL || window.webkitURL,
                blobURL: null,
                inputImage: $('#input-image')
            };
            imgCropCtrl.inputImage.change(function() {
                var files = this.files;
                var file;
                if (!imgCropper.data('cropper')) {
                    return;
                }
                if (files && files.length) {
                    file = files[0];
                    if (/^image\/\w+$/.test(file.type)) {
                        $('#upload-img').window({
                            mask: false
                        });
                        imgCropCtrl.blobURL = imgCropCtrl.URL.createObjectURL(file);
                        imgCropper.one('built.cropper', function() {
                            imgCropCtrl.URL.revokeObjectURL(imgCropCtrl.blobURL); // Revoke when load complete
                        }).cropper('reset').cropper('replace', imgCropCtrl.blobURL);
                        imgCropCtrl.inputImage.val('');
                    } else {
                        service.dialog.alert('只支持以下格式图片上传：png,jpg,bmp,gif,jpeg。');
                        imgCropCtrl.blobURL = imgCropCtrl.URL.createObjectURL(file);
                        imgCropCtrl.inputImage.val('');
                    }
                }
            });
        }
    };
});
