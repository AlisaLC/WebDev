package adapter

import "sample.com/cache-server/protocol"

type CustomKey struct {
	string string
	int int64
	isString bool
}

func KeyToCustom(key *protocol.Key) CustomKey {
	switch key.Type.(type) {
	case *protocol.Key_IntT:
		return CustomKey{int: key.GetIntT(), isString: false}
	case *protocol.Key_StringT:
		return CustomKey{string: key.GetStringT(), isString: true}
	}
	return CustomKey{} // never happens!
}

func GetValueFromString(x string) *protocol.Value {
	tmp:= &protocol.Value_StringT{StringT: x}
	return &protocol.Value{Type: tmp}
}
func GetValueFromInt(x int64) *protocol.Value {
	tmp:= &protocol.Value_IntT{IntT: x}
	return &protocol.Value{Type: tmp}
}
func GetKeyFromString(x string) *protocol.Key {
	tmp:= &protocol.Key_StringT{StringT: x}
	return &protocol.Key{Type: tmp}
}
func GetKeyFromInt(x int64) *protocol.Key {
	tmp:= &protocol.Key_IntT{IntT: x}
	return &protocol.Key{Type: tmp}
}

func CheckValidKey(key *protocol.Key) bool {
	switch key.Type.(type) {
	case *protocol.Key_StringT:
		return len(key.GetStringT()) <= 1024
	}
	return true
}
func CheckValidValue(val *protocol.Value) bool {
	switch val.Type.(type) {
	case *protocol.Value_StringT:
		return len(val.GetStringT()) <= 1024
	}
	return true
}
