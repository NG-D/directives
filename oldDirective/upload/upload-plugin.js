/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
var CryptoJS=CryptoJS||function(e,m){var p={},j=p.lib={},l=function(){},f=j.Base={extend:function(a){l.prototype=this;var c=new l;a&&c.mixIn(a);c.hasOwnProperty("init")||(c.init=function(){c.$super.init.apply(this,arguments)});c.init.prototype=c;c.$super=this;return c},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var c in a)a.hasOwnProperty(c)&&(this[c]=a[c]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
n=j.WordArray=f.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=m?c:4*a.length},toString:function(a){return(a||h).stringify(this)},concat:function(a){var c=this.words,q=a.words,d=this.sigBytes;a=a.sigBytes;this.clamp();if(d%4)for(var b=0;b<a;b++)c[d+b>>>2]|=(q[b>>>2]>>>24-8*(b%4)&255)<<24-8*((d+b)%4);else if(65535<q.length)for(b=0;b<a;b+=4)c[d+b>>>2]=q[b>>>2];else c.push.apply(c,q);this.sigBytes+=a;return this},clamp:function(){var a=this.words,c=this.sigBytes;a[c>>>2]&=4294967295<<
32-8*(c%4);a.length=e.ceil(c/4)},clone:function(){var a=f.clone.call(this);a.words=this.words.slice(0);return a},random:function(a){for(var c=[],b=0;b<a;b+=4)c.push(4294967296*e.random()|0);return new n.init(c,a)}}),b=p.enc={},h=b.Hex={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++){var f=c[d>>>2]>>>24-8*(d%4)&255;b.push((f>>>4).toString(16));b.push((f&15).toString(16))}return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d+=2)b[d>>>3]|=parseInt(a.substr(d,
2),16)<<24-4*(d%8);return new n.init(b,c/2)}},g=b.Latin1={stringify:function(a){var c=a.words;a=a.sigBytes;for(var b=[],d=0;d<a;d++)b.push(String.fromCharCode(c[d>>>2]>>>24-8*(d%4)&255));return b.join("")},parse:function(a){for(var c=a.length,b=[],d=0;d<c;d++)b[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return new n.init(b,c)}},r=b.Utf8={stringify:function(a){try{return decodeURIComponent(escape(g.stringify(a)))}catch(c){throw Error("Malformed UTF-8 data");}},parse:function(a){return g.parse(unescape(encodeURIComponent(a)))}},
k=j.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new n.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=r.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(a){var c=this._data,b=c.words,d=c.sigBytes,f=this.blockSize,h=d/(4*f),h=a?e.ceil(h):e.max((h|0)-this._minBufferSize,0);a=h*f;d=e.min(4*a,d);if(a){for(var g=0;g<a;g+=f)this._doProcessBlock(b,g);g=b.splice(0,a);c.sigBytes-=d}return new n.init(g,d)},clone:function(){var a=f.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});j.Hasher=k.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){k.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(c,b){return(new a.init(b)).finalize(c)}},_createHmacHelper:function(a){return function(b,f){return(new s.HMAC.init(a,
f)).finalize(b)}}});var s=p.algo={};return p}(Math);
(function(){var e=CryptoJS,m=e.lib,p=m.WordArray,j=m.Hasher,l=[],m=e.algo.SHA1=j.extend({_doReset:function(){this._hash=new p.init([1732584193,4023233417,2562383102,271733878,3285377520])},_doProcessBlock:function(f,n){for(var b=this._hash.words,h=b[0],g=b[1],e=b[2],k=b[3],j=b[4],a=0;80>a;a++){if(16>a)l[a]=f[n+a]|0;else{var c=l[a-3]^l[a-8]^l[a-14]^l[a-16];l[a]=c<<1|c>>>31}c=(h<<5|h>>>27)+j+l[a];c=20>a?c+((g&e|~g&k)+1518500249):40>a?c+((g^e^k)+1859775393):60>a?c+((g&e|g&k|e&k)-1894007588):c+((g^e^
k)-899497514);j=k;k=e;e=g<<30|g>>>2;g=h;h=c}b[0]=b[0]+h|0;b[1]=b[1]+g|0;b[2]=b[2]+e|0;b[3]=b[3]+k|0;b[4]=b[4]+j|0},_doFinalize:function(){var f=this._data,e=f.words,b=8*this._nDataBytes,h=8*f.sigBytes;e[h>>>5]|=128<<24-h%32;e[(h+64>>>9<<4)+14]=Math.floor(b/4294967296);e[(h+64>>>9<<4)+15]=b;f.sigBytes=4*e.length;this._process();return this._hash},clone:function(){var e=j.clone.call(this);e._hash=this._hash.clone();return e}});e.SHA1=j._createHelper(m);e.HmacSHA1=j._createHmacHelper(m)})();
/*
CryptoJS v3.1.2
code.google.com/p/crypto-js
(c) 2009-2013 by Jeff Mott. All rights reserved.
code.google.com/p/crypto-js/wiki/License
*/
(function(){if("function"==typeof ArrayBuffer){var b=CryptoJS.lib.WordArray,e=b.init;(b.init=function(a){a instanceof ArrayBuffer&&(a=new Uint8Array(a));if(a instanceof Int8Array||(typeof(Uint8ClampedArray)!='undefined'&&a instanceof Uint8ClampedArray)||a instanceof Int16Array||a instanceof Uint16Array||a instanceof Int32Array||a instanceof Uint32Array||a instanceof Float32Array||a instanceof Float64Array)a=new Uint8Array(a.buffer,a.byteOffset,a.byteLength);if(a instanceof Uint8Array){for(var b=a.byteLength,d=[],c=0;c<b;c++)d[c>>>2]|=a[c]<<
24-8*(c%4);e.call(this,d,b)}else e.apply(this,arguments)}).prototype=b}})();
/*
 * the log4javascript appender for network log cliet.
 * @author Cny
 */
