const Post = require("../models/postModel");
const User = require("../models/userModel");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const HttpError = require("../models/errorModel");

// ================ CREATE POST ================
// POST: api/posts
// PROTECTED
const createPost = (req, res, next) => {
  try {
    const { title, category, description } = req.body;
    if (!title || !category || !description || !req.files) {
      return next(new HttpError("Fill in all fields and choose thumbnail"));
    }
    const { thumbnail } = req.files;
    // check the file size
    if (thumbnail.size > 2000000) {
      return next(
        new HttpError("Thumbnail too big.File should be less than 2mb")
      );
    }
    let fileName = thumbnail.name;
    let splittedFilename = fileName.split(".");
    let newFilename =
      splittedFilename[0] +
      uuid() +
      "." +
      splittedFilename[splittedFilename.length - 1];
    thumbnail.mv(
      path.join(__dirname, "../uploads", newFilename),
      async (error) => {
        if (error) {
          return next(new HttpError(error));
        } else {
          const newPost = await Post.create({
            title,
            category,
            description,
            thumbnail: newFilename,
            creator: req.user.id,
          });
          if (!newPost) {
            return next(new HttpError("Post could not be created", 422));
          }

          // find user and increase post count by 1
          const currentUser = await User.findById(req.user.id);
          const userPostCount = currentUser.posts + 1;
          await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
          return res.status(201).json(newPost);
        }
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};

// =============== EDIT POST ================
// PATCH: api/posts/:id
// PROTECTED
const editPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    let fileName, newFilename, updatedPost;
    let { title, category, description } = req.body;
    // note react quill markdown already contains 12 characters, thus to confirm description is not empty, we check if less than 12 characters
    if (!title || !category || description.length < 12) {
      return next(new HttpError("All fields are required", 422));
    }
    // get old post from database
    const oldPost = await Post.findById(postId);
    // confirm the user trying to edit is the post author
    if (req.user.id == oldPost.creator) {
      if (!req.files) {
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          { title, category, description },
          { new: true }
        );
      } else {
        // delete old thumbnail from uploads
        fs.unlink(
          path.join(__dirname, "../uploads", oldPost.thumbnail),
          async (err) => {
            if (err) {
              return next(new HttpError(err));
            }
          }
        );
        // upload new Thumbnail
        const { thumbnail } = req.files;
        // check file size
        if (thumbnail.size > 2000000) {
          return next(
            new HttpError("Thumbnail too big. It should be less than 2mb")
          );
        }
        fileName = thumbnail.name;
        let splittedFilename = fileName.split(".");
        newFilename =
          splittedFilename[0] +
          uuid() +
          "." +
          splittedFilename[splittedFilename.length - 1];
        thumbnail.mv(
          path.join(__dirname, "../uploads", newFilename),
          async (err) => {
            if (err) {
              return next(new HttpError(err));
            }
          }
        );
        updatedPost = await Post.findByIdAndUpdate(
          postId,
          { title, category, description, thumbnail: newFilename },
          { new: true }
        );
      }
      if (!updatedPost) {
        return next(new HttpError("Unable to update post", 400));
      }
      res.status(200).json(updatedPost);
    } else {
      return next(
        new HttpError("Not allowed to edit someone else's post", 400)
      );
    }
  } catch (error) {
    return next(new HttpError(error));
  }
};

// =============== DELETE POST ================
// DELETE: api/posts/:postId
// PROTECTED
const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    if (!postId) {
      return next(new HttpError("Post unavailable", 400));
    }

    const post = await Post.findById(postId);
    const fileName = post?.thumbnail;

    // confirm the user trying to delete is the post author
    if (req.user.id == post.creator) {
      //delete thumbnail from uploads folder
      fs.unlink(path.join(__dirname, "../uploads", fileName), async (err) => {
        if (err) {
          return next(new HttpError(err));
        } else {
          await Post.findByIdAndDelete(postId);
          // find user and reduce post counts by 1
          const currentUser = await User.findById(req.user.id);
          const userPostCount = currentUser?.posts - 1;
          await User.findByIdAndUpdate(req.user.id, { posts: userPostCount });
          res.json(`Post ${post.id} deleted successfully`);
        }
      });
    } else {
      return next(
        new HttpError("Not allowed to delete someone else's post", 400)
      );
    }
  } catch (error) {
    return next(new HttpError(error));
  }
};

// ================ GET POSTS ================
// GET: api/posts
// UNPROTECTED
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ updatedAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError("Unable to get posts", 422));
  }
};

// ================ GET SINGLE POST ================
// GET: api/posts/:id
// UNPROTECTED
const getSinglePosts = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return next(new HttpError("Post not found", 404));
    }
    res.status(200).json(post);
  } catch (error) {
    return next(new HttpError("Unable to fetch post", 422));
  }
};

// ================ GET CATEGORY POSTS ================
// GET: api/posts/categories/:category
// UNPROTECTED
const getCategoryPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ category: req.params.category }).sort({
      createdAt: -1,
    });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError("Unable to fetch posts", 422));
  }
};

// ================ GET AUTHOR POSTS ================
// GET: api/posts/users/:authorId
// UNPROTECTED
const getUserPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ creator: req.params.authorId }).sort({
      createdAt: -1,
    });
    res.status(200).json(posts);
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost,
  getPosts,
  getSinglePosts,
  getCategoryPosts,
  getUserPosts,
};
