const request = require('request');
const process = require('process');


if (process.argv[2] === 'list') {
  request('https://lidemy-book-store.herokuapp.com/books?_limit=20',
    (error, response, body) => {
      const json = JSON.parse(body);
      json.forEach((item) => {
        console.log(`${item.id} ${item.name}`);
      });
    });
}

if (process.argv[2] === 'read') {
  request(`https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
    (error, response, body) => {
      const json = JSON.parse(body);
      console.log(`${json.id} ${json.name}`);
    });
}

if (process.argv[2] === 'delete') {
  request.delete(`https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
    (error, response) => {
      if (!error && response.statusCode >= 200 && response.statusCode < 300) {
        console.log('Delete Success!');
      } else {
        console.log(`Fail, status code:${response.statusCode}`);
      }
    });
}

if (process.argv[2] === 'create') {
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books',
      form: {
        name: process.argv[3],
      },
    },

    (error, response) => {
      if (!error && response.statusCode === 201) {
        console.log('Create Success!');
      } else {
        console.log(`Fail, status code:${response.statusCode}`);
      }
    },
  );
}

if (process.argv[2] === 'update') {
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
      form: {
        name: process.argv[4],
      },
    },
    (error, response) => {
      if (!error && response.statusCode >= 200 && response.statusCode < 300) {
        console.log('Update Success!');
      } else {
        console.log(`Fail, status code:${response.statusCode}`);
      }
    },
  );
}
