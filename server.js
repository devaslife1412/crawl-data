const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs');

request('https://123job.vn/tuyen-dung', (err, res, req) => {
  if (!err && res.statusCode == 200) {
    const $ = cheerio.load(req);
    let data = []
    $('.job__list-item').each((index, el) => {
      const job = $(el).find('.job__list-item-title a').text();
      const company = $(el).find('.job__list-item-company span').text();
      const address = $(el).find('.job__list-item-info').find('.address').text();
      const salary = $(el).find('.job__list-item-info').find('.salary').text();
      const url = $(el).find('.job__list-item-title').find('a').attr('href');
      data.push({
        job, company, address, salary, url
      });
    });

    fs.writeFileSync('data.json', JSON.stringify(data));
  }
  else {
    console.log(err);
  }
});