var C4js = (function() {
    function C4js() {}

    C4js.NewAjax = function() {
        /*if (window.ActiveXObject) {
            return new ActiveXObject("Msxml2.XMLHTTP");
        } else {
            return new XMLHttpRequest();
        }*/
        return new XMLHttpRequest();
    };
    C4js.G = function(url, success, error) {
        var req = C4js.NewAjax();
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                try {
                    if (req.status == 200) {
                        success(JSON.parse(req.responseText), req);
                    } else {
                        error(JSON.parse(req.responseText), null, req);
                    }
                } catch (e) {
                    error({}, e, req);
                }
            }
        };
        req.open("GET", url);
        req.send(null);
    };
    C4js.UrlArg = function(key) {
        var surl = window.location.search.substring(1);
        var vals = surl.split('&');
        for (var i in vals) {
            kv = vals[i].split('='); //key value
            if (kv[0] == key) {
                return kv[1];
            }
        }
        return null;
    };
    C4js.FSize = ["B", "KB", "MB", "GB", "TB"];
    //
    C4js.fsize = function(bs) {
        bsize = bs;
        for (var i = 0; i < C4js.FSize.length; i++) {
            if (bsize > 1024) {
                bsize = bsize / 1024;
            } else {
                return bsize.toFixed(1) + C4js.FSize[i];
            }
        }
    };
    C4js.Uer = (function() {
        //
        function Uer(url, args, auto) {
            if (url) {
                this.Url = url;
            }
            if (args) {
                this.Args = args;
            }
            if (typeof(auto) != 'undefined') {
                this.Auto = auto;
            }
            this.Hash = true && CryptoJS.SHA1;
            this.HashLimit = 10240000; //10M
        }
        Uer.SOrder = {
            E: 0,
            A: 1,
            S: 2,
            P: 3,
            W: 4,
            L: 5
        };
        Uer.StatusText = function(s) {
            switch (s) {
                case "P":
                    return "上传中...";
                case "W":
                    return "等待中...";
                case "E":
                    return "上传失败";
                case "A":
                    return "已取消";
                case "L":
                    return "已完成";
                case "S":
                    return "开始上传";
            }
            return "";
        };
        //
        Uer.prototype.files = [];
        Uer.prototype.loaded = 0; //upload success.
        Uer.prototype.idc = 0; //upload success.
        Uer.prototype.Auto = true; //if auto upload after select.
        Uer.prototype.Maxsize = 0; //maxsize to transfter.
        Uer.prototype.Minsize = 0; //minsize to transfter.
        Uer.prototype.Uploading = false; //if uploading
        Uer.prototype.Url = ""; //the upload URL.
        Uer.prototype.Fname = "file"; //the form file mark name.
        Uer.prototype.Args = {}; //extern argument to server.
        //get the queue list count message.
        Uer.prototype.C = function() {
            cval = {
                W: 0,
                P: 0,
                S: 0,
                L: 0,
                E: 0,
                A: 0,
                Speed: "",
                Loaded: this.loaded
            };
            tspeed = 0;
            for (var i in this.files) {
                cf = this.files[i];
                if (cf.speed) {
                    tspeed += cf.speed;
                }
                switch (cf.Status) {
                    case "W":
                        cval.W++;
                        break;
                    case "P":
                        cval.P++;
                        break;
                    case "S":
                        cval.S++;
                        break;
                    case "L":
                        cval.L++;
                        break;
                    case "E":
                        cval.E++;
                        break;
                    case "A":
                        cval.A++;
                        break;
                }
            }
            cval.Speed = C4js.fsize(tspeed);
            return cval;
        };
        Uer.prototype.sort = function() {
            this.files.sort(function(a, b) {
                return Uer.SOrder[a.Status] > Uer.SOrder[b.Status];
            });
        };
        Uer.prototype.addf = function(f) {
            f.Status = "W";
            f.fid = this.idc++;
            f.speed = f.rate = 0;
            this.files.push(f);
        };
        //add file to queue.
        Uer.prototype.AddF = function(f, args, ev) {
            var added = [];
            var err = [];
            if (this.Maxsize && f.size > this.Maxsize) {
                err.push(f);
            } else if (this.Minsize && f.size < this.Minsize) {
                err.push(f);
            } else {
                added.push(f);
                f.Args = args;
                f.Ev = ev;
                this.addf(f);
                this.sort();
            }
            this.OnAdd(added, err);
            if (this.Auto) this.uloop();
            this.sort();
        };
        //add file list to queue.
        Uer.prototype.Add = function(fl, node) {
            var added = [];
            var err = [];
            for (var i = 0; i < fl.length; i++) {
                var f = fl[i];
                if (this.Maxsize && f.size > this.Maxsize) {
                    err.push(f);
                    continue;
                }
                if (this.Minsize && f.size < this.Minsize) {
                    err.push(f);
                    continue;
                }
                f.node = node;
                f.Args = node.Args;
                f.Ev = node.Ev;
                added.push(f);
                this.addf(f);
            }
            this.OnAdd(added, err);
            if (this.Auto) this.uloop();
            this.sort();
            node.value = '';
        };
        //adding input listener.
        Uer.prototype.AddI = function(id, args, ev) {
            t = document.getElementById(id);
            if (!t) {
                return;
            }
            t.uer = this;
            t.Args = args;
            t.Ev = ev;
            t.addEventListener("change", this.onc);
        };
        //delete input listener.
        Uer.prototype.DelI = function(id) {
            t = document.getElementById(id);
            if (!t) {
                return;
            }
            t.uer = undefined;
            t.Args = undefined;
            t.Ev = undefined;
            t.removeEventListener("change", this.onc);
        };
        //find file object by fid.
        Uer.prototype.FindF = function(fid) {
            for (var i = 0; i < this.files.length; i++) {
                if (this.files[i].fid == fid) {
                    return this.files[i];
                }
            }
            return null;
        };
        //clear all loaded file.
        Uer.prototype.ClearLoaded = function() {
            var nary = [];
            for (var i = 0; i < this.files.length; i++) {
                if (this.files[i].Status != "L") {
                    nary.push(this.files[i]);
                }
            }
            this.files = nary;
        };
        Uer.prototype.onc = function(e) {
            e.preventDefault();
            t = e.srcElement || e.target;
            if (t.uer && t.files) {
                var fs = t.uer.OnSelect(t, e);
                if (fs.length) {
                    t.uer.Add(fs, t);
                }
            }
            return true;
        };
        Uer.prototype.uloop = function() {
            var f = null;
            for (var i in this.files) {
                cf = this.files[i];
                if (cf.Status == "W") {
                    f = this.files[i];
                    break;
                }
            }
            if (!f) {
                return;
            }
            var dohash = this.Hash;
            if (f.size > this.HashLimit) {
                dohash = false;
            } else if (typeof(f.Hash) != 'undefined') {
                dohash = f.Hash;
            }
            if (!dohash) { //if not do hash
                delete f.Args.sha;
                this.uloop_(f);
                return;
            }
            var uer = this;
            var fr = new FileReader();
            var btime = new Date().getTime();
            fr.onprogress = function(e) {
                uer.OnHashProc(f, e);
            };
            fr.onload = function(e) {
                var wad = CryptoJS.lib.WordArray.create(this.result);
                if (!f.Args) {
                    f.Args = {};
                }
                f.Args.sha = CryptoJS.SHA1(wad).toString(CryptoJS.enc.Hex);
                // f.Args.md5 = CryptoJS.MD5(wad).toString(CryptoJS.enc.Hex);
                uer.uloop_(f);
            };
            fr.readAsArrayBuffer(f);
        };
        Uer.prototype.uloop_ = function(f) {
            var xhr = C4js.NewAjax();
            var upload = xhr.upload;
            var uer = this;
            xhr.onreadystatechange = function() {
                if (xhr.readyState != 4) {
                    return;
                }
                if (xhr.status == 200) {
                    try {
                        uer.OnSuccess(f, JSON.parse(xhr.responseText), null);
                    } catch (e) {
                        uer.OnSuccess(f, xhr.responseText, null);
                    }
                } else {
                    try {
                        uer.OnErr(f, JSON.parse(xhr.responseText), null);
                    } catch (e) {
                        uer.OnErr(f, xhr.responseText, null);
                    }
                }
            };
            upload.addEventListener("loadstart", function(e) {
                f.Status = "S";
                f.speed = 0;
                f.preloaded = 0;
                f.pretime = new Date().getTime() / 1000;
                if (f.node) f.node.uploading = true;
                uer.sort();
                uer.OnStart(f, e);
            }, false);
            upload.addEventListener("progress", function(e) {
                f.Status = "P";
                f.rate = 0;
                if (e.lengthComputable) {
                    f.rate = e.loaded / e.total;
                }
                ntime = new Date().getTime() / 1000;
                f.speed = (e.loaded - f.preloaded) / (ntime - f.pretime);
                speed = C4js.fsize(f.speed);
                f.preloaded = e.loaded;
                f.pretime = ntime;
                uer.OnProcess(f, f.rate, speed, e);
            }, false);
            upload.addEventListener("load", function(e) {
                f.Status = "L";
                uer.loaded++;
                uer.sort();
                if (f.node) f.node.uploading = false;
                uer.OnLoad(f, e);
                //
                uer.uloop();
            }, false);
            upload.addEventListener("error", function(e) {
                f.Status = "E";
                uer.sort();
                uer.OnErr(f, null, e);
                //
                uer.uloop();
            }, false);
            upload.addEventListener("abort", function(e) {
                f.Status = "A";
                uer.sort();
                uer.OnAbort(f, e);
                //
                uer.uloop();
            }, false);
            f.Status = "P";
            form = new FormData();
            uargs = [];
            for (var k in this.Args) {
                uargs.push(k + "=" + this.Args[k]);
            }
            eargs = this.OnPrepare(f, xhr, form);
            if (eargs) {
                for (var ke in eargs) {
                    uargs.push(ke + "=" + eargs[ke]);
                }
            }
            if (f.Args) {
                for (var ka in f.Args) {
                    uargs.push(ka + "=" + f.Args[ka]);
                }
            }
            if (this.Fname.length) {
                form.append(this.Fname, f);
            }
            rurl = this.Url;
            if (rurl.indexOf("?") < 0) {
                rurl += "?" + uargs.join("&");
            } else {
                rurl += "&" + uargs.join("&");
            }
            console.log(rurl);
            xhr.open("POST", rurl);
            xhr.overrideMimeType&&xhr.overrideMimeType("application/octet-stream");
            xhr.send(form);
            f.Xhr = xhr;
        };
        //abort file transfter.
        Uer.prototype.Abort = function(fid) {
            for (var i = 0; i < this.files.length; i++) {
                f = this.files[i];
                if (f.fid == fid && f.Xhr) {
                    f.Xhr.abort();
                }
            }
        };
        //on add file to queue.
        Uer.prototype.OnAdd = function(added, err) {};
        //prepare file transfter.
        Uer.prototype.OnPrepare = function(f, xhr, form) {
            if (f.Ev && f.Ev.OnPrepare) {
                f.Ev.OnPrepare(f, xhr, form);
            }
            return {};
        };
        //on file start transfter.
        Uer.prototype.OnStart = function(f, e) {
            if (f.Ev && f.Ev.OnStart) {
                f.Ev.OnStart(f, e);
            }
        };
        //on file transfter process.
        Uer.prototype.OnProcess = function(f, rate, speed, e) {
            if (f.Ev && f.Ev.OnProcess) {
                f.Ev.OnProcess(f, rate, speed, e);
            }
        };
        //on file transfter process.
        Uer.prototype.OnHashProc = function(f, e) {
            if (f.Ev && f.Ev.OnHashProc) {
                f.Ev.OnHashProc(f, e);
            }
        };
        //
        Uer.prototype.OnLoad = function(f, e) {
            if (f.Ev && f.Ev.OnLoad) {
                f.Ev.OnLoad(f, e);
            }
        };
        //on file upload success.
        Uer.prototype.OnSuccess = function(f, data, e) {
            if (f.Ev && f.Ev.OnSuccess) {
                f.Ev.OnSuccess(f, data, e);
            }
        };
        //on file upload error.
        Uer.prototype.OnErr = function(f, data, e) {
            if (f.Ev && f.Ev.OnErr) {
                f.Ev.OnErr(f, data, e);
            }
        };
        //on file upload abort.
        Uer.prototype.OnAbort = function(f, e) {
            if (f.Ev && f.Ev.OnAbort) {
                f.Ev.OnAbort(f, e);
            }
        };
        //on input select file.
        Uer.prototype.OnSelect = function(item, e) {
            return item.files;
        };
        return Uer;
    })();
    window.C4js = C4js;
    return C4js;
})();
window.GetToken = window.GetToken ? window.GetToken : function () {
    return rcpAid.getToken.call(rcpAid);
};
C4js.NewUer=function(args,auto){
    return new C4js.Uer(g_conf.uploadAddrNew, {
        m: "C",
        token:GetToken()
    }, auto);
};
        
/**
 * Created by mj on 2015/2/3.
 */
var uer = C4js.NewUer({
    m: "C"
}, true);
