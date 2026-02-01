import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let query = "SELECT * FROM firewalls WHERE 1=1";
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
    firmware,
    throughput_gbps,
    management_ip
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO firewalls
       (vendor, model, firmware, throughput_gbps, management_ip)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [vendor, model, firmware, throughput_gbps, management_ip]
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
      "DELETE FROM firewalls WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Firewall not found" });
    }

    res.json({ message: "Deleted", asset: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
