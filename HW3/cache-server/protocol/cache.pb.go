// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.26.0
// 	protoc        v3.6.1
// source: protocol/cache.proto

package protocol

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type Key struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to Type:
	//	*Key_StringT
	//	*Key_IntT
	Type isKey_Type `protobuf_oneof:"type"`
}

func (x *Key) Reset() {
	*x = Key{}
	if protoimpl.UnsafeEnabled {
		mi := &file_protocol_cache_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Key) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Key) ProtoMessage() {}

func (x *Key) ProtoReflect() protoreflect.Message {
	mi := &file_protocol_cache_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Key.ProtoReflect.Descriptor instead.
func (*Key) Descriptor() ([]byte, []int) {
	return file_protocol_cache_proto_rawDescGZIP(), []int{0}
}

func (m *Key) GetType() isKey_Type {
	if m != nil {
		return m.Type
	}
	return nil
}

func (x *Key) GetStringT() string {
	if x, ok := x.GetType().(*Key_StringT); ok {
		return x.StringT
	}
	return ""
}

func (x *Key) GetIntT() int64 {
	if x, ok := x.GetType().(*Key_IntT); ok {
		return x.IntT
	}
	return 0
}

type isKey_Type interface {
	isKey_Type()
}

type Key_StringT struct {
	StringT string `protobuf:"bytes,1,opt,name=string_t,json=stringT,oneof"`
}

type Key_IntT struct {
	IntT int64 `protobuf:"varint,2,opt,name=int_t,json=intT,oneof"`
}

func (*Key_StringT) isKey_Type() {}

func (*Key_IntT) isKey_Type() {}

type Value struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	// Types that are assignable to Type:
	//	*Value_StringT
	//	*Value_IntT
	Type isValue_Type `protobuf_oneof:"type"`
}

func (x *Value) Reset() {
	*x = Value{}
	if protoimpl.UnsafeEnabled {
		mi := &file_protocol_cache_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *Value) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*Value) ProtoMessage() {}

func (x *Value) ProtoReflect() protoreflect.Message {
	mi := &file_protocol_cache_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use Value.ProtoReflect.Descriptor instead.
func (*Value) Descriptor() ([]byte, []int) {
	return file_protocol_cache_proto_rawDescGZIP(), []int{1}
}

func (m *Value) GetType() isValue_Type {
	if m != nil {
		return m.Type
	}
	return nil
}

func (x *Value) GetStringT() string {
	if x, ok := x.GetType().(*Value_StringT); ok {
		return x.StringT
	}
	return ""
}

func (x *Value) GetIntT() int64 {
	if x, ok := x.GetType().(*Value_IntT); ok {
		return x.IntT
	}
	return 0
}

type isValue_Type interface {
	isValue_Type()
}

type Value_StringT struct {
	StringT string `protobuf:"bytes,1,opt,name=string_t,json=stringT,oneof"`
}

type Value_IntT struct {
	IntT int64 `protobuf:"varint,2,opt,name=int_t,json=intT,oneof"`
}

func (*Value_StringT) isValue_Type() {}

func (*Value_IntT) isValue_Type() {}

type SetRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Key   *Key   `protobuf:"bytes,1,req,name=key" json:"key,omitempty"`
	Value *Value `protobuf:"bytes,2,req,name=value" json:"value,omitempty"`
}

func (x *SetRequest) Reset() {
	*x = SetRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_protocol_cache_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SetRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SetRequest) ProtoMessage() {}

func (x *SetRequest) ProtoReflect() protoreflect.Message {
	mi := &file_protocol_cache_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SetRequest.ProtoReflect.Descriptor instead.
func (*SetRequest) Descriptor() ([]byte, []int) {
	return file_protocol_cache_proto_rawDescGZIP(), []int{2}
}

func (x *SetRequest) GetKey() *Key {
	if x != nil {
		return x.Key
	}
	return nil
}

func (x *SetRequest) GetValue() *Value {
	if x != nil {
		return x.Value
	}
	return nil
}

type GetRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Key *Key `protobuf:"bytes,1,req,name=key" json:"key,omitempty"`
}

func (x *GetRequest) Reset() {
	*x = GetRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_protocol_cache_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetRequest) ProtoMessage() {}

func (x *GetRequest) ProtoReflect() protoreflect.Message {
	mi := &file_protocol_cache_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetRequest.ProtoReflect.Descriptor instead.
func (*GetRequest) Descriptor() ([]byte, []int) {
	return file_protocol_cache_proto_rawDescGZIP(), []int{3}
}

func (x *GetRequest) GetKey() *Key {
	if x != nil {
		return x.Key
	}
	return nil
}

type SetResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *SetResponse) Reset() {
	*x = SetResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_protocol_cache_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *SetResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*SetResponse) ProtoMessage() {}

func (x *SetResponse) ProtoReflect() protoreflect.Message {
	mi := &file_protocol_cache_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use SetResponse.ProtoReflect.Descriptor instead.
func (*SetResponse) Descriptor() ([]byte, []int) {
	return file_protocol_cache_proto_rawDescGZIP(), []int{4}
}

type GetResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	Value *Value `protobuf:"bytes,2,req,name=value" json:"value,omitempty"`
}

