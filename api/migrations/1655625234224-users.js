'use strict'

const { faker } = require('@faker-js/faker');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost/test';

module.exports.up = function (next) {

  MongoClient.connect(url, (err, client) => {

    const db = client.db();

    const users = Array.from({ length: 20 }).map(()=>{
      return { 
        email: faker.internet.email(),
        role: 'guest',
        password: 'qwerty'
      }
    });

    const user = {
      email: 'demo@gmail.com',
      password: 'demo',
      role: 'administrator'
    }

    db.collection('users')
    .insertMany([ user, ...users ])
    .then(()=> next())
    .catch(next);

  });
}
