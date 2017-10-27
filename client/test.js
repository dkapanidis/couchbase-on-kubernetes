var couchbase = require('couchbase');
var cluster = new couchbase.Cluster('couchbase://35.195.121.229');
var bucket = cluster.openBucket('default');

bucket.upsert('testdoc', {name:'Frank'}, function(err, result) {
  console.log(err);
  if (err) throw err;

  bucket.get('testdoc', function(err, result) {
    if (err) throw err;

    console.log(result.value);
    // {name: Frank}
  });
});

