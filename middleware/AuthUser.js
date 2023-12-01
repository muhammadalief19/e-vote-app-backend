import Users from "../models/User.js";
import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.email = decoded.email;
    next();
  });
};

export const adminOnly = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({
      msg: "Silahkan login terlebih dahulu",
    });
  }
  const user = await Users.findOne({
    attributes: [
      "uuid",
      "nama",
      "email",
      "role",
      "foto_profile",
      "email_verified_at",
    ],
    where: {
      uuid: req.session.userId,
    },
  });

  if (!user) {
    return res.status(404).json({
      msg: "user tidak ditemukan !",
    });
  }

  if (user.role !== "admin") {
    return res.status(403).json({
      msg: "akses ditolak !",
    });
  }
  next();
};
