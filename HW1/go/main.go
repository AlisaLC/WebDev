package main

import (
	"crypto/sha1"
	"encoding/hex"
	"github.com/gin-gonic/gin"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

type HashRecord struct {
	Hash string `gorm:"primary_key"`
	Text string
}

var db *gorm.DB
var err error

func main() {
	db, err = gorm.Open("postgres", "host=localhost port=5432 user=docker dbname=docker sslmode=disable password=docker")
	if err != nil {
		panic("failed to connect database")
	}
	defer db.Close()
	db.AutoMigrate(&HashRecord{})
	r := gin.Default()
	r.GET("/sha256", hashToText)
	r.POST("/sha256", textToHash)
	r.Run()
}

func hashToText(c *gin.Context) {
	hash := c.Query("hash")
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
	text := c.PostForm("text")
	hasher := sha1.New()
	hasher.Write([]byte(text))
	shaHash := hex.EncodeToString(hasher.Sum(nil))
	record := &HashRecord{Text: text, Hash: shaHash}
	result := db.Create(&record)
	if result.Error == nil {
		c.JSON(200, gin.H{
			"hash": shaHash,
		})
	} else {
		c.JSON(503, gin.H{
			"error": "couldn't save the Hash",
		})
	}
}
