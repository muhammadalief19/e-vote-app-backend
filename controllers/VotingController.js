import Candidate from "../models/Candidate.js";
import Suksesi from "../models/Suksesi.js";
import Users from "../models/User.js";
import Voting from "../models/Voting.js";
import { Op } from "sequelize";

export const getVotings = async (req, res) => {
  try {
    const votes = await Voting.findAll({
      include: [Users, Suksesi, Candidate],
    });

    return res.status(200).json({
      msg: "votings has been successfully loaded",
      payload: votes,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
export const getVotingById = async (req, res) => {
  let id = req.params.id;
  try {
    const vote = await Voting.findAll({
      where: { uuid: id },
      include: [Users, Suksesi, Candidate],
    });

    return res.status(200).json({
      msg: "voting has been successfully loaded",
      payload: vote,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
export const createVoting = async (req, res) => {
  let { pilihan, user, suksesi } = req.body;
  try {
    let data = {
      kandidatId: pilihan,
      userId: user,
      suksesiId: suksesi,
    };
    await Voting.create(data);
    return res.status(201).json({
      msg: "created voting has been successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
export const updateVoting = async (req, res) => {
  let { pilihan, user, suksesi } = req.body;
  let id = req.params.id;
  try {
    let data = {
      kandidat: pilihan,
      userId: user,
      suksesiId: suksesi,
    };
    await Voting.update(data, { where: { uuid: id } });
    return res.status(200).json({
      msg: "updated voting has been successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
export const deleteVoting = async (req, res) => {
  let id = req.params.id;
  try {
    await Voting.destroy({ where: { uuid: id } });
    return res.status(200).json({
      msg: "deleted voting has been successfully",
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

    return res.status(200).json({
      status: true,
      payload: {
        results: votesCount,
        result: voteCount,
      },
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
