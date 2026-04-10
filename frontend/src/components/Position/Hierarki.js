import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../Layout/Navbar";
import { getPositions } from "../../Services/positionService";

const buildTree = (data, parentId = null) => {
  return data
    .filter((item) => item.parent_id === parentId)
    .map((item) => ({
      ...item,
      children: buildTree(data, item.id),
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
          node.children.map((child) => (
            <TreeItem key={child.id} node={child} />
          ))}
      </li>
    </ul>
  );
};

export default function PositionTree() {
  const [positions, setPositions] = useState([]);

  const normalizeData = (data) =>
    data.map((item) => ({
      ...item,
      parent_id:
        item.parent_id === 0 ||
        item.parent_id === "0" ||
        item.parent_id === ""
          ? null
          : item.parent_id,
    }));

  const loadData = useCallback(async () => {
    const res = await getPositions();
    const normalized = normalizeData(res.data);
    setPositions(buildTree(normalized));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

 return (
  <>
    <Navbar />
    <section className="hero has-background-grey-light is-fullheight">
      <div className="hero-body">
        <div className="container">
          <div className="box">
            <h2
              className="title is-4"
              style={{ marginBottom: "20px" }}
            >
              Hierarchy Positions
            </h2>

            {positions.map((item) => (
              <TreeItem key={item.id} node={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  </>
);
}