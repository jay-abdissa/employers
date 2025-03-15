const API_URL = "https://auto-pay-api-sgiognjnfa-uc.a.run.app/auto-pay/get-ui-params";

let employers = [];
let jobTitles = [];

let employerPage = 1;
let jobPage = 1;
const itemsPerPage = 5;

// Fetch data from API
async function fetchData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        console.log(`Response Details: ${JSON.stringify(data)}`);

        employers = data.employers || [];
        jobTitles = data.jobTitles || [];

        updateTables();
        setupPagination();
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}
// Update tables with paginated data
function updateTables() {
    populateEmployerTable("employersTable", employers, employerPage);
    populateJobTable("jobTitlesTable", jobTitles, jobPage);

    console.log(`employerPage: ${employerPage}`);
    console.log(`jobPage: ${jobPage}`);


}


// Populate the given table with paginated data
function populateEmployerTable(tableId, items, currentPage) {
    const tableBody = document.getElementById(tableId).querySelector("tbody");
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = items.slice(start, end);

    paginatedItems.forEach(item => {
        let row = document.createElement("tr");
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        cell1.textContent = item.id;
        cell2.textContent = item.item;
        row.appendChild(cell1);
        row.appendChild(cell2);
        tableBody.appendChild(row);
    });

}

// Populate the given table with data
function populateJobTable(tableId, items, currentPage) {
    const tableBody = document.getElementById(tableId).querySelector("tbody");
    tableBody.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedItems = items.slice(start, end);

    paginatedItems.forEach(item => {
        let row = document.createElement("tr");
        let cell1 = document.createElement("td");
        let cell2 = document.createElement("td");
        cell1.textContent = item.id;
        cell2.textContent = item.item;
        row.appendChild(cell1);
        row.appendChild(cell2);
        tableBody.appendChild(row);
    });

}

// Filter tables based on search input
function filterTables() {
    let searchValue = document.getElementById("search").value.toLowerCase();
    ["employersTable", "jobTitlesTable"].forEach(tableId => {
        let rows = document.querySelectorAll(`#${tableId} tbody tr`);
        rows.forEach(row => {
            let text = row.textContent.toLowerCase();
            row.style.display = text.includes(searchValue) ? "" : "none";
        });
    });
}
// Handle pagination
function setupPagination() {
    document.getElementById("prevEmployer").addEventListener("click", () => {
        console.log(`prevemployer called`);
        if (employerPage > 1) {
            employerPage--;
            updateTables();
        }
    });

    document.getElementById("nextEmployer").addEventListener("click", () => {
        if (employerPage < Math.ceil(employers.length / itemsPerPage)) {
            console.log(`nextemployer called`);
            employerPage++;
            updateTables();
        }
    });

    document.getElementById("prevJob").addEventListener("click", () => {
        console.log(`prevJob called`);
        if (jobPage > 1) {
            jobPage--;
            updateTables();
        }
    });

    document.getElementById("nextJob").addEventListener("click", () => {
        console.log(`nextJob called`);
        if (jobPage < Math.ceil(jobTitles.length / itemsPerPage)) {
            jobPage++;
            updateTables();
        }
    });
}

// Load data when the page loads
window.onload = fetchData;
