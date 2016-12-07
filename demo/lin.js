'use strict';

var lin = {};
//时间
/**
 * 前零补充
 * @param  {string} argData [数据]
 * @param  {numstring} argNum  [长度]
 * @return {string}         [返回长度对应的字符串]
 */
lin.fillZero = function (argData, argNum) {
    var str = '' + argData,
        len = argNum - str.length;
    for (var i = 0; i < len; i++) {
        str = '0' + str;
    }
    return str;
};

//位置
/**
 * [获取元素相对于这个页面的X坐标]
 * @param  {[type]} argE [description]
 * @return {[type]}      [description]
 */
lin.pageX = function (argE) {
    return argE.getBoundingClientRect().left + (document.documentElement.scrollLeft || document.body.scrollLeft);
};
/**
 * [获取元素相对于这个页面的Y坐标]
 * @param  {[type]} argE [description]
 * @return {[type]}      [description]
 */
lin.pageY = function (argE) {
    return argE.getBoundingClientRect().top + (document.documentElement.scrollTop || document.body.scrollTop);
};
/**
 * 判断是否是IE
 * @return {Boolean} [description]
 */
lin.isIE = function () {
    if (!!window.ActiveXObject || 'ActiveXObject' in window) {
        return true;
    } else {
        return false;
    }
};

