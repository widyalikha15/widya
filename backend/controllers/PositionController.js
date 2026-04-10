import Position from "../models/PositionModels.js";


function buildTree(data, parentId = null) {
  return data
    .filter(item => item.parent_id === parentId)
    .map(item => ({
      ...item.dataValues,
      children: buildTree(data, item.id)
    }));
}

export const getPositions = async (req, res) => {
  try {
    const positions = await Position.findAll({
      attributes: ["id", "name", "parent_id"],
      order: [["id", "ASC"]]
    });
    res.json(positions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
