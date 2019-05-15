const request = require('request');

request('https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    if (error) { console.log(error); }
    const json = JSON.parse(body);
    json.forEach((item) => {
      console.log(`${item.id} ${item.name}`);
    });
  });
