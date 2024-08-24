package post

import (
	"backend/internal/domain"
	"errors"
)

type postService struct {
	postRepo domain.PostRepository
}

func NewPostService(postRepo domain.PostRepository) domain.PostService {
	return &postService{
		postRepo: postRepo,
	}
}

func (s *postService) Store(req *domain.PostArticleRequest) error {
	if len(req.Title) < 20 {
		return errors.New("title must be at least 20 characters")
	}

	if len(req.Content) < 200 {
		return errors.New("content must be at least 200 characters")
	}

	if len(req.Category) < 3 {
		return errors.New("category must be at least 3 characters")
	}

	if req.Status != "publish" && req.Status != "draft" && req.Status != "thrash" {
		return errors.New("status must be publish, draft or thrash")
	}

	return s.postRepo.Store(req)
}

func (s *postService) GetPagination(limit int, offset int, status string) (*domain.PostArticlePagination, error) {
	data, err := s.postRepo.GetPagination(limit, offset, status)

	if err != nil {
		return nil, err
	}

	result := &domain.PostArticlePagination{
		Posts:       data,
		TotalPage:   (len(data) + limit - 1) / limit,
		CurrentPage: offset/limit + 1,
	}

	return result, nil
}

func (s *postService) GetById(id int) (*domain.PostArticleRequest, error) {
	return s.postRepo.GetById(id)
}

func (s *postService) Update(req *domain.PostArticleRequest, id int) (*domain.PostArticleRequest, error) {
	if len(req.Title) < 20 {
		return nil, errors.New("title must be at least 20 characters")
	}

	if len(req.Content) < 200 {
		return nil, errors.New("content must be at least 200 characters")
	}

	if len(req.Category) < 3 {
		return nil, errors.New("category must be at least 3 characters")
	}

	if req.Status != "publish" && req.Status != "draft" && req.Status != "thrash" {
		return nil, errors.New("status must be publish, draft or thrash")
	}

	return s.postRepo.Update(req, id)
}

func (s *postService) Delete(id int) error {
	return s.postRepo.Delete(id)
}

func (s *postService) All() ([]domain.PostArticleRequest, error) {
	return s.postRepo.All()
}
