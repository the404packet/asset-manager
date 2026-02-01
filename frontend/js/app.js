const API_BASE = "http://localhost:8000/api";

async function fetchData(endpoint) {
  const res = await fetch(`${API_BASE}/${endpoint}`);
  return res.json();
}

const ASSET_SCHEMAS = {
  laptops: {
    endpoint: "laptops",
    fields: {
      vendor: "text",
      model: "text",
      cpu: "text",
      ram_gb: "number",
      storage_gb: "number",
      os: "text",
      serial_number: "text"
    }
  },
  servers: {
    endpoint: "servers",
    fields: {
      vendor: "text",
      model: "text",
      cpu: "text",
      ram_gb: "number",
      storage_gb: "number",
      os: "text",
      ip_address: "text"
    }
  },
  firewalls: {
    endpoint: "firewalls",
    fields: {
      vendor: "text",
      model: "text",
      firmware: "text",
      throughput_gbps: "number",
      management_ip: "text"
    }
  },
  switches: {
    endpoint: "switches",
    fields: {
      vendor: "text",
      model: "text",
      ports : "number",
      firmware: "text",
      management_ip: "text"
    }
  },
  access_points: {
    endpoint: "access-points",
    fields: {
      vendor: "text",
      model: "text",
      standard: "text",
      management_ip: "text"
    }
  }
};

let CURRENT_ASSET = null;

function renderFilters(assetKey) {
  CURRENT_ASSET = assetKey;
  const schema = ASSET_SCHEMAS[assetKey];

  let html = "";

  for (const field in schema.fields) {
    html += `
      <input 
        id="filter_${field}" 
        type="${schema.fields[field]}" 
        placeholder="${field.replaceAll("_", " ")}"
      />
    `;
  }

  html += `
    <button onclick="applyFilter()">Filter</button>
    <button onclick="loadAsset('${assetKey}')">Reset</button>
    <button onclick="showAddForm()">Add</button>
  `;

  document.getElementById("controls").innerHTML = html;
}

async function applyFilter() {
  const schema = ASSET_SCHEMAS[CURRENT_ASSET];
  let url = `${schema.endpoint}?`;

  for (const field in schema.fields) {
    const value = document.getElementById(`filter_${field}`).value.trim();
    if (value) {
      url += `${field}=${encodeURIComponent(value)}&`;
    }
  }

  const data = await fetchData(url);
  renderTable(data);
}

function renderTable(data) {
  const schema = ASSET_SCHEMAS[CURRENT_ASSET];

  let html = "<table><tr><th>ID</th>";

  for (const field in schema.fields) {
    html += `<th>${field.replaceAll("_", " ")}</th>`;
  }

  html += "<th>Actions</th></tr>";

  if (data.length === 0) {
    html += `<tr><td colspan="${Object.keys(schema.fields).length + 2}" style="text-align:center;">No data</td></tr>`;
  } else {
    data.forEach(row => {
      html += `<tr><td>${row.id}</td>`;
      for (const field in schema.fields) {
        html += `<td>${row[field] ?? ""}</td>`;
      }
      html += `
        <td>
          <button onclick="deleteAsset(${row.id})">Delete</button>
        </td>
      </tr>`;
    });
  }

  html += "</table>";
  document.getElementById("table-container").innerHTML = html;
}

async function loadAsset(assetKey) {
  renderFilters(assetKey);
  const schema = ASSET_SCHEMAS[assetKey];
  const data = await fetchData(schema.endpoint);
  renderTable(data);
}

function showAddForm() {
  const schema = ASSET_SCHEMAS[CURRENT_ASSET];

  let html = "<div style='margin:10px 0;'>";

  for (const field in schema.fields) {
    html += `
      <input 
        id="add_${field}" 
        type="${schema.fields[field]}" 
        placeholder="${field.replaceAll("_", " ")}"
      />
    `;
  }

  html += `
    <button onclick="addAsset()">Save</button>
    <button onclick="loadAsset('${CURRENT_ASSET}')">Cancel</button>
  </div>`;

  document.getElementById("controls").innerHTML += html;
}

async function addAsset() {
  const schema = ASSET_SCHEMAS[CURRENT_ASSET];
  const payload = {};

  for (const field in schema.fields) {
    payload[field] = document.getElementById(`add_${field}`).value;
  }

  await fetch(`http://localhost:8000/api/${schema.endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  loadAsset(CURRENT_ASSET);
}

async function deleteAsset(id) {
  if (!confirm("Delete this asset?")) return;

  const schema = ASSET_SCHEMAS[CURRENT_ASSET];
  await fetch(`http://localhost:8000/api/${schema.endpoint}/${id}`, {
    method: "DELETE"
  });

  loadAsset(CURRENT_ASSET);
}
