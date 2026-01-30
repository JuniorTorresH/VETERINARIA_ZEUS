import { pathToRegexp } from 'path-to-regexp';

const paths = [
    '/:path*',
    '/(.*)',
    '*',
    '/:path(.*)',
    '/*path',
    '{/:path}*',
];

for (const path of paths) {
    try {
        pathToRegexp(path);
        console.log(`✅ Success: ${path}`);
    } catch (e) {
        console.log(`❌ Error: ${path} - ${e.message}`);
    }
}
