"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollToAnchor = exports.scrollToElement = exports.pixelSize = void 0;
/**
 *  Converts a string with pixel measurement into a parsed number. By default
 *  this function will grab the fontSize of the document body.
 *  @param size string optional pixel size e.g. "42px"
 *  @returns the current computed fontsize for manual REM calculations
 */
var pixelSize = function (size) {
    if (size === void 0) { size = getComputedStyle(document.body).fontSize; }
    return size ? parseFloat(size.split('px')[0]) : 1;
};
exports.pixelSize = pixelSize;
// chopping block
/**
 * Scrolls the window to an element
 * @param element the element to scroll to
 * @param behavior how you want it to scroll
 */
var scrollToElement = function (element, behavior) {
    var top = element.getBoundingClientRect().top;
    var diff = top + window.pageYOffset;
    window.scroll({
        top: diff - 0,
        behavior: behavior,
    });
};
exports.scrollToElement = scrollToElement;
/* Scrolls the window to the specified Anchors
 * @param anchor the anchor to scroll to
 * @param behavior how you want it to scroll
 */
var scrollToAnchor = function (anchor, behavior) {
    if (anchor === void 0) { anchor = ''; }
    if (behavior === void 0) { behavior = 'smooth'; }
    if (!anchor) {
        window.scroll({ top: 0, behavior: 'smooth' });
    }
    else {
        var divToFocus = document.getElementById(anchor);
        if (divToFocus) {
            exports.scrollToElement(divToFocus, behavior);
        }
    }
};
exports.scrollToAnchor = scrollToAnchor;
