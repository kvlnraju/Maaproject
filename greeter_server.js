
var PROTO_PATH = __dirname + '/helloworld.proto';

var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).helloworld;
let ObjectId = require("mongodb").ObjectID;
var MongoClient = require('mongodb').MongoClient;

var url = "mongodb://localhost:27017/";

/**
 * Implements the SayHello RPC method.
 */
function Insert(call, callback) {
 MongoClient.connect(url,function(err,db){

  if(err) throw err;
  var dbo = db.db('admin');
  var myobj ={
    name:call.request.name,
    address:call.request.address,
    location:call.request.location,
    productID:call.request.productID
  };
  dbo.collection("customers").insertOne(myobj,function(err,res){
    if(err) throw err;
    console.log("1 document inserted");
    db.close();
  })
 });
 
  callback(null, {message: 'successfully Inserted'});
}

function get(call,callback){
  var obj;
 MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("admin");
  
  dbo.collection("customers").find( {"_id": ObjectId('5ad880f35676d919786162fc')} ).toArray(function(err, result) {
    if (err) throw err;
    obj =JSON.stringify(result);
    //console.log(result);
    callback(null,{message:obj})
    db.close();
  });
});
}
/**
 * Starts an RPC server that receives requests for the Greeter service at the
 * sample server port
 */
function main() {
  var server = new grpc.Server();
  server.addService(hello_proto.Greeter.service, {Insert:Insert});
  server.addService(hello_proto.getlist.service,{get:get});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
