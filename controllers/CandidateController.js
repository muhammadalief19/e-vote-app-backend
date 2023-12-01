import Candidate from "../models/Candidate.js";
import Suksesi from "../models/Suksesi.js";
import Users from "../models/User.js";
import { Op } from "sequelize";

export const getCandidates = async (req, res) => {
  try {
    const response = await Candidate.findAll({
      include: [
        {
          model: Users,
          foreignKey: "userId",
          as: "ketua",
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Users,
          foreignKey: "userId_2",
          as: "wakil",
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Suksesi,
          foreignKey: "suksesiId",
          as: "suksesi",
        },
      ],
    });
    res.status(200).json({
      msg: "candidate has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
export const getCandidateById = async (req, res) => {
  let id = req.params.id;
  try {
    const response = await Candidate.findOne({
      where: {
        uuid: id,
      },
      include: [
        {
          model: Users,
          foreignKey: "userId",
          as: "ketua",
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Users,
          foreignKey: "userId_2",
          as: "wakil",
          attributes: {
            exclude: ["password"],
          },
        },
        {
          model: Suksesi,
          foreignKey: "suksesiId",
          as: "suksesi",
        },
      ],
    });
    res.status(200).json({
      msg: "candidate has been successfully loaded",
      payload: response,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const createCandidate = async (req, res) => {
  let { ketua, wakil, visi, misi, suksesi } = req.body;
  try {
    let data = {
      userId: ketua,
      userId_2: wakil,
      visi: visi,
      misi: misi,
      suksesiId: suksesi,
    };
    await Candidate.create(data);

    return res.status(201).json({
      msg: "created candidate has been successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

export const updateCandidate = async (req, res) => {
  let { ketua, wakil, visi, misi, suksesi } = req.body;
  let uuid = req.params.id;
  try {
    let data = {
      userId: ketua,
      userId_2: wakil,
      visi: visi,
      misi: misi,
      suksesiId: suksesi,
    };
    await Candidate.update(data, {
      where: {
        uuid: uuid,
      },
    });

    return res.status(200).json({
      msg: "updated candidate has been successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

export const updateVisiMisi = async (req, res) => {
  let { visi, misi } = req.body;
  let uuid = req.params.id;
  try {
    let data = {
      visi: visi,
      misi: misi,
    };
    await Candidate.update(data, {
      where: {
        uuid: uuid,
      },
    });

    return res.status(200).json({
      msg: "updated visi misi has been successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};

export const deleteCandidate = async (req, res) => {
  let uuid = req.params.id;
  try {
    await Candidate.destroy({
      where: {
        uuid: uuid,
      },
    });

    return res.status(200).json({
      msg: "created candidate has been successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
