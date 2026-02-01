import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let query = "SELECT * FROM servers WHERE 1=1";
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
    cpu,
    ram_gb,
    storage_gb,
    os,
    ip_address
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO servers
       (vendor, model, cpu, ram_gb, storage_gb, os, ip_address)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [vendor, model, cpu, ram_gb, storage_gb, os, ip_address]
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
      "DELETE FROM servers WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Server not found" });
    }

    res.json({ message: "Deleted", asset: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
