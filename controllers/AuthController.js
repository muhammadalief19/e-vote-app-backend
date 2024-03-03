import Users from "../models/User.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import DataUsers from "../models/DataUser.js";
import Candidate from "../models/Candidate.js";
import argon from "argon2";

export const Login = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: false,
        msg: "email/password sala",
      });
    }
    const match = await argon2.verify(user.password, req.body.password);

    if (!match) {
      return res.status(401).json({
        status: false,
        msg: "email/password salah",
      });
    }

    const data = {
      id: user.id,
      uuid: user.uuid,
      nama: user.nama,
      email: user.email,
      role: user.role,
      foto_profile: user.foto_profile,
      email_verified: user.email_verified_at,
    };
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);
    await user.update({ refresh_token: accessToken });
    res.json({ accessToken });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

export const logOut = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.sendStatus(204);
  }
  const user = await Users.findOne({
    where: {
      refresh_token: refreshToken,
    },
  });
  if (!user) {
    return res.sendStatus(204);
  }
  const userId = user.uuid;

  // await Users.update(
  //   {
  //     refresh_token: null,
  //   },
  //   {
  //     where: {
  //       uuid: userId,
  //     },
  //   }
  // );
  res.clearCookie("refreshToken");
  return res.status(200).json({
    msg: "logout berhasil",
  });
};

export const register = async (req, res) => {
  const { nama, email, password } = req.body;
  const hashPassword = await argon2.hash(password);
  const fotoProfile = req.file.filename;
  try {
    const newUser = await Users.create({
      nama: nama,
      email: email,
      password: hashPassword,
      role: "mahasiswa",
      foto_profile: fotoProfile,
    });

    const data = {
      id: newUser.id,
      uuid: newUser.uuid,
      nama: newUser.nama,
      email: newUser.email,
      role: newUser.role,
      foto_profile: newUser.foto_profile,
      email_verified: newUser.email_verified_at,
    };

    const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);

    await newUser.update({ refresh_token: token });

    return res.status(201).json({
      msg: "Created user has been successfully!",
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
    });
  }
};

export const getUserAuth = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: false,
      msg: "Token tidak tersedia atau tidak valid",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded.id) {
      return res.status(401).json({
        status: false,
        msg: "Token tidak valid, ID pengguna tidak ditemukan",
      });
    }

    const user = await Users.findOne({
      attributes: {
        exclude: ["password"],
      },
      where: {
        id: decoded.id,
      },
      include: [
        {
          model: DataUsers,
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: true,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Internal server error",
      error: error.message,
    });
  }
};

export const getCandidateAuth = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: false,
      msg: "Token tidak tersedia atau tidak valid",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded.id) {
      return res.status(401).json({
        status: false,
        msg: "Token tidak valid, ID pengguna tidak ditemukan",
      });
    }

    const user = await Users.findOne({
      attributes: {
        exclude: ["password"],
      },
      where: {
        id: decoded.id,
      },
      include: [
        {
          model: DataUsers,
        },
        {
          model: Candidate,
          include: [
            {
              model: Users,
              as: "ketua",
            },
            {
              model: Users,
              as: "wakil",
            },
          ],
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "Pengguna tidak ditemukan",
      });
    }

    return res.status(200).json({
      status: true,
      user: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: false,
      msg: "Internal server error",
      error: error.message,
    });
  }
};

export const verifyEmail = async (req, res) => {
  let id = req.params.uuid;
  try {
    let date = new Date();

    // Mendapatkan tahun, bulan, dan tanggal dalam format YYYY-MM-DD
    let formattedDate = date.toISOString().slice(0, 10);

    // Mendapatkan waktu dalam format HH:MM:SS
    let formattedTime = date.toTimeString().slice(0, 8);

    let dateFormat = formattedDate + " " + formattedTime;
    await Users.update(
      {
        email_verified_at: dateFormat,
      },
      {
        where: {
          uuid: id,
        },
      }
    );
    res.status(200).json({
      msg: "user behasil diverifikasi",
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
    });
  }
};

export const updatePassword = async (req, res) => {
  const password = req.body.password;
  let id = req.params.id;

  try {
    const hashPassword = await argon.hash(password);

    let data = {
      password: hashPassword,
    };

    try {
      await Users.update(data, {
        where: {
          uuid: id,
        },
      });
      return res.status(200).json({
        msg: "Updated user password has been successfully !",
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
