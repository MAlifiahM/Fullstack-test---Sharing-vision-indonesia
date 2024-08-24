package infrastructure

import (
	"backend/internal/config"
	"backend/internal/domain"
	"backend/internal/post"
	"backend/pkg/xlogger"
	"github.com/caarlos0/env/v11"
)

var (
	cfg config.Config

	postService domain.PostService
	postRepo    domain.PostRepository
)

func init() {
	if err := env.Parse(&cfg); err != nil {
		panic(err)
	}

	xlogger.Setup(cfg)
	dbSetup()

	postRepo = post.NewMysqlPostRepository(db)
	postService = post.NewPostService(postRepo)
}
