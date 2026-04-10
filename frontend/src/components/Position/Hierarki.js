import React, { useState, useEffect } from "react";
import Navbar from "../Login/Navbar";
import { getPositions } from "../../Services/positionService";

const buildTree = (data, parentId = null) => {
  return data
    .filter(item => item.parent_id === parentId)
    .map(item => ({
      ...item,
      children: buildTree(data, item.id)
    }));
};

const TreeItem = ({ node }) => {
  const [open, setOpen] = useState(true);

  return (
    <ul style={{ marginLeft: 20 }}>
      <li>
        {node.children.length > 0 && (
          <button onClick={() => setOpen(!open)}>
            {open ? "▼" : "▶"}
          </button>
        )}
        <span style={{ marginLeft: 5 }}>{node.name}</span>

        {open &&
          node.children.map(child => (
            <TreeItem key={child.id} node={child} />
          ))}
      </li>
    </ul>
  );
};

export default function PositionTree() {
  const [positions, setPositions] = useState([]);

  const normalizeData = (data) =>
    data.map(item => ({
      ...item,
      parent_id:
        item.parent_id === 0 || item.parent_id === "0" || item.parent_id === ""
          ? null
          : item.parent_id
    }));

  const loadData = async () => {
    const res = await getPositions();
    const normalized = normalizeData(res.data);
    setPositions(buildTree(normalized));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <h2>Hierarchy Positions</h2>
      {positions.map(item => (
        <TreeItem key={item.id} node={item} />
      ))}
    </>
  );
}
