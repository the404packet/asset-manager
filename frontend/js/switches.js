async function loadSwitches() {
  const data = await fetchData("switches");

  let html = `
    <table>
      <tr>
        <th>ID</th>
        <th>Vendor</th>
        <th>Model</th>
        <th>Ports</th>
        <th>Firmware</th>
        <th>Management IP</th>
      </tr>
  `;

  data.forEach(l => {
    html += `
      <tr>
        <td>${l.id}</td>
        <td>${l.vendor}</td>
        <td>${l.model}</td>
        <td>${l.ports}</td>
        <td>${l.firmware}</td>
        <td>${l.management_ip}</td>
      </tr>
    `;
  });

  html += "</table>";
  document.getElementById("table-container").innerHTML = html;
}
