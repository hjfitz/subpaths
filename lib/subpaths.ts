/**
 * return a list of all subpaths
 * @param path pathname of the form /foo/bar/quz/ to match
 * @returns list of all subpaths
 */
export default function list(path: string): string[] {
	const pathnameRE: string = '^/(?:[^%]|%[0-9A-Fa-f]{2})+$';
	const match: RegExpMatchArray|null = path.match(pathnameRE);
	if (!match && path !== '/') return [];
	// begin by removing query params and hashes
	const { pathname }: {pathname: string} = new URL(`https://www.test.com${path}`);
	const split: string[] = pathname.split('/').filter(Boolean);
	let cursor: string = '';
	const paths: string[]  = [];
	for (let i: number = 0; i < split.length; i += 1) {
		cursor = `${cursor}/${split[i]}`;
		paths.push(cursor);
	}

	return ['/', ...paths];
}
