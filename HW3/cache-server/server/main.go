package main

import (
	"context"
	"errors"
	"google.golang.org/grpc"
	"log"
	"net"
	"sample.com/cache-server/adapter"
	"sample.com/cache-server/protocol"
)


type server struct {
	protocol.UnimplementedCacheServer
}

func (server) Get(ctx context.Context, req *protocol.GetRequest) (*protocol.GetResponse, error) {
	log.Printf("Get Request -> %v", req)
	res, err := cache.get(adapter.KeyToCustom(req.Key))
	return &protocol.GetResponse{Value: res}, err
}
func (server) Set(ctx context.Context, req *protocol.SetRequest) (*protocol.SetResponse, error) {
	log.Printf("Set Request -> %v", req)
	if !adapter.CheckValidKey(req.Key) {
		return nil, errors.New("key is a string longer than 1024")
	}
	if !adapter.CheckValidValue(req.Value) {
		return nil, errors.New("value is a string longer than 1024")
	}
	cache.set(adapter.KeyToCustom(req.Key), req.Value)
	return &protocol.SetResponse{}, nil
}


func init() {
	port = adapter.GoDotEnvVariable("PORT")
	if len(port) == 0 || port[0] != ':' {
		log.Fatalf("Error PORT is not specified or not valid (must start with \":\")")
		return
	}
}

var port string

func main() {
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	protocol.RegisterCacheServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
