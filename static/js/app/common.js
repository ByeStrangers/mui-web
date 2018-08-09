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
    if (r != null)
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
    if (s) {
        return parseFloat(s).toFixed(n);
    } else {
        return '0.00';
    }
}