package post

import (
	"backend/internal/domain"
	"gorm.io/gorm"
)

type mysqlPostRepository struct {
	db *gorm.DB
}

func NewMysqlPostRepository(db *gorm.DB) domain.PostRepository {
	return &mysqlPostRepository{
		db: db,
	}
}

func (r *mysqlPostRepository) Store(article *domain.PostArticleRequest) error {
	post := domain.Post{
		ID:       article.ID,
		Title:    article.Title,
		Content:  article.Content,
		Category: article.Category,
		Status:   article.Status,
	}

	result := r.db.Create(&post)
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *mysqlPostRepository) GetPagination(limit int, offset int, status string) ([]domain.PostArticleRequest, error) {
	var posts []domain.Post

	query := r.db.Limit(limit).Offset(offset)

	if status == "publish" || status == "draft" || status == "thrash" {
		query = query.Where("status = ?", status)
	}

	if result := query.Find(&posts); result.Error != nil {
		return nil, result.Error
	}

	postArticle := make([]domain.PostArticleRequest, len(posts))
	for i, post := range posts {
		postArticle[i] = domain.PostArticleRequest{
			ID:       post.ID,
			Title:    post.Title,
			Content:  post.Content,
			Category: post.Category,
			Status:   post.Status,
		}
	}

	return postArticle, nil
}

func (r *mysqlPostRepository) GetById(id int) (*domain.PostArticleRequest, error) {
	var post domain.Post

	if result := r.db.First(&post, id); result.Error != nil {
		return nil, result.Error
	}

	return &domain.PostArticleRequest{
		ID:       post.ID,
		Title:    post.Title,
		Content:  post.Content,
		Category: post.Category,
		Status:   post.Status,
	}, nil
}

func (r *mysqlPostRepository) Update(article *domain.PostArticleRequest, id int) (*domain.PostArticleRequest, error) {

	post := domain.Post{
		Title:    article.Title,
		Content:  article.Content,
		Category: article.Category,
		Status:   article.Status,
	}

	result := r.db.Model(&post).Where("id = ?", id).Updates(&post)
	if result.Error != nil {
		return nil, result.Error
	}

	data := domain.PostArticleRequest{
		ID:       id,
		Title:    post.Title,
		Content:  post.Content,
		Category: post.Category,
		Status:   post.Status,
	}

	return &data, nil
}

func (r *mysqlPostRepository) Delete(id int) error {
	result := r.db.Model(&domain.Post{}).Where("id = ?", id).Update("status", "thrash")
	if result.Error != nil {
		return result.Error
	}
	return nil
}

func (r *mysqlPostRepository) All() ([]domain.PostArticleRequest, error) {
	var posts []domain.Post

	if result := r.db.Find(&posts); result.Error != nil {
		return nil, result.Error
	}

	postArticle := make([]domain.PostArticleRequest, len(posts))
	for i, post := range posts {
		postArticle[i] = domain.PostArticleRequest{
			ID:       post.ID,
			Title:    post.Title,
			Content:  post.Content,
			Category: post.Category,
			Status:   post.Status,
		}
	}

	return postArticle, nil
}
