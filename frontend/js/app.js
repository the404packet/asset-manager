const API_BASE = "http://localhost:8000/api";

async function fetchData(endpoint) {
  const res = await fetch(`${API_BASE}/${endpoint}`);
  return res.json();
}
