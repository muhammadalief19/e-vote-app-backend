import DataUsers from "../models/DataUser.js";
import Users from "../models/User.js";
import fs from "fs";
import path from "path";

export const getDataUsers = async (req, res) => {
  try {
    const dataUsers = await DataUsers.findAll({
      attributes: {
        exclude: ["userId"],
      },
      include: [
        {
          model: Users,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
    });
    return res.status(200).json({
      msg: "Data user has been successfully loaded",
      payload: dataUsers,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
export const getDataUserById = async (req, res) => {
  let id = req.params.id;
  try {
    const dataUser = await DataUsers.findOne({
      include: Users,
      where: {
        nrp: id,
      },
    });
    return res.status(200).json({
      msg: "Data user has been successfully loaded",
      payload: dataUser,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
export const createDataUser = async (req, res) => {
  let { nrp, alamat, userId, jenis_kelamin } = req.body;
  let foto_ktm = req.file ? req.file.filename : null;
  try {
    // if (foto_ktm == null) {
    //   return res.status(500).json({
    //     msg: "upload foto ktm terlebih dahulu",
    //   });
    // }

    await DataUsers.create({
      nrp: nrp,
      alamat: alamat,
      foto_ktm: foto_ktm,
      jenis_kelamin: jenis_kelamin,
      userId: userId,
    });
    return res.status(201).json({
      msg: "Created data user has been successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
export const updateDataUser = async (req, res) => {
  let { alamat, userId, jenis_kelamin } = req.body;
  let id = req.params.id;
  let fotoKtm = req.file ? req.file.filename : null;

  try {
    const dataUser = await DataUsers.findOne({
      where: { nrp: id },
    });
    let fotoLama = dataUser.foto_ktm;

    if (fotoLama && fotoKtm) {
      const pathFile = path.join("./public/foto-ktm", fotoLama);
      fs.unlinkSync(pathFile);
    }

    let data = {
      alamat: alamat,
      jenis_kelamin: jenis_kelamin,
      userId: userId,
    };

    if (fotoKtm) {
      data.foto_ktm = fotoKtm;
    }

    try {
      await DataUsers.update(data, {
        where: {
          nrp: id,
        },
      });

      return res.status(200).json({
        msg: "Updated data user has been successfully !",
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
export const deleteDataUser = async (req, res) => {
  let id = req.params.id;
  try {
    const dataUser = await DataUsers.findOne({
      where: { nrp: id },
    });
    let fotoKtm = dataUser.foto_ktm;

    if (fotoKtm) {
      const pathFile = path.join("./public/foto-ktm", fotoKtm);
      fs.unlinkSync(pathFile);
    }

    try {
      await DataUsers.destroy({
        where: {
          nrp: id,
        },
      });

      return res.status(200).json({
        msg: "deleted data user has been successfully !",
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
