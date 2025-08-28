var tablinks = document.getElementsByClassName("tab-links");
var tabcontent = document.getElementsByClassName("tab-content");
function opentab(tabname, event){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }

    for(tabcont of tabcontent){
        tabcont.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab")
}

document.addEventListener('DOMContentLoaded', () => {
    const username    = 'silas-ransford-osei';
    const container   = document.getElementById('projects-container');
    const endpoint    = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;

    fetch(endpoint)
        .then(res => res.json())
        .then(repos => {
            const myProjects = repos.filter(r => !r.fork);

            if (myProjects.length === 0) {
                container.innerHTML = '<p>No projects to display yet.</p>';
                return;
            }

            myProjects.forEach(repo => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
          <h3>${repo.name.replace(/-/g, ' ')}</h3>
          <p>${repo.description || 'No description provided.'}</p>
          <a href="${repo.html_url}" target="_blank">View on GitHub</a>
        `;
                container.appendChild(card);
            });
        })
        .catch(err => {
            console.error('GitHub API error:', err);
            container.innerHTML = '<p>Could not load projects. Please try again later.</p>';
        });
});