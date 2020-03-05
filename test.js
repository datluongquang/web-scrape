const cheerio = require("cheerio");
const axios = require("axios");
const fs = require('fs');

const orisiteUrl = "https://webapps.union.edu/course-schedules?fbclid=IwAR1Xne9c487xcg5m9CVaDjJPvGflnF4DwXzOMqf5maQJjaJL8zHyVIEfZqg";

const tags = new Set();

const fetchData = async (url) => {
    const result = await axios.get(url);
    return cheerio.load(result.data);
};

const getResults = async (url) => {
    const $ = await fetchData(url);
    const table= $("table tbody tr")
    //console.log(table.children().children())
    let a=0;
    $("table tbody tr").each((index, element) => {
        const bodyTr= $(element).children("td");
        //console.log(bodyTr)
        Array.prototype.forEach.call(bodyTr, child => {
            console.log($(child).text().replace(/\s/g,''));
        });
    });
    // $("td[headers='view-field-course-number-cs-table-column']").each((index, element) => {
    //     tags.add($(element).text().replace(/\s/g,''));
    // });
    // const next= $(".pager__link.pager__link--next").attr('href');
    // console.log(tags.size)
    // if(next!=undefined){
    //     await getResults("https://webapps.union.edu/course-schedules"+next);
    // }
    // return {
    //     name:[...tags],
    // };
};

getResults(orisiteUrl)