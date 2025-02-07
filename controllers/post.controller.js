const postModel = require("../models/post.model");
const postService = require("../service/post.service");

class PostController {
  async getAll(req, res, next) {
    try {
      console.log(req.requestTime);
      const posts = await postService.getAll();
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const post = await postService.create(req.body, req.files.picture, req.user.id);
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const post = await postService.delete(req.params.id);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { body, params } = req;
      const post = await postService.update(body, params.id);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const post = await postService.getById(req.params.id);
      res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PostController();