func (x *GetResponse) Reset() {
	*x = GetResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_protocol_cache_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetResponse) ProtoMessage() {}

func (x *GetResponse) ProtoReflect() protoreflect.Message {
	mi := &file_protocol_cache_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetResponse.ProtoReflect.Descriptor instead.
func (*GetResponse) Descriptor() ([]byte, []int) {
	return file_protocol_cache_proto_rawDescGZIP(), []int{5}
}

func (x *GetResponse) GetValue() *Value {
	if x != nil {
		return x.Value
	}
	return nil
}

type ClearResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *ClearResponse) Reset() {
	*x = ClearResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_protocol_cache_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ClearResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ClearResponse) ProtoMessage() {}

func (x *ClearResponse) ProtoReflect() protoreflect.Message {
	mi := &file_protocol_cache_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ClearResponse.ProtoReflect.Descriptor instead.
func (*ClearResponse) Descriptor() ([]byte, []int) {
	return file_protocol_cache_proto_rawDescGZIP(), []int{6}
}

type ClearRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *ClearRequest) Reset() {
	*x = ClearRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_protocol_cache_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ClearRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ClearRequest) ProtoMessage() {}

func (x *ClearRequest) ProtoReflect() protoreflect.Message {
	mi := &file_protocol_cache_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ClearRequest.ProtoReflect.Descriptor instead.
func (*ClearRequest) Descriptor() ([]byte, []int) {
	return file_protocol_cache_proto_rawDescGZIP(), []int{7}
}

var File_protocol_cache_proto protoreflect.FileDescriptor

var file_protocol_cache_proto_rawDesc = []byte{
	0x0a, 0x14, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x63, 0x6f, 0x6c, 0x2f, 0x63, 0x61, 0x63, 0x68, 0x65,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x41, 0x0a, 0x03, 0x4b, 0x65, 0x79, 0x12, 0x1b, 0x0a,
	0x08, 0x73, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x5f, 0x74, 0x18, 0x01, 0x20, 0x01, 0x28, 0x09, 0x48,
	0x00, 0x52, 0x07, 0x73, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x54, 0x12, 0x15, 0x0a, 0x05, 0x69, 0x6e,
	0x74, 0x5f, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x03, 0x48, 0x00, 0x52, 0x04, 0x69, 0x6e, 0x74,
	0x54, 0x42, 0x06, 0x0a, 0x04, 0x74, 0x79, 0x70, 0x65, 0x22, 0x43, 0x0a, 0x05, 0x56, 0x61, 0x6c,
	0x75, 0x65, 0x12, 0x1b, 0x0a, 0x08, 0x73, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x5f, 0x74, 0x18, 0x01,
	0x20, 0x01, 0x28, 0x09, 0x48, 0x00, 0x52, 0x07, 0x73, 0x74, 0x72, 0x69, 0x6e, 0x67, 0x54, 0x12,
	0x15, 0x0a, 0x05, 0x69, 0x6e, 0x74, 0x5f, 0x74, 0x18, 0x02, 0x20, 0x01, 0x28, 0x03, 0x48, 0x00,
	0x52, 0x04, 0x69, 0x6e, 0x74, 0x54, 0x42, 0x06, 0x0a, 0x04, 0x74, 0x79, 0x70, 0x65, 0x22, 0x42,
	0x0a, 0x0a, 0x53, 0x65, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x12, 0x16, 0x0a, 0x03,
	0x6b, 0x65, 0x79, 0x18, 0x01, 0x20, 0x02, 0x28, 0x0b, 0x32, 0x04, 0x2e, 0x4b, 0x65, 0x79, 0x52,
	0x03, 0x6b, 0x65, 0x79, 0x12, 0x1c, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18, 0x02, 0x20,
	0x02, 0x28, 0x0b, 0x32, 0x06, 0x2e, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x52, 0x05, 0x76, 0x61, 0x6c,
	0x75, 0x65, 0x22, 0x24, 0x0a, 0x0a, 0x47, 0x65, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74,
	0x12, 0x16, 0x0a, 0x03, 0x6b, 0x65, 0x79, 0x18, 0x01, 0x20, 0x02, 0x28, 0x0b, 0x32, 0x04, 0x2e,
	0x4b, 0x65, 0x79, 0x52, 0x03, 0x6b, 0x65, 0x79, 0x22, 0x0d, 0x0a, 0x0b, 0x53, 0x65, 0x74, 0x52,
	0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x2b, 0x0a, 0x0b, 0x47, 0x65, 0x74, 0x52, 0x65,
	0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x1c, 0x0a, 0x05, 0x76, 0x61, 0x6c, 0x75, 0x65, 0x18,
	0x02, 0x20, 0x02, 0x28, 0x0b, 0x32, 0x06, 0x2e, 0x56, 0x61, 0x6c, 0x75, 0x65, 0x52, 0x05, 0x76,
	0x61, 0x6c, 0x75, 0x65, 0x22, 0x0f, 0x0a, 0x0d, 0x43, 0x6c, 0x65, 0x61, 0x72, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x0e, 0x0a, 0x0c, 0x43, 0x6c, 0x65, 0x61, 0x72, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x32, 0x79, 0x0a, 0x05, 0x43, 0x61, 0x63, 0x68, 0x65, 0x12, 0x22,
	0x0a, 0x03, 0x47, 0x65, 0x74, 0x12, 0x0b, 0x2e, 0x47, 0x65, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65,
	0x73, 0x74, 0x1a, 0x0c, 0x2e, 0x47, 0x65, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65,
	0x22, 0x00, 0x12, 0x22, 0x0a, 0x03, 0x53, 0x65, 0x74, 0x12, 0x0b, 0x2e, 0x53, 0x65, 0x74, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x0c, 0x2e, 0x53, 0x65, 0x74, 0x52, 0x65, 0x73, 0x70,
	0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00, 0x12, 0x28, 0x0a, 0x05, 0x43, 0x6c, 0x65, 0x61, 0x72, 0x12,
	0x0d, 0x2e, 0x43, 0x6c, 0x65, 0x61, 0x72, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x0e,
	0x2e, 0x43, 0x6c, 0x65, 0x61, 0x72, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x00,
	0x42, 0x22, 0x5a, 0x20, 0x73, 0x61, 0x6d, 0x70, 0x6c, 0x65, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x63,
	0x61, 0x63, 0x68, 0x65, 0x2d, 0x73, 0x65, 0x72, 0x76, 0x65, 0x72, 0x3b, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x63, 0x6f, 0x6c,
}

var (
	file_protocol_cache_proto_rawDescOnce sync.Once
	file_protocol_cache_proto_rawDescData = file_protocol_cache_proto_rawDesc
)

func file_protocol_cache_proto_rawDescGZIP() []byte {
	file_protocol_cache_proto_rawDescOnce.Do(func() {
		file_protocol_cache_proto_rawDescData = protoimpl.X.CompressGZIP(file_protocol_cache_proto_rawDescData)
	})
	return file_protocol_cache_proto_rawDescData
}

var file_protocol_cache_proto_msgTypes = make([]protoimpl.MessageInfo, 8)
var file_protocol_cache_proto_goTypes = []interface{}{
	(*Key)(nil),           // 0: Key
	(*Value)(nil),         // 1: Value
	(*SetRequest)(nil),    // 2: SetRequest
	(*GetRequest)(nil),    // 3: GetRequest
	(*SetResponse)(nil),   // 4: SetResponse
	(*GetResponse)(nil),   // 5: GetResponse
	(*ClearResponse)(nil), // 6: ClearResponse
	(*ClearRequest)(nil),  // 7: ClearRequest
}
var file_protocol_cache_proto_depIdxs = []int32{
	0, // 0: SetRequest.key:type_name -> Key
	1, // 1: SetRequest.value:type_name -> Value
	0, // 2: GetRequest.key:type_name -> Key
	1, // 3: GetResponse.value:type_name -> Value
	3, // 4: Cache.Get:input_type -> GetRequest
	2, // 5: Cache.Set:input_type -> SetRequest
	7, // 6: Cache.Clear:input_type -> ClearRequest
	5, // 7: Cache.Get:output_type -> GetResponse
	4, // 8: Cache.Set:output_type -> SetResponse
	6, // 9: Cache.Clear:output_type -> ClearResponse
	7, // [7:10] is the sub-list for method output_type
	4, // [4:7] is the sub-list for method input_type
	4, // [4:4] is the sub-list for extension type_name
	4, // [4:4] is the sub-list for extension extendee
	0, // [0:4] is the sub-list for field type_name
}

func init() { file_protocol_cache_proto_init() }
func file_protocol_cache_proto_init() {
	if File_protocol_cache_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_protocol_cache_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Key); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_protocol_cache_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*Value); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_protocol_cache_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SetRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_protocol_cache_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_protocol_cache_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*SetResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_protocol_cache_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_protocol_cache_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ClearResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_protocol_cache_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ClearRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	file_protocol_cache_proto_msgTypes[0].OneofWrappers = []interface{}{
		(*Key_StringT)(nil),
		(*Key_IntT)(nil),
	}
	file_protocol_cache_proto_msgTypes[1].OneofWrappers = []interface{}{
		(*Value_StringT)(nil),
		(*Value_IntT)(nil),
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_protocol_cache_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   8,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_protocol_cache_proto_goTypes,
		DependencyIndexes: file_protocol_cache_proto_depIdxs,
		MessageInfos:      file_protocol_cache_proto_msgTypes,
	}.Build()
	File_protocol_cache_proto = out.File
	file_protocol_cache_proto_rawDesc = nil
	file_protocol_cache_proto_goTypes = nil
	file_protocol_cache_proto_depIdxs = nil
}
