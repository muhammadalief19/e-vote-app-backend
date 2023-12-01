import { Sequelize } from "sequelize";
import db from "../config/db.js";

const { DataTypes } = Sequelize;

const Users = db.define(
  "users",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Nama wajib diisi",
        },
        len: {
          args: [8, 100],
          msg: "Nama minimal harus berisi 8 karakter",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email tidak tersedia",
      },
      validate: {
        notEmpty: {
          msg: "Email wajib diisi",
        },
        isEmail: {
          msg: "Format email salah",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password wajib diisi",
        },
        len: {
          args: [8, 100],
          msg: "Nama minimal harus berisi 8 karakter",
        },
      },
    },
    role: {
      type: DataTypes.ENUM,
      values: ["admin", "mahasiswa", "kandidat"],
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Role wajib diisi",
        },
      },
    },
    foto_profile: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Foto profile wajib diisi",
        },
      },
    },
    refresh_token: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email_verified_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Users;
