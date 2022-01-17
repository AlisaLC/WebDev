var PROTO_PATH = __dirname + '/protocol/cache.proto';
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
// Suggested options for similarity to existing grpc.load behavior
var packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const cache = protoDescriptor.Cache;
const stub = new cache('localhost:5050', grpc.credentials.createInsecure());

function set_sample() {
    stub.set({key: {string_t: "salam"}, value: {string_t: "hi"}}, function (err, res) {
        console.log(err, res)
    })
}
function get_sample() {
    stub.get({key: {string_t: "salam"}}, function (err, res) {
        console.log(err, res)
    })
}
