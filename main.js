const { crawlPage } = require('./tests_js/crawl.js');
const { printReport } = require('./report/report.js')

async function main() {
    if (process.argv.length < 3) {
        console.log('No website provided');
        process.exit(1);
    } else if (process.argv.length > 3) {
        console.log('too many websites provided');
        process.exit(1);
    }  
    const baseURL = process.argv[2];
  
    console.log(`starting crawl of ${baseURL}`);
    const pages = await crawlPage(baseURL, baseURL, {});

    printReport(pages);
}

main()