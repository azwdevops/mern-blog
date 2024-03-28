const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const User = require("../models/userModel");

// REGISTER A NEW USER
// POST : api/users/register

const HttpError = require("../models/errorModel");

// unprotected
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password, confirm_password } = req.body;
    if (!name || !email || !password) {
      return next(new HttpError("All fields are required", 422));
    }
    const newEmail = email.toLowerCase();
    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return next(new HttpError("Email already exists", 422));
    }
    if (password.length < 6) {
      return next(new HttpError("Password must be at least 6 characters", 422));
    }
    if (password != confirm_password) {
      return next(new HttpError("Passwords do not match", 422));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await User.create({
      name,
      email: newEmail,
      password: hashedPassword,
    });
    return res.status(201).json(`New user ${newUser.email} registered`);
  } catch (error) {
    return next(new HttpError("User registration failed", 422));
  }
};

// LOGIN A NEW USER
// POST : api/users/login
// unprotected
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new HttpError("All fields are required", 422));
    }
    const userEmail = email.toLowerCase();
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return next(new HttpError("Invalid credentials", 422));
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return next(new HttpError("Invalid credentials", 422));
    }
    const { _id: id, name } = user;
    const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ token, id, name });
  } catch (error) {
    return next(
      new HttpError("Login failed, please check your credentials", 422)
    );
  }
};

// USER PROFILE
// GET : api/users/:id
// protected
const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return next(new HttpError("User not found", 404));
    }
    res.status(200).json(user);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// CHANGE USER AVATAR
// POST : api/users/change-avatar
// protected
const changeAvatar = async (req, res, next) => {
  try {
    if (!req.files.avatar) {
      return next(new HttpError("Please choose an image", 422));
    }
    // find user from database
    const user = await User.findById(req.user.id);
    // delete old avatar if exists
    if (user.avatar) {
      fs.unlink(path.join(__dirname, "../uploads", user.avatar), (err) => {
        if (err) {
          return next(new HttpError(err));
        }
      });
    }
    const { avatar } = req.files;
    // check file size
    if (avatar.size > 500000) {
      return next(
        new HttpError("Profile picture too big. Should be less than 500kb"),
        422
      );
    }
    let fileName;
    fileName = avatar.name;
    let splittedFilename = fileName.split(".");
    let newFilename =
      splittedFilename[0] +
      uuid() +
      "." +
      splittedFilename[splittedFilename.length - 1];
    avatar.mv(
      path.join(__dirname, "../uploads", newFilename),
      async (error) => {
        if (error) {
          return next(new HttpError(error));
        }
        const updatedUser = await User.findByIdAndUpdate(
          req.user.id,
          { avatar: newFilename },
          { new: true }
        );
        if (!updatedUser) {
          return next(new HttpError("Avatar could not be changed", 422));
        }
        res.status(200).json(updatedUser);
      }
    );
  } catch (error) {
    return next(new HttpError(error));
  }
};

// EDIT USER DETAILS
// POST : api/users/edit-user
// protected
const editUser = async (req, res, next) => {
  try {
    const { name, email, currentPassword, newPassword, confirmNewPassword } =
      req.body;
    if (
      !name ||
      !email ||
      !currentPassword ||
      !newPassword ||
      !confirmNewPassword
    ) {
      return next(new HttpError("Fill in all fields", 422));
    }
    // get user from database
    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new HttpError("User not found", 404));
    }
    // confirm new email does not exist i.e not already taken
    const emailExists = await User.findOne({
      email: email.toLowerCase(),
      _id: { $ne: user.id },
    });
    if (emailExists) {
      return next(new HttpError("Email already exists", 422));
    }
    // compare currentPassword to database password
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
      return next(new HttpError("Invalid current password", 422));
    }
    // compare newPassword and confirmNewPassword
    if (newPassword != confirmNewPassword) {
      return next(
        new HttpError("New password and confirm new password must match", 422)
      );
    }
    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);
    // update the user
    const newInfo = await User.findByIdAndUpdate(
      req.user.id,
      { name, email: email.toLowerCase(), password: newHashedPassword },
      { new: true }
    );
    res.status(200).json(newInfo);
  } catch (error) {
    return next(new HttpError(error));
  }
};

// GET AUTHORS/USERS
// GET : api/users/authors
// UNprotected
const getAuthors = async (req, res, next) => {
  try {
    const authors = await User.find().select("-password");
    res.json(authors);
  } catch (error) {
    return next(new HttpError(error));
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUser,
  changeAvatar,
  editUser,
  getAuthors,
};
