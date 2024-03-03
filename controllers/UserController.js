import Users from "../models/User.js";
import argon from "argon2";
import path from "path";
import fs from "fs";
import { validationResult } from "express-validator";
import DataUsers from "../models/DataUser.js";
export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: {
        exclude: ["password"],
      },
      include: [DataUsers],
    });
    return res.status(200).json({
      msg: "User data has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: {
        exclude: ["password"],
      },
      where: {
        uuid: req.params.id,
      },
      include: [DataUsers],
    });
    return res.status(200).json({
      msg: "User data has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  const { nama, email, password, role } = req.body;
  const hashPassword = await argon.hash(password);
  let fotoProfile = req.file ? req.file.filename : null;
  try {
    if (fotoProfile == null) {
      return res.status(500).json({
        msg: "upload foto profile terlebih dahulu",
      });
    }
    await Users.create({
      nama: nama,
      email: email,
      password: hashPassword,
      role: role,
      foto_profile: fotoProfile,
    });
    return res.status(201).json({
      msg: "Created user has been successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error,
    });
  }
};

export const updateUser = async (req, res) => {
  const { nama, email, role } = req.body;
  const password = req.body.password ? req.body.password : null;
  let id = req.params.id;
  let fotoProfile = req.file ? req.file.filename : null;

  try {
    const user = await Users.findOne({ where: { uuid: id } });
    const fotoLama = user.foto_profile;

    if (fotoLama && fotoProfile) {
      const pathFile = path.join("./public/foto-profile", fotoLama);
      fs.unlinkSync(pathFile);
    }

    let data = {
      nama: nama,
      email: email,
      role: role,
    };

    if (fotoProfile) {
      data.foto_profile = fotoProfile;
    }

    if (password) {
      const hashPassword = await argon.hash(password);
      data.password = hashPassword;
    }

    try {
      await Users.update(data, {
        where: {
          uuid: id,
        },
      });
      return res.status(200).json({
        msg: "Updated user has been successfully !",
        payload: data,
      });
    } catch (error) {
      return res.status(400).json({
        msg: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  let id = req.params.id;
  try {
    const user = await Users.findOne({ where: { uuid: id } });
    let fotoProfile = user.foto_profile;

    if (fotoProfile) {
      const pathFile = path.join("./public/foto-profile", fotoProfile);
      fs.unlinkSync(pathFile);
    }
    try {
      await Users.destroy({ where: { uuid: id } });
      return res.status(200).json({
        msg: "Deleted user has been successfully",
      });
    } catch (error) {
      return res.status(400).json({
        msg: error.message,
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

// get user role candidate
export const getCandidate = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: {
        exclude: ["password"],
      },
      where: {
        role: "kandidat",
      },
      include: [DataUsers],
    });
    return res.status(200).json({
      msg: "User data has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
