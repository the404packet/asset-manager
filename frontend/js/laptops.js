async function loadLaptops() {
  const data = await fetchData("laptops");

  let html = `
    <table>
      <tr>
        <th>ID</th>
        <th>Model</th>
        <th>CPU</th>
        <th>RAM</th>
        <th>OS</th>
      </tr>
  `;

  data.forEach(l => {
    html += `
      <tr>
        <td>${l.id}</td>
        <td>${l.model}</td>
        <td>${l.cpu}</td>
        <td>${l.ram}</td>
        <td>${l.os}</td>
      </tr>
    `;
  });

  html += "</table>";
  document.getElementById("table-container").innerHTML = html;
}
