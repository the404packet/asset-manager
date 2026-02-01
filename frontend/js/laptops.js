async function loadLaptops() {
  const data = await fetchData("laptops");
  renderLaptopTable(data);
}

function renderLaptopTable(data) {
  let html = `
    <table>
      <tr>
        <th>ID</th>
        <th>Vendor</th>
        <th>Model</th>
        <th>CPU</th>
        <th>RAM (GB)</th>
        <th>Storage (GB)</th>
        <th>OS</th>
        <th>Serial No.</th>
        <th>Actions</th>
      </tr>
  `;

  if (data.length === 0) {
    html += `
      <tr>
        <td colspan="9" style="text-align:center;">No laptops found</td>
      </tr>
    `;
  } else {
    data.forEach(l => {
      html += `
        <tr>
          <td>${l.id}</td>
          <td>${l.vendor}</td>
          <td>${l.model}</td>
          <td>${l.cpu}</td>
          <td>${l.ram_gb}</td>
          <td>${l.storage_gb}</td>
          <td>${l.os}</td>
          <td>${l.serial_number}</td>
          <td>
            <button onclick="deleteLaptop(${l.id})">Delete</button>
          </td>
        </tr>
      `;
    });
  }

  html += "</table>";
  document.getElementById("table-container").innerHTML = html;
}

async function applyLaptopFilter() {
  const vendor = document.getElementById("vendorFilter").value.trim();
  const ram = document.getElementById("ramFilter").value.trim();

  let url = "laptops?";
  if (vendor) url += `vendor=${encodeURIComponent(vendor)}&`;
  if (ram) url += `ram_gb=${encodeURIComponent(ram)}`;

  const data = await fetchData(url);
  renderLaptopTable(data);
}

async function deleteLaptop(id) {
  if (!confirm("Are you sure you want to delete this laptop?")) return;

  await fetch(`http://localhost:8000/api/laptops/${id}`, {
    method: "DELETE"
  });

  loadLaptops(); // refresh table
}
