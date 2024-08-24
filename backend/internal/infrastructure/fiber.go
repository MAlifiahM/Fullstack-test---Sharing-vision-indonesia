package infrastructure

import (
	"backend/internal/post"
	"backend/pkg/xlogger"
	"fmt"
	"github.com/gofiber/contrib/fiberzerolog"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/etag"
	recover2 "github.com/gofiber/fiber/v2/middleware/recover"
	"github.com/gofiber/fiber/v2/middleware/requestid"
)

func Run() {
	logger := xlogger.Logger

	app := fiber.New(fiber.Config{
		ProxyHeader:           cfg.ProxyHeader,
		DisableStartupMessage: true,
		ErrorHandler:          defaultErrorHandler,
	})

	app.Use(fiberzerolog.New(fiberzerolog.Config{
		Logger: logger,
		Fields: cfg.LogFields,
	}))

	app.Use(recover2.New())
	app.Use(etag.New())
	app.Use(requestid.New())
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH",
	}))

	post.NewHttpHandler(app.Group("/article"), postService)
	addr := fmt.Sprintf("%s:%d", cfg.Host, cfg.Port)
	logger.Info().Msgf("Listening on %s", addr)
	if err := app.Listen(addr); err != nil {
		logger.Err(err).Msg("Failed to start server")
	}
}
