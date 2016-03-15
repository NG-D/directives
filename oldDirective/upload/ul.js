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