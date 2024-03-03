import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Users from "./User.js";

const { DataTypes } = Sequelize;

const DataUsers = db.define(
  "data_users",
  {
    nrp: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "nrp tidak tersedia",
      },
      validate: {
        notEmpty: { msg: "nrp wajib diisi" },
      },
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "alamat wajib diisi",
        },
      },
    },
    foto_ktm: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {
          msg: "foto ktm wajib diisi",
        },
      },
    },
    jenis_kelamin: {
      type: DataTypes.ENUM,
      values: ["laki-laki", "perempuan"],
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "jenis kelamin ktm wajib diisi",
        },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "user id wajib diisi",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasOne(DataUsers);
DataUsers.belongsTo(Users, {
  foreignKey: "userId",
});
export default DataUsers;
