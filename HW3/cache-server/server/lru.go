package main

import (
	"container/list"
	"errors"
	"github.com/joho/godotenv"
	"log"
	"sample.com/cache-server/adapter"
	"sample.com/cache-server/protocol"
	"strconv"
	"sync"
)

type LRUCache struct {
	mu sync.Mutex
	capacity int
	list     *list.List
	elements map[adapter.CustomKey]*list.Element
}
type KeyPair struct {
	key   adapter.CustomKey
	value *protocol.Value
}
func (c *LRUCache) set(key adapter.CustomKey, value *protocol.Value) {
	c.mu.Lock()
	defer c.mu.Unlock()

	if node, ok := c.elements[key]; ok {
		c.list.MoveToFront(node)
		node.Value.(*list.Element).Value = KeyPair{key: key, value: value}
	} else {
		if c.list.Len() == c.capacity {
			idx := c.list.Back().Value.(*list.Element).Value.(KeyPair).key
			delete(c.elements, idx)
			c.list.Remove(c.list.Back())
		}
	}

	node := &list.Element{
		Value: KeyPair{
			key:   key,
			value: value,
		},
	}

	pointer := c.list.PushFront(node)
	c.elements[key] = pointer
}
func (c *LRUCache) get(key adapter.CustomKey) (*protocol.Value, error) {
	c.mu.Lock()
	defer c.mu.Unlock()
	if node, found := c.elements[key]; found {
		value := node.Value.(*list.Element).Value.(KeyPair).value
		c.list.MoveToFront(node)
		return value, nil
	}
	return nil, errors.New("no such value")
}
func (c *LRUCache) clear() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.list = &list.List{}
	c.elements = map[adapter.CustomKey]*list.Element{}
}

func init()  {
	if err := godotenv.Load(); err != nil {
		log.Fatalf("Error loading .env file")
		return
	}
	CAP, err := strconv.Atoi(adapter.GoDotEnvVariable("CAPACITY"))
	if err != nil {
		log.Fatalf("Error CAPACITY is not specified or not an Integer")
		return
	}
	cache = LRUCache{
		capacity: CAP,
		list: &list.List{},
		elements: map[adapter.CustomKey]*list.Element{},
	}
}

var cache LRUCache

