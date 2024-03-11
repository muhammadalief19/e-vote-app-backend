import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Users from "./User.js";
import Suksesi from "./Suksesi.js";

const { DataTypes } = Sequelize;

const Candidate = db.define(
  "kandidat",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "ketua wajib diisi",
        },
      },
    },
    userId_2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "wakil wajib diisi",
        },
      },
    },
    visi: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: {
          args: 10,
          msg: "visi harus berisi minimal 10 karakter",
        },
      },
    },
    misi: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: {
          args: 10,
          msg: "visi harus berisi minimal 10 karakter",
        },
      },
    },
    suksesiId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "acara wajib diisi",
        },
      },
    },
  },
  {
    freezeTableName: true,
  }
);

Users.hasOne(Candidate);
Candidate.belongsTo(Users, {
  foreignKey: {
    name: "userId",
  },
  as: "ketua",
});
Candidate.belongsTo(Users, {
  foreignKey: {
    name: "userId_2",
  },
  as: "wakil",
});

Suksesi.hasMany(Candidate);
Candidate.belongsTo(Suksesi, {
  foreignKey: "suksesiId",
  as: "suksesi",
});

export default Candidate;
