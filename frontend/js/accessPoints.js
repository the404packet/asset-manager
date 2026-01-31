async function loadAccessPoints() {
  const data = await fetchData("access-points");

  let html = `
    <table>
      <tr>
        <th>ID</th>
        <th>Vendor</th>
        <th>Model</th>
        <th>Standard</th>
        <th>Management IP</th>
      </tr>
  `;

  data.forEach(l => {
    html += `
      <tr>
        <td>${l.id}</td>
        <td>${l.vendor}</td>
        <td>${l.model}</td>
        <td>${l.standard}</td>
        <td>${l.management_ip}</td>
      </tr>
    `;
  });

  html += "</table>";
  document.getElementById("table-container").innerHTML = html;
}
