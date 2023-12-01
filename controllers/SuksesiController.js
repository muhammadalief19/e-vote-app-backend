import Candidate from "../models/Candidate.js";
import Suksesi from "../models/Suksesi.js";
import Users from "../models/User.js";

export const getSuksesi = async (req, res) => {
  try {
    const suksesis = await Suksesi.findAll({
      include: [
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
    return res.status(200).json({
      msg: "suksesi has been successfully loaded",
      payload: suksesis,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
export const getSuksesiById = async (req, res) => {
  let id = req.params.id;
  try {
    const suksesi = await Suksesi.findOne({
      where: { uuid: id },
      include: [
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
    return res.status(200).json({
      msg: "suksesi has been successfully loaded",
      payload: suksesi,
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
export const createSuksesi = async (req, res) => {
  let { name, tgl_pelaksanaan, status } = req.body;
  let poster = req.file ? req.file.filename : null;

  try {
    if (poster == null) {
      return res.status(500).json({
        msg: {
          file: "upload poster terlebih dahulu",
        },
      });
    }

    let data = {
      name: name,
      tgl_pelaksanaan: tgl_pelaksanaan,
      poster: poster,
      status: status,
    };

    await Suksesi.create(data);

    return res.status(201).json({
      msg: "created suksesi has been successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
export const updateSuksesi = async (req, res) => {
  let { name, tgl_pelaksanaan, status } = req.body;
  let id = req.params.id;
  let poster = req.file ? req.file.filename : null;
  try {
    const suksesi = await Suksesi.findOne({
      where: {
        uuid: id,
      },
    });

    let posterLama = suksesi.poster;

    if (posterLama && poster) {
      const pathFile = path.join("./public/foto-profile", posterLama);
      fs.unlinkSync(pathFile);
    }

    let data = {
      name: name,
      tgl_pelaksanaan: tgl_pelaksanaan,
      status: status,
    };

    if (poster) {
      data.poster = poster;
    }

    await Suksesi.update(data, {
      where: {
        uuid: id,
      },
    });

    return res.status(200).json({
      msg: "updated suksesi has been successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
export const deleteSuksesi = async (req, res) => {
  let id = req.params.id;
  try {
    await Suksesi.destroy({
      where: {
        uuid: id,
      },
    });

    return res.status(200).json({
      msg: "deleted sukesi has been successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: error.message,
    });
  }
};
