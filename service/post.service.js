const postModel = require("../models/post.model");
const fileService = require("./file.service");
class PostService {
  async create(post, picture, author) {
    const fileName = fileService.save(picture);
    const newPost = await postModel.create({ ...post, picture: fileName, author});
    return newPost;
  }

  async getAll() {
    const allPosts = await postModel.find().populate("author");
    return allPosts;
  }

  async delete(id) {
    const deletedPost = await postModel.findByIdAndDelete(id);
    return deletedPost;
  }

  async update(post, id) {
    if (!id) {
      throw new Error("Post id is required");
    }
    
    const updatedPost = await postModel.findByIdAndUpdate(id, post, {
      new: true,
    });
    return updatedPost;
  }

  async getById(id) {
    const post = await postModel.findById(id);
    return post;
  }
}

module.exports = new PostService();
