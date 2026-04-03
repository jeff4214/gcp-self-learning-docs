
// --- 1. Data Mockup (Edit these to update your site!) ---
const roadmapData = [
    { level: 0, title: "Linux Basics", status: "completed", desc: "File permissions, bash scripting, SSH." },
    { level: 1, title: "Cloud Basics", status: "current", desc: "Understanding VMs, storage, and IAM." },
    { level: 2, title: "Networking & Security", status: "planned", desc: "VPCs, Subnets, Firewalls, Load Balancers." },
    { level: 3, title: "Terraform & Automation", status: "planned", desc: "Infrastructure as Code (IaC)." }
];

const logsData = [
    { title: "Setting up my first SSH Key", date: "2026-03-30", tags: ["Linux", "Security"], snippet: "ssh-keygen -t ed25519 -C 'email@example.com'" },
    { title: "Understanding GCP Compute Engine", date: "2026-03-25", tags: ["Cloud", "GCP"], snippet: "gcloud compute instances create my-vm --zone=us-central1-a" }
];

const projectsData = [
    { title: "Bastion Host Architecture", desc: "Securely connecting to a private VM via a public Bastion host.", tech: "Linux, GCP, Networking", link: "#" }
];

const conceptsData = [
    { title: "VPC (Virtual Private Cloud)", desc: "A private network space in the cloud where you can launch resources securely." },
    { title: "IAM", desc: "Identity and Access Management - Controls WHO can do WHAT in your cloud." }
];

// --- 2. Navigation Logic ---
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Update active button
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        // Toggle Sections
        const targetId = e.target.getAttribute('data-target');
        document.querySelectorAll('.page-section').forEach(section => {
            section.classList.remove('active');
            section.classList.add('hidden');
        });
        document.getElementById(targetId).classList.remove('hidden');
        document.getElementById(targetId).classList.add('active');
    });
});

// --- 3. Theme Toggler ---
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', () => {
    const htmlObj = document.documentElement;
    const currentTheme = htmlObj.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlObj.setAttribute('data-theme', newTheme);
    themeBtn.innerHTML = newTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

// --- 4. Render Functions ---
function renderRoadmap() {
    const container = document.getElementById('roadmap-container');
    container.innerHTML = roadmapData.map(item => `
        <div class="card" style="border-left: 4px solid ${item.status === 'completed' ? '#28a745' : item.status === 'current' ? 'var(--accent)' : 'var(--border)'}">
            <h3>Level ${item.level}: ${item.title} 
                <span class="tag">${item.status.toUpperCase()}</span>
            </h3>
            <p>${item.desc}</p>
        </div>
    `).join('');
}

function renderLogs(filter = 'all', searchQuery = '') {
    const container = document.getElementById('logs-container');
    const filteredLogs = logsData.filter(log => {
        const matchesTag = filter === 'all' || log.tags.includes(filter);
        const matchesSearch = log.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTag && matchesSearch;
    });

    container.innerHTML = filteredLogs.map(log => `
        <div class="card">
            <h3>${log.title}</h3>
            <small>${log.date}</small>
            <div style="margin: 0.5rem 0;">
                ${log.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <pre><code class="language-bash">${log.snippet}</code></pre>
        </div>
    `).join('');
    // Trigger Prism to highlight newly injected code blocks
    Prism.highlightAll(); 
}

function renderSimpleCards(dataArray, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = dataArray.map(item => `
        <div class="card">
            <h3>${item.title}</h3>
            <p>${item.desc}</p>
            ${item.tech ? `<small><strong>Tech:</strong> ${item.tech}</small>` : ''}
        </div>
    `).join('');
}

// --- 5. Event Listeners for Filtering ---
document.getElementById('tag-filter').addEventListener('change', (e) => {
    const query = document.getElementById('search-logs').value;
    renderLogs(e.target.value, query);
});

document.getElementById('search-logs').addEventListener('input', (e) => {
    const tag = document.getElementById('tag-filter').value;
    renderLogs(tag, e.target.value);
});

// --- 6. Initialize App ---
renderRoadmap();
renderLogs();
renderSimpleCards(projectsData, 'projects-container');
renderSimpleCards(conceptsData, 'concepts-container');
//test
