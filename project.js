(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const project = PROJECTS.find((p) => p.id === id);

    const contentEl = document.getElementById('project-content');
    const notFoundEl = document.getElementById('project-not-found');

    if (!project) {
        contentEl.hidden = true;
        notFoundEl.hidden = false;
        return;
    }

    document.title = `${project.name} — Ajil VC`;

    const badgeLabel = project.type === 'client' ? 'Client Project' : 'Personal Project';

    const linkButtons = [];
    if (project.links.demo) {
        linkButtons.push(`<a href="${project.links.demo}" target="_blank" rel="noopener" class="btn btn-primary">Live Demo <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`);
    }
    if (project.links.github) {
        linkButtons.push(`<a href="${project.links.github}" target="_blank" rel="noopener" class="btn btn-secondary"><i class="fa-brands fa-github"></i> GitHub</a>`);
    }
    if (project.links.githubFrontend) {
        linkButtons.push(`<a href="${project.links.githubFrontend}" target="_blank" rel="noopener" class="btn btn-secondary"><i class="fa-brands fa-github"></i> Front-End</a>`);
    }
    if (project.links.githubBackend) {
        linkButtons.push(`<a href="${project.links.githubBackend}" target="_blank" rel="noopener" class="btn btn-secondary"><i class="fa-brands fa-github"></i> Back-End</a>`);
    }

    const techPills = project.stack.map((tech) => `<span>${tech}</span>`).join('');

    const sections = [
        ['The Project', project.about],
        ['My Contribution', project.contribution],
        ['Why This Stack', project.reason],
        ['The Challenge', project.challenge],
        ['How I Solved It', project.solution],
        ["What's Next", project.future],
    ];

    const sectionsHtml = sections
        .map(([heading, body]) => `
            <div class="project-detail-section">
                <h3>${heading}</h3>
                <p>${body}</p>
            </div>`)
        .join('');

    const funFactHtml = project.funFact ? `
            <div class="project-detail-section project-detail-section-full">
                <h3>One Thing I Learned</h3>
                <p>${project.funFact}</p>
            </div>` : '';

    const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
    const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
    const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

    contentEl.innerHTML = `
        <span class="project-badge ${project.type}">${badgeLabel}</span>
        <h1 class="project-detail-title">${project.name}</h1>
        <p class="project-detail-tagline">${project.tagline}</p>

        <div class="project-detail-hero-img-wrapper">
            <img src="${project.image}" alt="${project.name}" class="project-detail-hero-img">
        </div>

        <div class="project-detail-links">
            ${linkButtons.join('')}
        </div>

        <div class="project-tech project-detail-tech">
            ${techPills}
        </div>

        <div class="project-detail-grid">
            ${sectionsHtml}
            ${funFactHtml}
        </div>

        <div class="project-detail-nav">
            <a href="project.html?id=${prevProject.id}" class="project-nav-link prev">
                <span class="project-nav-label">&larr; Previous</span>
                <span class="project-nav-name">${prevProject.name}</span>
            </a>
            <a href="project.html?id=${nextProject.id}" class="project-nav-link next">
                <span class="project-nav-label">Next &rarr;</span>
                <span class="project-nav-name">${nextProject.name}</span>
            </a>
        </div>
    `;
})();
