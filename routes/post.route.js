const express = require("express");
const router = express.Router();
const postModel = require("../models/post.model");
const postController = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const authorMiddleware = require("../middlewares/author.middleware");

router.get('/get', postController.getAll);
router.post('/create', authMiddleware,postController.create);
router.delete("/delete/:id", authMiddleware, postController.delete);
router.put("/update/:id", authMiddleware, authorMiddleware,postController.update);
router.get('/get/:id', postController.getById);
module.exports = router;