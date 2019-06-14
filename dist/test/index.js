"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
var chai_1 = require("chai");
var subpaths_1 = __importDefault(require("../lib/subpaths"));
describe('subpaths', function () {
    it('should list all subpaths for one url: /foo', function () {
        var url = '/foo';
        var expected = JSON.stringify(['/', '/foo']);
        var result = subpaths_1.default(url);
        chai_1.expect(JSON.stringify(result)).to.equal(expected);
    });
    it('should return in ["/"] for "/"', function () {
        var url = '/';
        var expected = JSON.stringify(['/']);
        var result = subpaths_1.default(url);
        chai_1.expect(JSON.stringify(result)).to.equal(expected);
    });
    it('should discard query params', function () {
        var url = '/foo/bar?q=blah';
        var expected = JSON.stringify(['/', '/foo', '/foo/bar']);
        var result = subpaths_1.default(url);
        chai_1.expect(JSON.stringify(result)).to.equal(expected);
    });
    it('should discard query params with slashes in them', function () {
        var url = '/foo/bar/?q=blah/blah';
        var expected = JSON.stringify(['/', '/foo', '/foo/bar']);
        var result = subpaths_1.default(url);
        chai_1.expect(JSON.stringify(result)).to.equal(expected);
    });
    it('should discard anchors (#hash1)', function () {
        var url = '/foo/bar/qux/baz#oi';
        var expected = JSON.stringify(['/', '/foo', '/foo/bar', '/foo/bar/qux', '/foo/bar/qux/baz']);
        var result = subpaths_1.default(url);
        chai_1.expect(JSON.stringify(result)).to.equal(expected);
    });
    it('should discard anchors (#hash1) with slashes', function () {
        var url = '/foo/bar/qux/baz#oi/foooob/bin';
        var expected = JSON.stringify(['/', '/foo', '/foo/bar', '/foo/bar/qux', '/foo/bar/qux/baz']);
        var result = subpaths_1.default(url);
        chai_1.expect(JSON.stringify(result)).to.equal(expected);
    });
    it('should return [] on non-pathnames', function () {
        var notUrl = 'this is not a url!';
        var expected = '[]';
        var result = subpaths_1.default(notUrl);
        chai_1.expect(JSON.stringify(result)).to.equal(expected);
    });
});
//# sourceMappingURL=index.js.map