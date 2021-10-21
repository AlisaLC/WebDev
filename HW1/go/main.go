package main

import (
	"crypto/sha256"
	"encoding/hex"

	"github.com/gin-gonic/gin"
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

func main() {
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
	hasher := sha256.New()
	hasher.Write([]byte(text))
	shaHash := hex.EncodeToString(hasher.Sum(nil))
	// if result.Error == nil {
	c.JSON(200, gin.H{
		"hash": shaHash,
	})
	// } else {
	// 	c.JSON(503, gin.H{
	// 		"error": "couldn't save the Hash",
	// 	})
	// }
	record := &HashRecord{Text: text, Hash: shaHash}
	// result := db.Create(&record)
	db.Create((&record))
}