// 清除两边的空格
String.prototype._trim = function () {
    return this.replace(/(^\s*)|(\s*$)/g, '');
};
// 合并多个空白为一个空白
String.prototype._resetBlank = function () {
    var regEx = /\s+/g;
    return this.replace(regEx, ' ');
};
// 保留数字
String.prototype._getNum = function () {
    var regEx = /[^\d]/g;
    return this.replace(regEx, '');
};
// 保留中文
String.prototype._getCN = function () {
    var regEx = /[^\u4e00-\u9fa5\uf900-\ufa2d]/g;
    return this.replace(regEx, '');
};
// String转化为Number
String.prototype._toInt = function () {
    return isNaN(parseInt(this)) ? this.toString() : parseInt(this);
};
// 得到字节长度
String.prototype._getLen = function () {
    var regEx = /^[\u4e00-\u9fa5\uf900-\ufa2d]+$/;
    if (regEx.test(this)) {
        return this.length * 2;
    } else {
        var oMatches = this.match(/[\x00-\xff]/g);
        var oLength = this.length * 2 - oMatches.length;
        return oLength;
    }
};
// 限定字节长度
String.prototype._limitLen = function (len, suffix) {
    if (this._getLen() < len) return this.toString();
    var string = '',
        lenControl = 0,
        regEx = /^[\u4e00-\u9fa5\uf900-\ufa2d]+$/;
    for (var i = 0; i < this.length; i++) {
        regEx.test(this.charAt(i)) ? lenControl += 2 : lenControl += 1;
        string += this.charAt(i);
        if (lenControl >= len) break;
    }
    return (string + (suffix ? suffix : '...')).toString();
};
// 获取文件全名
String.prototype._getFileName = function () {
    var regEx = /^.*\/([^\/\?]*).*$/;
    return this.replace(regEx, '$1');
};
// 获取文件扩展名
String.prototype._getExtensionName = function () {
    var regEx = /^.*\/[^\/]*(\.[^\.\?]*).*$/;
    return this.replace(regEx, '$1');
};
// 字符串全局替换
String.prototype._replaceAll = function (reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, ignoreCase ? 'gi' : 'g'), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
};
//格式化字符串
String.Format = function () {
    if (arguments.length == 0) {
        return '';
    }
    if (arguments.length == 1) {
        return arguments[0];
    }
    var reg = /{(\d+)?}/g;
    var args = arguments;
    var result = arguments[0].replace(reg, function ($0, $1) {
        return args[parseInt($1) + 1];
    });
    return result;
};
//限制最小值&&最大值
Number.prototype._range = function (iMin, iMax) {
    if (parseFloat(this) > iMax) {
        return iMax;
    } else if (parseFloat(this) < iMin) {
        return iMin;
    } else {
        return parseFloat(this);
    }
};
// 数字补零
Number.prototype._lenWithZero = function (oCount) {
    var strText = this.toString();
    while (strText.length < oCount) {
        strText = '0' + strText;
    }
    return strText;
};
// Unicode还原
Number.prototype._chrW = function () {
    return String.fromCharCode(this);
};
// 数字数组由小到大排序
Array.prototype._minToMax = function () {
    var oValue;
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j <= i; j++) {
            if (this[i] < this[j]) {
                oValue = this[i];
                this[i] = this[j];
                this[j] = oValue;
            }
        }
    }
    return this;
};
// 数字数组由大到小排序
Array.prototype._maxToMin = function () {
    var oValue;
    for (var i = 0; i < this.length; i++) {
        for (var j = 0; j <= i; j++) {
            if (this[i] > this[j]) {
                oValue = this[i];
                this[i] = this[j];
                this[j] = oValue;
            }
        }
    }
    return this;
};
// 获得数字数组中最大项
Array.prototype._getMax = function () {
    var oValue;
    for (var i = 0; i < this.length; i++) {
        oValue = i < 1 ? this[i] : this[i] > oValue ? this[i] : oValue;
    }
    return oValue;
};
// 获得数字数组中最小项
Array.prototype._getMin = function () {
    var oValue;
    for (var i = 0; i < this.length; i++) {
        oValue = i < 1 ? this[i] : this[i] < oValue ? this[i] : oValue;
    }
    return oValue;
};
// 获得数组中,值的索引
Array.prototype._indexOf = function (val) {
    var index;
    for (var i = 0; i < this.length; i++) {
        if (val == this[i]) index = i;
    }
    return index;
};
// 获取当前时间的中文形式
Date.prototype._getCNDate = function () {
    var oDateText = '';
    oDateText += this.getFullYear()._lenWithZero(4) + new Number(24180)._chrW();
    oDateText += this.getMonth()._lenWithZero(2) + new Number(26376)._chrW();
    oDateText += this.getDate()._lenWithZero(2) + new Number(26085)._chrW();
    oDateText += this.getHours()._lenWithZero(2) + new Number(26102)._chrW();
    oDateText += this.getMinutes()._lenWithZero(2) + new Number(20998)._chrW();
    oDateText += this.getSeconds()._lenWithZero(2) + new Number(31186)._chrW();
    oDateText += new Number(32)._chrW() + new Number(32)._chrW() + new Number(26143)._chrW() + new Number(26399)._chrW() + new String('26085199682010819977222352011620845').substr(this.getDay() * 5, 5)._toInt()._chrW();
    return oDateText;
};
//扩展Date格式化 new Date().format('yyyy-MM-dd hh:mm:ss:S q');
Date.prototype._format = function (format) {
    var o = {
        'M+': this.getMonth() + 1, //月
        'd+': this.getDate(), //日
        'h+': this.getHours(), //小时
        'm+': this.getMinutes(), //分
        's+': this.getSeconds(), //秒
        'q+': Math.floor((this.getMonth() + 3) / 3), //季
        'S': this.getMilliseconds() //毫秒
    };

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return format;
};
Date.prototype._diff = function (interval, objDate) {
    //若参数不足或 objDate 不是日期类型則回传 undefined
    if (arguments.length < 2 || objDate.constructor != Date) {
        return undefined;
    }
    switch (interval) {
        //计算秒差                                                        
        case 's':
            return parseInt((objDate - this) / 1000);
        //计算分差
        case 'n':
            return parseInt((objDate - this) / 60000);
        //计算時差
        case 'h':
            return parseInt((objDate - this) / 3600000);
        //计算日差
        case 'd':
            return parseInt((objDate - this) / 86400000);
        //计算周差
        case 'w':
            return parseInt((objDate - this) / (86400000 * 7));
        //计算月差
        case 'm':
            return objDate.getMonth() + 1 + (objDate.getFullYear() - this.getFullYear()) * 12 - (this.getMonth() + 1);
        //计算年差
        case 'y':
            return objDate.getFullYear() - this.getFullYear();
        //输入有误
        default:
            return undefined;
    }
};