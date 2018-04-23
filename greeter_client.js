
var PROTO_PATH = __dirname + '/helloworld.proto';

var grpc = require('grpc');
var hello_proto = grpc.load(PROTO_PATH).helloworld;

function main() {
  var client = new hello_proto.Greeter('localhost:50051',
                                       grpc.credentials.createInsecure());
  var params={
    name :'Heresy',
    address:'Near nerus',
    location :'Hyderabad',
    productID :'111111111111111114'
   };
 
  // client.Insert(params, function(err, response) {
  //   console.log('Addition:', response.message);
  // });


  var client_get =new hello_proto.getlist('localhost:50051',
                                            grpc.credentials.createInsecure());
   
    client_get.get('Heresy',function(err,response){
      console.log('mylist',response);
    });
  
}

main();
