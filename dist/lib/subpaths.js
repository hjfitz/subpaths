"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * return a list of all subpaths
 * @param path pathname of the form /foo/bar/quz/ to match
 * @returns list of all subpaths
 */
function list(path) {
    var pathnameRE = '^/(?:[^%]|%[0-9A-Fa-f]{2})+$';
    var match = path.match(pathnameRE);
    if (!match && path !== '/')
        return [];
    // begin by removing query params and hashes
    var pathname = new URL('https://www.test.com' + path).pathname;
    var split = pathname.split('/').filter(Boolean);
    var cursor = '';
    var paths = [];
    for (var i = 0; i < split.length; i += 1) {
        cursor = cursor + '/' + split[i];
        paths.push(cursor);
    }
    return ['/'].concat(paths);
}
exports.default = list;
//# sourceMappingURL=subpaths.js.map