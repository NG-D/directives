/* global uer */

window.isUploadFinish = function(){
    for(var i=0;i<uer.files.length;i++){
        if(uer.files[i].Status !== 'L' && uer.files[i].Status !== 'E' && uer.files[i].Status !== 'A'){
            return false;
        }
    }
    return true;
};

angular.module('RCP').directive('uploadImg', function() {
    return {
        restrict: 'AE',
        scope: {
            selectFile: '=',
            upload: '=',
            onProcess: '=',
            onSuccess: '=',
            onErr: '='
        },
        template: '<input ng-show="isIe9==false" style="display:none;" type="file" multiple id="uploader-{{id}}" />' +
            '<div ng-show="isIe9==true" id="swfUploader-{{id}}" class="add-pic mg-t10">' +
            '请先安装FLASH播放器！' +
            '<a href="http://www.adobe.com/go/getflashplayer"><img src="http://www.adobe.com/images/shared/download_buttons/get_flash_player.gif" alt="Get Adobe Flash player" /></a>',
        controller: ['$scope', '$timeout', 'service', function($scope, $timeout, service) {
            $scope.upload = {
                status: 'wait',
                rate: 0,
                speed: 0,
                file: [],
                img: []
            };
            $scope.isIe9 = false;
            if (isIE(9, 9)) {
                $scope.isIe9 = true;
                $timeout(function() {
                    SwfUpload('swfUploader-' + $scope.id, $scope, 'swfUpCb');
                }, 1000);
            }
            $scope.id = new Date().getTime();
            $scope.swfUpCb = function(opt, rs) {
                if (rs.code == 0) {
                    $scope.upload.img.push(rs.data);
                }
            };
            $scope.selectFile = function() {
                setTimeout(function () {
                    if ($scope.isIe9) {
                        $('#swfUploader-' + $scope.id).trigger('click');
                        return;
                    }
                    $('#uploader-' + $scope.id).trigger('click');
                }, 100);
                uer.AddI('uploader-' + $scope.id, {
                    pub: 1,
                    picType: 2
                }, {
                    OnProcess: function(f, rate, speed) {
                        $scope.upload.status = 'uploading';
                        $scope.upload.rate = rate;
                        $scope.upload.speed = speed;
                        $scope.upload.file = f;
                        if ($scope.onProcess && typeof $scope.onProcess == 'function') {
                            $scope.onProcess(f);
                        }
                        try{
                            $scope.$apply();
                        }catch(e){}
                    },
                    OnSuccess: function(f, data) {
                        $scope.upload.status = 'success';
                        $scope.upload.rate = 0;
                        $scope.upload.speed = 0;
                        $scope.upload.file = f;
                        $scope.upload.img.push(data.data);
                        $timeout(function() {
                            $scope.upload.status = 'wait';
                        }, 2000);
                        if ($scope.onSuccess && typeof $scope.onSuccess == 'function') {
                            $scope.onSuccess(f);
                        }
                        try{
                            $scope.$apply();
                        }catch(e){}
                    },
                    OnErr: function() {
                        $scope.upload.status = 'error';
                        $scope.upload.rate = 0;
                        $scope.upload.speed = 0;
                        if ($scope.onErr && typeof $scope.onErr == 'function') {
                            $scope.onErr();
                        }
                        try{
                            $scope.$apply();
                        }catch(e){}
                    }
                });
            };

            uer.OnSelect = function(item) {
                var flag = filter(item);

                return flag;
            };

            var picArr = ['png', 'jpg', 'bmp', 'gif', 'jpeg'];

            var filter = function(item) {
                var flag = true;
                angular.forEach(item.files, function(file) {
                    var fileExt = file.name.split('.').pop().toLowerCase();
                    if ($.inArray(fileExt, picArr) === -1) {
                        service.dialog.alert('只支持以下格式图片上传：png,jpg,bmp,gif,jpeg。');
                        flag = false;
                        clearFile('uploader');
                    }
                });
                return flag ? item.files : [];
            };
        }]
    };
});
