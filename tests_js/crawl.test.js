const { normalizeUrl } = require("./crawl.js");
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