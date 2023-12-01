import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Candidate from "./Candidate.js";

const { DataTypes } = Sequelize;

const Suksesi = db.define(
  "suksesi",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "nama acara tidak boleh kosong",
        },
        len: {
          args: [8, 255],
          msg: "nama acara minimal harus berisi 8 karakter",
        },
      },
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "upload poster terlebih dahulu",
        },
      },
    },
    tgl_pelaksanaan: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "tanggal pelaksanaan wajib diisi",
        },
      },
    },
    status: {
      type: DataTypes.ENUM,
      values: ["dibuka", "ditutup"],
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "status wajib diisi",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

export default Suksesi;
