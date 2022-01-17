package main

import (
	"context"
	"google.golang.org/grpc"
	"log"
	"sample.com/cache-server/adapter"
	"sample.com/cache-server/protocol"
	"time"
)

var address string

func init()  {
	address = adapter.GoDotEnvVariable("ADDRESS")
}

func main() {
	conn, err := grpc.Dial(address, grpc.WithInsecure(), grpc.WithBlock())
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := protocol.NewCacheClient(conn)
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	if _, err := c.Set(ctx, &protocol.SetRequest{
		Key: adapter.GetKeyFromString("shayan"),
		Value: adapter.GetValueFromString("pardis"),
	}); err != nil {
		log.Fatalf("error while setting: %v", err)
	}
	r, err := c.Get(ctx, &protocol.GetRequest{
		Key: adapter.GetKeyFromString("shayan"),
	})
	if err != nil {
		log.Fatalf("error while getting: %v", err)
	}
	log.Printf("Result %v", r)
}
