const MongoClient = require('mongodb').MongoClient;
// const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const databaseName = 'toDoList-db';
// const collectionName = 'items-to-do';
const mongoDbUrl = process.env.ATLAS_CONNECTION;
const settings = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

let database;

// const Connect = function() {
//     return new Promise((resolve, reject) => {
//         MongoClient.connect(mongoDbUrl, settings, function(err, client) {
//             if(err) {
//                 reject(err);
//             }
//             else {
//                 console.log('successfully connected to database');
//                 database = client.db(databaseName);
//                 resolve();
//             }
//         });
//     });
// };


const Connect = function(locals) {
   return MongoClient.connect(mongoDbUrl, settings)
   .then(client => {
        locals.listsCollection = client.db(databaseName).collection('lists')
        locals.tasksCollection = client.db(databaseName).collection('tasks')
        return client
   })
}


const Find = function(item, collection) {
    let itemQuery = {};
    if (item) {
        itemQuery = item;
    }
    console.log(collection);
    return new Promise((resolve, reject) => {
        
        collection.find(itemQuery).toArray(function(err, res) {
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

const Insert = function(item, collection) {
    console.log(collection);
    return new Promise((resolve, reject) => {
        
        collection.insertOne(item, function(err, res) {
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

const Update = function(newItem, collection) {
    return new Promise((resolve, reject) => {
        
        collection.updateOne(newItem, function(err, res) {
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

const Remove = function(item, collection) {
    return new Promise((resolve, reject) => {
        
        collection.deleteOne(item, function(err, res) {
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
