/*  Created by bingoo on 2015/04/10.
*/

angular.module("RCP")
.factory("dynamicService", function() {
	var factory = {
		emotions : '表情服务'
		// images : '图片服务',
		// video : '视频服务',
		// topic : '话题服务',
		// 附件服务 : '附件服务'
	};
	(function (){
		var loading = true;
		var emotions = new Array();
		var categorys = new Array(); // 分组
		var uSinaEmotionsHt = new Hashtable();

		//初始化缓存，页面仅仅加载一次就可以了
		var app_id = '1362404091';
		$.ajax({
			dataType: 'jsonp',
			url: 'https://api.weibo.com/2/emotions.json?source=' + app_id,
			success: function(response) {
				switch(response.code){
					case 1:
						var data = response.data;
						for (var i=0;i<data.length;i++) {
							if (data[i].category == '') {
								data[i].category = '默认';
							}
							if (emotions[data[i].category] == undefined) {
								emotions[data[i].category] = new Array();
								categorys.push(data[i].category);
							}
							emotions[data[i].category].push({
								name: data[i].phrase,
								icon: data[i].icon
							});
							uSinaEmotionsHt.put(data[i].phrase, data[i].icon);
						}
						loading = false;
						service && service.ready();
						break;
					default:
						jf.alert(response.data.error);
				}
			},
			error: function (){
				jf.alert('表情数据请求失败');
			}
		});

		//自定义hashtable
		function Hashtable() {
			this._hash = new Object();
			this.put = function(key, value) {
				if (typeof(key) != "undefined") {
					if (this.containsKey(key) == false) {
						this._hash[key] = typeof(value) == "undefined" ? null : value;
						return true;
					} else {
						return false;
					}
				} else {
					return false;
				}
			}
			this.remove = function(key) {
				delete this._hash[key];
			}
			this.size = function() {
				var i = 0;
				for (var k in this._hash) {
					i++;
				}
				return i;
			}
			this.get = function(key) {
				return this._hash[key];
			}
			this.containsKey = function(key) {
				return typeof(this._hash[key]) != "undefined";
			}
			this.clear = function() {
				for (var k in this._hash) {
					delete this._hash[k];
				}
			}
		};

		var cat_current;
		var cat_page;
		var service;
		var target;
		var curTarget;
		var curDyeditor;
		var callback;
		var oEmotions = '#emotions';
		var oContainer = '#emotions .container';
		var oContainerA = '#emotions .container a';
		var oCategorys = '#emotions .categorys';
		var oCategorysA = '#emotions .categorys a';
		var oPrev = '#emotions .prev';
		var oNext = '#emotions .next';
		var oPage = '#emotions .page';
		var oPageA = '#emotions .page a';

		factory.emotions =  {
			emotions : emotions,
			categorys : categorys,
			uSinaEmotionsHt : uSinaEmotionsHt,
			viewLocate : function (){
				var eTop = $(target).offset().top + $(target).outerHeight(true);
				var eLeft = $(target).offset().left+$(target).width()/2-29;
				var agCs;
				var winW = $(window).width();
				var docH = $(document).height();
				var w1 = $(target).outerWidth(true);
				var w2 = $(oEmotions).outerWidth(true);
				var h1 = $(target).outerHeight(true);
				var h2 = $(oEmotions).outerHeight(true);
				var h3 = ($(oEmotions).outerHeight(true)/2)+($(target).outerHeight(true)/2);
				var tflag = docH-eTop < h2;
				var bflag = eTop-h1 < h2;
				var lflag = (eLeft+w2 > winW);
				var rflag = (eLeft < w2);
				var leftLocate = function (){
					if(lflag){
						tflag = docH-eTop < h3;
						bflag = eTop-h1 < h3;
					}
					eLeft -= (w2+10);
					agCs = !tflag && bflag ? 'r r1' :
							tflag && !bflag ? 'r r3' :
							'r r2';
					eTop -= !tflag && bflag ? 30 :
							tflag && !bflag ? h2 :
							h3;
				};
				var rightLocate = function (){
					agCs = 'l';
					eLeft += w1;
					eTop -= h3;
				};
				var bottomLocate = function (){
					agCs = 'b';
					eTop -= (h2+h1);
				};
				if(tflag && bflag){
					if(rflag){
						rightLocate();
					}else{
						leftLocate();
					}
				}
				else if(lflag){
					leftLocate();
				}
				else if(tflag){
					bottomLocate();
				}
				$(oEmotions).find('.ag-ic').addClass(agCs);
				$(oEmotions).css({top:eTop,left:eLeft});
			},
			//显示表情窗口
			show : function (arg,callb){
				$(document).unbind('click').bind('click',function(){
					$(oEmotions).remove();
				});
				service = this;
				target = arg.target;
				curDyeditor = $(arg.dyeditor).get(0);
				callback = callb;
				if($(oEmotions).length){
					if(curTarget == target){
						$(oEmotions).remove();
					}else{
						service.viewLocate();
					}
					curTarget = target;
					return;
				}
				curTarget = target;
				$('body').append('<div id="emotions"></div>');
				$(oEmotions).html('<span class="ag-ic"><i></i><em></em></span><div>正在加载，请稍候...</div>');
				$(oEmotions).click(function(event) { event.stopPropagation(); });
				$(oEmotions).find('.ag-ic').click(function() { $(oEmotions).remove(); });
				service.ready();
				service.viewLocate();
			},
			//数据请求完毕创建模板
			ready : function (){
				if(loading || !$(oEmotions).length){
					return;
				}
				$(oEmotions).html(
					'<span class="ag-ic"><i></i><em></em></span>'+
					'<div style="float:right">'+
						'<a href="javascript:void(0);" class="prev">&laquo;</a>'+
						'<a href="javascript:void(0);" class="next">&raquo;</a>'+
					'</div>'+
					'<div class="categorys"></div>'+
					'<div class="container"></div>'+
					'<div class="page"></div>'
				);
				$(oEmotions).find('.ag-ic').click(function() {
					$(oEmotions).remove();
				});
				$(oPrev).click(function() {
					service.showCategorys(cat_page - 1);
				});
				$(oNext).click(function() {
					service.showCategorys(cat_page + 1);
				});
				service.showCategorys();
				service.showEmotions();
				service.viewLocate();
			},
			//分组导航
			showCategorys : function (){
				var page = arguments[0]?arguments[0]:0;
				if(page < 0 || page >= categorys.length / 5){
					return;
				}
				$(oCategorys).html('');
				cat_page = page;
				for(var i = page * 5; i < (page + 1) * 5 && i < categorys.length; ++i){
					$(oCategorys).append($('<a href="javascript:void(0);">' + categorys[i] + '</a>'));
				}
				$(oCategorysA).click(function(){
					service.showEmotions($(this).text());
				});
				$(oCategorysA).each(function(){
					if($(this).text() == cat_current){
						$(this).addClass('current');
					}
				});
			},
			//情绪列表
			showEmotions: function() {
				var category = arguments[0] ? arguments[0] : '默认';
				var page = arguments[1] ? arguments[1] - 1 : 0;
				$(oContainer).html('');
				$(oPage).html('');
				cat_current = category;
				for (var i = page * 72; i < (page + 1) * 72 && i < emotions[category].length; ++i) {
					$(oContainer).append($('<a href="javascript:void(0);" title="' + emotions[category][i].name + '"><img src="' + emotions[category][i].icon + '" alt="' + emotions[category][i].name + '" width="22" height="22" /></a>'));
				}
				$(oContainerA).click(function() {
					service.insertText($(this).attr('title'));
					$(oEmotions).remove();
				});
				for (var i = 1; i < emotions[category].length / 72 + 1; ++i) {
					$(oPage).append($('<a href="javascript:void(0);"' + (i == page + 1 ? ' class="current"' : '') + '>' + i + '</a>'));
				}
				$(oPageA).click(function() {
					service.showEmotions(category, $(this).text());
				});
				$(oCategorysA + '.current').removeClass('current');
				$(oCategorysA).each(function() {
					if ($(this).text() == category) {
						$(this).addClass('current');
					}
				});
				$(oEmotions).css({minHeight:254});
			},
			//插入文本
			insertText : function(text){
				service.inCursorInsertAtCaret(service.AnalyticEmotion(text),curDyeditor);
				callback && callback($(curDyeditor).html());
			},
			//在光标插入字符
			inCursorInsertAtCaret : function (html,element) {
				var sel, range;
				if (window.getSelection && window.getSelection().getRangeAt) {
					var startRangeObj = window.getSelection();
					var startFocusNode = startRangeObj.focusNode;
					if(startFocusNode){
						startRangeObj = startRangeObj.getRangeAt(0);
					}
					$(element).focus();
					sel = window.getSelection();
					range = sel.getRangeAt(0);

					if(range.startOffset == range.endOffset){
			            if(!startFocusNode || startRangeObj.startContainer != range.startContainer){
		            		range.selectNodeContents(element);
				            range.setStart(range.endContainer, range.endOffset);
				            range.setEnd(range.endContainer, range.endOffset);
			            }
		            }else{
		            	range.deleteContents();
		            }

					var el = document.createElement("div");
					el.innerHTML = html;
					var frag = document.createDocumentFragment(),
						node, lastNode;
					while ((node = el.firstChild)) {
						lastNode = frag.appendChild(node);
					}
					range.insertNode(frag,lastNode);
					if (lastNode) {
						range = range.cloneRange();
						range.setStartAfter(lastNode);
						range.collapse(true);
						sel.removeAllRanges();
						sel.addRange(range);
					}
				} else if (document.selection && document.selection.createRange) {
					$(element).focus();
					document.selection.createRange().pasteHTML(html);

				}
			},
			//替换
			AnalyticEmotion: function(s) {
				if (typeof(s) != "undefined") {
					var sArr = s.match(/\[.*?\]/g);
					if (sArr) {
						for (var i = 0; i < sArr.length; i++) {
							if (uSinaEmotionsHt.containsKey(sArr[i])) {
								var reStr = '<img src="' + uSinaEmotionsHt.get(sArr[i]) + '" height="22" width="22" />';
								s = s.replace(sArr[i], reStr);
							}
						}
					}
				}
				return s;
			}
		}
	})();
	return factory;
})
.directive("addface",function(){
    return {
        restrict: 'A',
        scope: {
            data : '=addface' //同时在标签加上 bindeditor="#idcode" 一起使用
        },
        controller: ['$scope', '$element', '$timeout', 'dynamicService', function ($scope, $element, $timeout, dynamicService) {
        	$element.on(
        		{
	        		click : function (event){
	        			dynamicService.emotions.show(
							{
								dyeditor : $element.attr('bindeditor'),
								target : $element.get(0)
							},
							function (htmlCode){
								$scope.data = htmlCode;
							}
						);
						event.stopPropagation();
	        		}
	        	}
        	);
        }]
    }
})
.directive("dyeditor",function(){
    return{
        template: '<div class="dyeditor-w">'+
                        '<div class="stint-chac">'+
                        	'<span style="color:#9c9c9c;" ng-hide="exceed">还可以输入<b style="font-family:Georgia,Times New Roman,Times, serif;font-size:21px;">{{surplus}}</b>字</span>'+
                        	'<span style="color:#ff0000;" ng-show="exceed">已超出<b style="font-family:Georgia,Times New Roman,Times, serif;font-size:21px;">{{exceed}}</b>字</span>'+
                        '</div>'+
                        '<div class="placeholder" ng-hide="model">{{config.placeholder}}</div>'+
                        '<div class="contenteditable" contenteditable="true" id="{{config.id}}" ng-style="config.style" ng-focus="onfocus()" ng-blur="onblur()" ng-click="change()"></div>'+
                    '</div>',
        restrict:"E",
        replace: true,
        transclude: true,
        scope:{
            model:"=model",
            exceed:"=exceed",
            config:"=config" //{len:255,style:{},placeholder:'请输入内容'}
        },
        controller:function($scope,$element,$attrs,$timeout){
        	var editor = $element.find('.contenteditable').get(0);
        	$scope.surplus = $scope.config.len;
            $scope.checkLen = function (o){
                if($scope.config.len){
                    var str = $(o).text();
                    var max = parseInt($scope.config.len)*2;
                    var len = 0;
                    if(str){
                        len = parseInt(str._getLen());
                    }
                    $scope.exceed = len > max ? Math.ceil((len-max)/2) : 0;
                    $scope.surplus = str && len>max ? 0 : str ? parseInt((max-len)/2) : parseInt($scope.config.len);
                }
            };
            $scope.change = function (htmlCode){
                $scope.model = htmlCode!==undefined?htmlCode:$(editor).html();
                $scope.config.len && $scope.checkLen(editor);
            };
            
            $scope.onfocus = function (){
                $scope.config.len && $element.find('.stint-chac').show();
                $scope.focus = true;
            };
            
            $scope.onblur = function (){
                $element.find('.stint-chac').css({display:$scope.exceed?'block':'none'});
                $scope.focus = false;
            };

            $scope.$watch('model',function(newValue,oldValue){
            	if(typeof newValue !== undefined && newValue !== $(editor).html()){
            		$(editor).html(newValue);
            		$scope.config.len && $scope.checkLen(editor);
            		$element.find('.stint-chac').css({display:$scope.exceed?'block':'none'});
            	}
            });

            var editorHtml = $(editor).html();
            function watch(){
                if($(editor).html() !== editorHtml){
                    editorHtml = $(editor).html();
                    editor.click();
                }
                setTimeout(watch);
            }
            watch();
        }
    }
})
.filter("filterDynamicHtml", ['$sce','dynamicService', function($sce,dynamicService) {
    return function(htmlCode) {
        return $sce.trustAsHtml(dynamicService.emotions.AnalyticEmotion(htmlCode));
    }
}])
.filter("bindHtml", ['$sce', function($sce) {
    return function(htmlCode) {
        return $sce.trustAsHtml(htmlCode);
    }
}]);