/**
 * 取URL参数值
 *
 * @param name
 * @returns
 */
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	var context = "";
	if(r != null)
		context = r[2];
	reg = null;
	r = null;
	return context == null || context == "" || context == "undefined" ? "" : context;
}

/**
 * 格式化金额
 *
 * @param s 金额
 * @param n 小数点位数
 * @returns {String}
 */
function moneyFormat(s, n) {
	if(s) {
		return parseFloat(s).toFixed(n);
	} else {
		return '0.00';
	}
}

/**
 * 手机号码校验
 *
 * @param tel
 * @returns
 */
function checkMobileno(chr) {
	var reg = /^1[34578]\d{9}$/;
	return reg.test(chr);
}

/**
 * 添加指定的Key
 * @param key Cookie存储的key
 * @param value Cookie存储的值
 * @param expires 有效期 ，单位：秒
 * */
function addCookie(key, value, expires) {
	if(window.localStorage) {
		storage = window.localStorage;
		storage[key] = value;
	} else {
		$.cookie(key, value, {
			expires: (1 / 86400) * expires
		});
	}
}

/**
 * 删除指定的Key
 * @param key Cookie存储的key
 * */
function deleteCookie(key) {
	if(window.localStorage) {
		storage = window.localStorage;
		storage.removeItem(key);
	} else {
		$.cookie(key, null,{expires:-1});
	}
}

/**
 * 根据指定的Key获取值
 * @param key Cookie存储的key
 */
function getCookie(key) {
	var smsCode;
	if(window.localStorage) {
		storage = window.localStorage;
		smsCode = storage[key];
	} else {
		smsCode = $.cookie(key);
	}
	return smsCode;
}

/**
 * 刷新获取验证码按钮 
 * @param btnId 按钮ID
 * @param cookieKey Cookie存储的key
 * */
function refreshBtn(btnId, cookieKey) {
	if(!cookieKey) {
		return;
	} else {
		var putTime = parseInt(getCookie(cookieKey)); //存入cookie的时间戳
		var interval = setInterval(function() {
			var currentTime = new Date().getTime(); //当前时间戳
			if((putTime + 60 * 1000) >= currentTime) { //未过60s
				var tempTime = (currentTime - putTime) / 1000;
				$("#" + btnId).attr("disabled", "disabled");
				$("#" + btnId).val(tempTime + "秒后可重发");
			} else { //已过60s
				$("#" + btnId).removeAttr("disabled");
				$("#" + btnId).val("获取验证码");
				clearInterval(interval); //清除定时器
				deleteCookie(cookieKey) //删除cookie
			}
		}, 1000);
	}
}