const MongoClient = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const databaseName = 'toDoList-db';
const collectionName = 'items-to-do';
const mongoDbUrl = process.env.ATLAS_CONNECTION;
const settings = {
    useUnifiedTopology: true
};

let database;

const Connect = function() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(mongoDbUrl, settings, function(err, client) {
            if(err) {
                reject(err);
            }
            else {
                console.log('successfully connected to database');
                database = client.db(databaseName);
                resolve();
            }
        });
    });
};

const Find = function(item) {
    let itemQuery = {};
    if (item) {
        itemQuery = item;
    }
    return new Promise((resolve, reject) => {
        const itemCollection=database.collection(collectionName);
        itemCollection.find(itemQuery).toArray(function(err, res) {
            if(err) {
                reject(err);
            }
            else {
                console.log('successfully found to do list items');
                resolve(res);
            }
        });
    });
};

const Insert = function(item) {
    return new Promise((resolve, reject) => {
        const itemCollection = database.collection(collectionName);
        itemCollection.insertOne(item, function(err, res) {
            if(err) {
                reject(err);
            }
            else {
                console.log('successfully inserted a new to do list item');
                resolve(res);
            }
        });
    });
};

const Update = function(item, newItem) {
    return new Promise((resolve, reject) => {
        const itemCollection = database.collection(collectionName);
        itemCollection.updateOne(item, newItem, function(err, res) {
            if(err) {
                reject(err);
            }
            else {
                console.log('successfully updated a to do list item')
                resolve(res);
            }
        });
    });
};

const Remove = function(item) {
    return new Promise((resolve, reject) => {
        const itemCollection = database.collection(collectionName);
        itemCollection.deleteOne(item, function(err, res) {
            if(err) {
                reject(err);
            }
            else {
                console.log('successfully removed a to do list item');
                resolve(res);
            }
        });
    });
};

module.exports = { Connect, Find, Insert, Update, Remove }
