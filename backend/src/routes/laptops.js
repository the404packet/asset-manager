import express from "express";
import pool from "../db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM laptops");
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
    serial_number
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO laptops 
       (vendor, model, cpu, ram_gb, storage_gb, os, serial_number)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [vendor, model, cpu, ram_gb, storage_gb, os, serial_number]
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
      "DELETE FROM laptops WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Laptop not found" });
    }

    res.json({ message: "Deleted", asset: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    let query = "SELECT * FROM laptops WHERE 1=1";
    const values = [];
    let idx = 1;

    if (req.query.vendor) {
      query += ` AND vendor = $${idx++}`;
      values.push(req.query.vendor);
    }

    if (req.query.cpu) {
      query += ` AND cpu = $${idx++}`;
      values.push(req.query.cpu);
    }

    if (req.query.ram_gb) {
      query += ` AND ram_gb >= $${idx++}`;
      values.push(req.query.ram_gb);
    }

    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
