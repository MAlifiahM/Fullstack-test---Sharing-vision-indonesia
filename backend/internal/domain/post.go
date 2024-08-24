package domain

import (
	"time"
)

type Post struct {
	ID          int       `json:"id" gorm:"primaryKey;autoIncrement"`
	Title       string    `json:"title" gorm:"size:200"`
	Content     string    `json:"content" gorm:"type:text"`
	Category    string    `json:"category" gorm:"size:100"`
	CreatedDate time.Time `json:"created_date" gorm:"autoCreateTime"`
	UpdatedDate time.Time `json:"updated_date" gorm:"autoUpdateTime"`
	Status      string    `json:"status" gorm:"size:100; default:Draft"`
}

type PostArticleRequest struct {
	ID       int    `json:"id"`
	Title    string `json:"title"`
	Content  string `json:"content"`
	Category string `json:"category"`
	Status   string `json:"status"`
}

type PostArticlePagination struct {
	Posts       []PostArticleRequest `json:"posts"`
	TotalPage   int                  `json:"total_page"`
	CurrentPage int                  `json:"current_page"`
}

type PostRepository interface {
	Store(article *PostArticleRequest) error
	GetPagination(limit int, offset int, status string) ([]PostArticleRequest, error)
	GetById(id int) (*PostArticleRequest, error)
	Update(article *PostArticleRequest, id int) (*PostArticleRequest, error)
	Delete(id int) error
	All() ([]PostArticleRequest, error)
}

type PostService interface {
	Store(article *PostArticleRequest) error
	GetPagination(limit int, offset int, status string) (*PostArticlePagination, error)
	GetById(id int) (*PostArticleRequest, error)
	Update(article *PostArticleRequest, id int) (*PostArticleRequest, error)
	Delete(id int) error
	All() ([]PostArticleRequest, error)
}
