const postModel = require("../models/post.model");
const postService = require("../service/post.service");

class PostController {
  async getAll(req, res) {
    try {
      console.log(req.requestTime);
      const posts = await postService.getAll();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async create(req, res) {
    try {
      const post = await postService.create(req.body, req.files.picture);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async delete(req, res) {
    try {
      const post = await postService.delete(req.params.id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async update(req, res) {
    try {
      const { body, params } = req;
      const post = await postService.update(body, params.id);
      res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getById(req, res) {
    try { 
        const post = await postService.getById(req.params.id);
        res.status(200).json(post);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new PostController();
