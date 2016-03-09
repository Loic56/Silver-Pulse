// Instantiate Couchbase and Ottoman
var couchbase = require('couchbase');
var ottoman = require('ottoman');

// Build the cluster object and open a new cluster
var cluster = new couchbase.Cluster('couchbase://192.168.59.103:8091');
var bucket = cluster.openBucket('default');
ottoman.bucket = bucket;

// Build the "schema" from the model files
require('./model/user');
//require('./model/project');

// Build the necessary indexes to function
ottoman.ensureIndices(function(err) {
  if (err) return console.error(err);
});