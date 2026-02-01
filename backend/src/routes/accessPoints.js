import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let query = "SELECT * FROM access_points WHERE 1=1";
    const values = [];
    let idx = 1;

    for (const key in req.query) {
      query += ` AND ${key} = $${idx++}`;
      values.push(req.query[key]);
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const {
    vendor,
    model,
    standard,
    management_ip
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO access_points
       (vendor, model, standard, management_ip)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [vendor, model, standard, management_ip]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM access_points WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Access Point not found" });
    }

    res.json({ message: "Deleted", asset: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
