package main

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis/v8"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type HashRecord struct {
	Hash string `gorm:"primary_key"`
	Text string
}

type TextStruct struct {
	Text string `json:"text"`
}

var db *gorm.DB
var err error
var ctx = context.Background()
var rdb *redis.Client

func main() {
	rdb = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",
		Password: "",
		DB:       0,
	})
	db, err = gorm.Open("postgres", "host=localhost port=5432 user=postgres dbname=webdev sslmode=disable password=thankyoushayan")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()
	db.AutoMigrate(&HashRecord{})
	r := gin.Default()
	r.GET("/sha256", hashToText)
	r.POST("/sha256", textToHash)
	r.Run(":5000") // runs on port 5000
}

func hashToText(c *gin.Context) {
	hash := c.Query("hash")
	if len(hash) != 64 {
		c.JSON(400, gin.H{
			"error": "hash has incorrect length",
		})
		return
	}
	text, err := rdb.Get(ctx, hash).Result()
	if err == nil {
		fmt.Println("cash ziad eyne hatami")
		c.JSON(200, gin.H{
			"text": text,
		})
		return
	} else {
		fmt.Println(err)
	}
	var record HashRecord
	exists := db.First(&record, "hash = ?", hash)
	if exists.Error == nil {
		c.JSON(200, gin.H{
			"text": record.Text,
		})
	} else {
		c.JSON(503, gin.H{
			"error": "Hash not found",
		})
	}
}

func textToHash(c *gin.Context) {
	var textStruct TextStruct
	c.BindJSON(&textStruct)
	text := textStruct.Text
	if len(text) < 8 {
		c.JSON(400, gin.H{
			"error": "text has less than 8 chars",
		})
		return
	}
	hasher := sha256.New()
	hasher.Write([]byte(text))
	shaHash := hex.EncodeToString(hasher.Sum(nil))
	c.JSON(200, gin.H{
		"hash": shaHash,
	})
	if rdb.Get(ctx, shaHash).Err() != nil {
		rdb.Set(ctx, shaHash, text, 0)
		record := &HashRecord{Text: text, Hash: shaHash}
		db.Create((&record))
	}
}
