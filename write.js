const fs = require('fs');
const getResults = require('./scrape');
const orisiteUrl = "https://webapps.union.edu/course-schedules?fbclid=IwAR1Xne9c487xcg5m9CVaDjJPvGflnF4DwXzOMqf5maQJjaJL8zHyVIEfZqg";

(async () => {
    let results = await getResults(orisiteUrl)
    let jsonString = JSON.stringify(results);
    fs.writeFileSync('./output.json', jsonString, 'utf-8');
})()