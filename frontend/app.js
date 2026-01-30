const API_BASE_URL = "http://localhost:8000/api";

function loadAssets(type) {
    const titleMap = {
        "laptops": "Laptops",
        "servers": "Servers",
        "switches": "Switches",
        "firewalls": "Firewalls",
        "access-points": "Access Points"
    };

    document.getElementById("assetTitle").innerText = titleMap[type];

    fetch(`${API_BASE_URL}/${type}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Backend not reachable");
            }
            return response.json();
        })
        .then(data => renderTable(data))
        .catch(error => {
            document.getElementById("assetTable").innerHTML =
                `<tr><td>Error loading data</td></tr>`;
            console.error(error);
        });
}

function renderTable(data) {
    if (data.length === 0) {
        document.getElementById("assetTable").innerHTML =
            "<tr><td>No data available</td></tr>";
        return;
    }

    let tableHTML = "<tr>";

    Object.keys(data[0]).forEach(key => {
        tableHTML += `<th>${formatHeader(key)}</th>`;
    });

    tableHTML += "</tr>";

    data.forEach(row => {
        tableHTML += "<tr>";
        Object.values(row).forEach(value => {
            tableHTML += `<td>${value ?? ""}</td>`;
        });
        tableHTML += "</tr>";
    });

    document.getElementById("assetTable").innerHTML = tableHTML;
}

function formatHeader(text) {
    return text
        .replace(/_/g, " ")
        .replace(/([A-Z])/g, " $1")
        .toUpperCase();
}
