async function loadServers() {
  const data = await fetchData("servers");

  let html = `
    <table>
      <tr>
        <th>ID</th>
        <th>Vendor</th>
        <th>Model</th>
        <th>CPU</th>
        <th>RAM(GB)</th>
        <th>STORAGE(GB)</th>
        <th>OS</th>
        <th>IP Address</th>
      </tr>
  `;

  data.forEach(l => {
    html += `
      <tr>
        <td>${l.id}</td>
        <td>${l.vendor}</td>
        <td>${l.model}</td>
        <td>${l.cpu}</td>
        <td>${l.ram}</td>
        <td>${l.storage}</td>
        <td>${l.os}</td>
        <td>${l.ip_address}</td>
      </tr>
    `;
  });

  html += "</table>";
  document.getElementById("table-container").innerHTML = html;
}
