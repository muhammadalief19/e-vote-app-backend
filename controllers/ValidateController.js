import { Op } from "sequelize";
import Voting from "../models/Voting.js";
import Users from "../models/User.js";
import Suksesi from "../models/Suksesi.js";

export const validateVoted = async (req, res) => {
  let { key1, key2 } = req.query;
  try {
    const votings = await Voting.findAll({
      where: {
        [Op.and]: [
          {
            userId: key1,
          },
          {
            suksesiId: key2,
          },
        ],
      },
    });

    if (votings.length <= 0) {
      return res.status(200).json({
        payload: { status: true, data: votings },
      });
    }

    return res.status(200).json({
      payload: { status: false, data: votings },
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

export const resultVoting = async (req, res) => {
  const { key1, key2 } = req.query;

  try {
    const votesCount = await Voting.count({ where: { suksesiId: key1 } });
    const voteCount = await Voting.count({
      where: { [Op.and]: [{ suksesiId: key1 }, { kandidatId: key2 }] },
    });

    const percetage = Math.round((voteCount / votesCount) * 100);

    return res.status(200).json({
      status: true,
      payload: {
        results: votesCount,
        result: voteCount,
        percetage: percetage,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

export const countData = async (req, res) => {
  try {
    const mahasiswa = await Users.count({
      where: {
        role: "mahasiswa",
      },
    });

    const kandidat = await Users.count({
      where: {
        role: "kandidat",
      },
    });

    const votes = await Voting.count();

    const user = await Users.count();

    return res.status(200).json({
      status: true,
      msg: "counted data has been succesfully",
      payload: {
        mahasiswa: mahasiswa,
        kandidat: kandidat,
        voting: votes,
        users: user,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

export const countDataStat = async (req, res) => {
  try {
    const mahasiswa = await Users.count({
      where: {
        role: "mahasiswa",
      },
    });

    const kandidat = await Users.count({
      where: {
        role: "kandidat",
      },
    });

    const votes = await Voting.count();

    const user = await Users.count();

    return res.status(200).json({
      status: true,
      msg: "counted data has been succesfully",
      payload: [
        {
          nama: "mahasiswa",
          count: mahasiswa,
          color: "bg-red-600",
        },
        {
          nama: "votes",
          count: votes,
          color: "bg-green-600",
        },
        {
          nama: "candidate",
          count: kandidat,
          color: "bg-blue-600",
        },
        {
          nama: "users",
          count: user,
          color: "bg-slate-600",
        },
      ],
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

export const golputValidation = async (req, res) => {
  let { id } = req.params;
  const suksesi = await Suksesi.findOne({
    where: {
      uuid: id,
    },
  });
  try {
    const mahasiswa = await Users.count({
      where: {
        [Op.not]: {
          role: "admin",
        },
      },
    });

    const votes = await Voting.count({
      where: {
        suksesiId: suksesi.id,
      },
    });

    const userLog = await Users.count({
      where: {
        [Op.and]: {
          role: {
            [Op.ne]: "admin",
          },
          [Op.not]: {
            refresh_token: null,
          },
        },
      },
    });

    return res.status(200).json({
      status: true,
      msg: "counted data has been succesfully",
      payload: {
        mahasiswa,
        votes,
        userLog,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
