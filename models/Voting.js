import { Sequelize } from "sequelize";
import db from "../config/db.js";
import Users from "./User.js";
import Suksesi from "./Suksesi.js";
import Candidate from "./Candidate.js";

const { DataTypes } = Sequelize;

const Voting = db.define(
  "voting",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    kandidatId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "kandidat wajib diisi",
        },
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "user wajib diisi",
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
  { freezeTableName: true }
);

Users.hasMany(Voting);
Voting.belongsTo(Users, {
  foreignKey: "userId",
});

Suksesi.hasMany(Voting);
Voting.belongsTo(Suksesi, {
  foreignKey: "suksesiId",
});

Candidate.hasMany(Voting);
Voting.belongsTo(Candidate, {
  foreignKey: "kandidatId",
});

export default Voting;
