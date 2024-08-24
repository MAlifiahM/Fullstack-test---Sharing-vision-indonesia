package post

import (
	"backend/internal/domain"
	"backend/internal/middleware/validation"
	"backend/internal/utilities"
	"fmt"
	"github.com/gofiber/fiber/v2"
	"strconv"
)

type HttpPostHandler struct {
	postService domain.PostService
}

func NewHttpHandler(r fiber.Router, postService domain.PostService) {
	handler := &HttpPostHandler{
		postService: postService,
	}
	r.Post("/", validation.New[domain.PostArticleRequest](), handler.Store)
	r.Get("/:limit/:offset", handler.GetAll)
	r.Get("/:id", handler.GetById)
	r.Put("/:id", validation.New[domain.PostArticleRequest](), handler.Update)
	r.Delete("/:id", handler.Delete)
	r.Get("/", handler.All)
}

func (h *HttpPostHandler) Store(c *fiber.Ctx) error {
	postReq := utilities.ExtractStructFromValidator[domain.PostArticleRequest](c)

	fmt.Println(postReq)
	if err := h.postService.Store(postReq); err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(domain.ResponseDefault{
			Message: err.Error(),
			Data:    nil,
		})
	}

	c.Status(fiber.StatusCreated)
	return nil
}

func (h *HttpPostHandler) GetAll(c *fiber.Ctx) error {
	limitParam, offsetParam := c.Params("limit"), c.Params("offset")
	statusParam := c.Query("status")

	limit, err := strconv.Atoi(limitParam)
	if err != nil || limit <= 0 {
		return c.Status(fiber.StatusBadRequest).JSON(domain.ResponseDefault{
			Message: "Invalid limit parameter",
		})
	}

	offset, err := strconv.Atoi(offsetParam)
	if err != nil || offset < 0 {
		return c.Status(fiber.StatusBadRequest).JSON(domain.ResponseDefault{
			Message: "Invalid offset parameter",
		})
	}

	data, err := h.postService.GetPagination(limit, offset, statusParam)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(domain.ResponseDefault{
			Message: err.Error(),
		})
	}

	c.Status(fiber.StatusOK)
	return c.JSON(data)
}

func (h *HttpPostHandler) GetById(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(domain.ResponseDefault{
			Message: err.Error(),
		})
	}

	data, err := h.postService.GetById(id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(domain.ResponseDefault{
			Message: err.Error(),
		})
	}

	c.Status(fiber.StatusOK)
	return c.JSON(data)
}

func (h *HttpPostHandler) Update(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(domain.ResponseDefault{
			Message: err.Error(),
		})
	}

	postReq := utilities.ExtractStructFromValidator[domain.PostArticleRequest](c)

	data, err := h.postService.Update(postReq, id)

	if err != nil {
		c.Status(fiber.StatusInternalServerError)
		return c.JSON(domain.ResponseDefault{
			Message: err.Error(),
			Data:    nil,
		})
	}

	return c.Status(fiber.StatusOK).JSON(data)
}

func (h *HttpPostHandler) Delete(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(domain.ResponseDefault{
			Message: err.Error(),
		})
	}

	err = h.postService.Delete(id)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(domain.ResponseDefault{
			Message: err.Error(),
		})
	}

	c.Status(fiber.StatusOK)
	return nil
}

func (h *HttpPostHandler) All(c *fiber.Ctx) error {
	data, err := h.postService.All()

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(domain.ResponseDefault{
			Message: err.Error(),
		})
	}

	return c.Status(fiber.StatusOK).JSON(data)
}
