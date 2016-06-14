"use strict";

/**
 *
 * @param separator
 * @return {string}
 */
Date.prototype.ymd = function (separator) {
    var sep = separator !== undefined ? separator : "";
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based
    var dd = this.getDate().toString();
    return yyyy + sep + (mm[1] ? mm : "0" + mm[0]) + sep + (dd[1] ? dd : "0" + dd[0]); // padding
};



