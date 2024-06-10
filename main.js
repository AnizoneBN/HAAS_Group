document.addEventListener("DOMContentLoaded", function() {
    const teamsContainer = document.getElementById('teams-container');

    // Function to fetch student data from JSON
    async function fetchStudentData() {
        const response = await fetch('/test.json');
        const students = await response.json();
        return students;
    }

    // Function to shuffle an array (Fisher-Yates algorithm)
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to assign students to teams based on gender
    function assignTeams() {
        fetchStudentData().then(students => {
            const boys = shuffle(students.filter(student => student.gender === 'boy'));
            const girls = shuffle(students.filter(student => student.gender === 'girl'));

            const boyTeams = createTeams(boys);
            const girlTeams = createTeams(girls);

            displayTeams(boyTeams, "Boys Team", "boys-team");
            displayTeams(girlTeams, "Girls Team", "girls-team");
        });
    }

    // Function to create teams with a maximum of 8 members each
    function createTeams(students) {
        const teams = [];
        while (students.length) {
            teams.push(students.splice(0, 8));
        }
        return teams;
    }

    // Function to display teams in the HTML
    function displayTeams(teams, teamType, teamClass) {
        const header = document.createElement('h1');
        header.textContent = teamType;
        header.classList.add(teamClass);
        teamsContainer.appendChild(header);

        teams.forEach((team, index) => {
            const table = document.createElement('table');
            const headerRow = document.createElement('tr');
            headerRow.innerHTML = '<th>Name</th><th>Roll</th>';
            table.appendChild(headerRow);

            team.forEach(student => {
                const row = document.createElement('tr');
                row.innerHTML = `<td>${student.name}</td><td>${student.roll}</td>`;
                table.appendChild(row);
            });

            const teamWrapper = document.createElement('div');
            teamWrapper.classList.add('team-wrapper');
            teamWrapper.appendChild(table);
            teamsContainer.appendChild(teamWrapper);
        });
    }

    // Attach assignTeams function to the button
    document.getElementById('assign-teams-btn').addEventListener('click', function() {
        // Clear previous teams
        teamsContainer.innerHTML = '';
        // Assign new teams
        assignTeams();
    });

    // Initial assignment of teams
    assignTeams();
});