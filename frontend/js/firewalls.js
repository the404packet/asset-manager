async function loadFirewalls() {
  const data = await fetchData("firewalls");

  let html = `
    <table>
      <tr>
        <th>ID</th>
        <th>Vendor</th>
        <th>Model</th>
        <th>Firmware</th>
        <th>Throughput (GB/S)</th>
        <th>Management IP</th>
      </tr>
  `;

  data.forEach(l => {
    html += `
      <tr>
        <td>${l.id}</td>
        <td>${l.vendor}</td>
        <td>${l.model}</td>
        <td>${l.firmware}</td>
        <td>${l.throughput_gbps}</td>
        <td>${l.management_ip}</td>
      </tr>
    `;
  });

  html += "</table>";
  document.getElementById("table-container").innerHTML = html;
}
