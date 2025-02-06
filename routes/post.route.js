const express = require("express");
const router = express.Router();
const postModel = require("../models/post.model");
const postController = require("../controllers/post.controller");
const logger = require("../middlewares/logger");

router.get('/get', postController.getAll);
router.post('/create', logger, postController.create);
router.delete('/delete/:id', postController.delete);
router.put('/update/:id', postController.update);
router.get('/get/:id', postController.getById);
module.exports = router;