// Code generated by protoc-gen-go-grpc. DO NOT EDIT.

package protocol

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// CacheClient is the client API for Cache service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type CacheClient interface {
	Get(ctx context.Context, in *GetRequest, opts ...grpc.CallOption) (*GetResponse, error)
	Set(ctx context.Context, in *SetRequest, opts ...grpc.CallOption) (*SetResponse, error)
	F(ctx context.Context, in *Sample, opts ...grpc.CallOption) (*Sample, error)
}

type cacheClient struct {
	cc grpc.ClientConnInterface
}

func NewCacheClient(cc grpc.ClientConnInterface) CacheClient {
	return &cacheClient{cc}
}

func (c *cacheClient) Get(ctx context.Context, in *GetRequest, opts ...grpc.CallOption) (*GetResponse, error) {
	out := new(GetResponse)
	err := c.cc.Invoke(ctx, "/Cache/Get", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *cacheClient) Set(ctx context.Context, in *SetRequest, opts ...grpc.CallOption) (*SetResponse, error) {
	out := new(SetResponse)
	err := c.cc.Invoke(ctx, "/Cache/Set", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *cacheClient) F(ctx context.Context, in *Sample, opts ...grpc.CallOption) (*Sample, error) {
	out := new(Sample)
	err := c.cc.Invoke(ctx, "/Cache/F", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// CacheServer is the server API for Cache service.
// All implementations must embed UnimplementedCacheServer
// for forward compatibility
type CacheServer interface {
	Get(context.Context, *GetRequest) (*GetResponse, error)
	Set(context.Context, *SetRequest) (*SetResponse, error)
	F(context.Context, *Sample) (*Sample, error)
	mustEmbedUnimplementedCacheServer()
}

// UnimplementedCacheServer must be embedded to have forward compatible implementations.
type UnimplementedCacheServer struct {
}

func (UnimplementedCacheServer) Get(context.Context, *GetRequest) (*GetResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Get not implemented")
}
func (UnimplementedCacheServer) Set(context.Context, *SetRequest) (*SetResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method Set not implemented")
}
func (UnimplementedCacheServer) F(context.Context, *Sample) (*Sample, error) {
	return nil, status.Errorf(codes.Unimplemented, "method F not implemented")
}
func (UnimplementedCacheServer) mustEmbedUnimplementedCacheServer() {}

// UnsafeCacheServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to CacheServer will
// result in compilation errors.
type UnsafeCacheServer interface {
	mustEmbedUnimplementedCacheServer()
}

func RegisterCacheServer(s grpc.ServiceRegistrar, srv CacheServer) {
	s.RegisterService(&Cache_ServiceDesc, srv)
}

func _Cache_Get_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CacheServer).Get(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/Cache/Get",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CacheServer).Get(ctx, req.(*GetRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Cache_Set_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(SetRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CacheServer).Set(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/Cache/Set",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CacheServer).Set(ctx, req.(*SetRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _Cache_F_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(Sample)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(CacheServer).F(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/Cache/F",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(CacheServer).F(ctx, req.(*Sample))
	}
	return interceptor(ctx, in, info, handler)
}

// Cache_ServiceDesc is the grpc.ServiceDesc for Cache service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Cache_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "Cache",
	HandlerType: (*CacheServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "Get",
			Handler:    _Cache_Get_Handler,
		},
		{
			MethodName: "Set",
			Handler:    _Cache_Set_Handler,
		},
		{
			MethodName: "F",
			Handler:    _Cache_F_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "protocol/cache.proto",
}
