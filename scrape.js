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
    // $("td[headers='view-field-course-number-cs-table-column']").each((index, element) => {
    //     tags.add($(element).text().replace(/\s/g,''));
    // });
    let count=0;
    $("table tbody tr").each((index, element) => {
        const bodyTr= $(element).children("td");
        //console.log(bodyTr)
        const dummy= [];
        Array.prototype.forEach.call(bodyTr, child => {
            dummy.push($(child).text().trim());
        });
        count=dummy.length;
        if(count==13){
            dummy.splice(5, 0, "");
        }
        else if( count==12){
            dummy.splice(4,0,"");
            dummy.splice(5,0,"");
        }
        tags.add(dummy)
    });
    const next= $(".pager__link.pager__link--next").attr('href');
    console.log(tags.size)
    if(next!=undefined){
        await getResults("https://webapps.union.edu/course-schedules"+next);
    }
    return {
        name:[...tags],
    };
};

module.exports = getResults;