import 'mocha';
import { expect } from 'chai';
import subpaths from '../lib/subpaths';

describe('subpaths', () => {
	it('should list all subpaths for one url: /foo', () => {
		const url: string = '/foo';
		const expected: string = JSON.stringify(['/', '/foo']);
		const result: string[] = subpaths(url);
		expect(JSON.stringify(result)).to.equal(expected);
	});

	it('should return in ["/"] for "/"', () => {
		const url: string = '/';
		const expected: string = JSON.stringify(['/']);
		const result: string[] = subpaths(url);
		expect(JSON.stringify(result)).to.equal(expected);
	});

	it('should discard query params', () => {
		const url: string =  '/foo/bar?q=blah';
		const expected: string = JSON.stringify(['/', '/foo', '/foo/bar']);
		const result: string[] = subpaths(url);
		expect(JSON.stringify(result)).to.equal(expected);
	});

	it('should discard query params with slashes in them', () => {
		const url: string = '/foo/bar/?q=blah/blah';
		const expected: string = JSON.stringify(['/', '/foo', '/foo/bar']);
		const result: string[] = subpaths(url);
		expect(JSON.stringify(result)).to.equal(expected);
	});

	it('should discard anchors (#hash1)', () => {
		const url: string = '/foo/bar/qux/baz#oi';
		const expected = JSON.stringify(['/', '/foo', '/foo/bar', '/foo/bar/qux', '/foo/bar/qux/baz']);
		const result: string[] = subpaths(url);
		expect(JSON.stringify(result)).to.equal(expected);
	});

	it('should discard anchors (#hash1) with slashes', () => {
		const url: string = '/foo/bar/qux/baz#oi/foooob/bin';
		const expected = JSON.stringify(['/', '/foo', '/foo/bar', '/foo/bar/qux', '/foo/bar/qux/baz']);
		const result: string[] = subpaths(url);
		expect(JSON.stringify(result)).to.equal(expected);
	});

	it('should return [] on non-pathnames', () => {
		const notUrl = 'this is not a url!';
		const expected = '[]';
		const result: string[] = subpaths(notUrl);
		expect(JSON.stringify(result)).to.equal(expected);
	});
});
