const { normalizeUrl, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test('normalizeUrl strip protocol', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
    
    const input2 = 'http://blog.boot.dev/path';
    const actual2 = normalizeUrl(input);
    const expected2 = 'blog.boot.dev/path';
    expect(actual2).toEqual(expected2);

})

test('normalizeUrl strip trailing slash', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeUrl capitals', () => {
    const input = 'https://BLOG.boot.dev/path/';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML absolute', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    const expected = ['https://blog.boot.dev/path/'];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML relative', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="/path/">
                Boot.dev Blog
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    const expected = ['https://blog.boot.dev/path/'];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML multiple ULRs', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">
                Boot.dev Blog path 1
            </a>
            <a href="/path/">
                Boot.dev Blog path 2
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    const expected = ['https://blog.boot.dev/path/', 'https://blog.boot.dev/path/'];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML multiple ULRs', () => {
    const inputHTML = `
    <html>
        <body>
            <a href="invalid">
                invalid URL
            </a>
        </body>
    </html>
    `;
    const inputBaseURL = 'https://blog.boot.dev';
    const actual = getURLsFromHTML(inputHTML, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
})