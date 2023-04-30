const { JSDOM } = require('jsdom')

function checkForValidURL(url) {
    try {
       const urlObj = new URL(url); 
    } catch (err) {
        return '';
    }
    return url;
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for (const linkElement of linkElements) {      
        if (linkElement.href.slice(0, 1) === '/') {
            const url = checkForValidURL(`${baseURL}${linkElement.href}`);
            const isValid = url === '' ? null : urls.push(url);
        } else {
            const url = checkForValidURL(`${linkElement.href}`);
            const isValid = url === '' ? null : urls.push(url);
        }
    }
    return urls;
}

function normalizeUrl(urlString) {
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1);
    }
    return hostPath;
}

module.exports = {
    normalizeUrl,
    getURLsFromHTML
}