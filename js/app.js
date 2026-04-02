// --- 1. Data Structures ---

const roadmapLevels = [
    {
        id: 0,
        title: "LEVEL 0 — Foundations (Linux & Basics)",
        goal: "Build a strong understanding of how operating systems and basic networking work.",
        learned: [
            "Navigated the Linux file system using terminal (/home, /etc, /var)",
            "Managed users and permissions on Ubuntu",
            "Practiced essential terminal commands for daily use",
            "Connected to remote systems using SSH"
        ],
        skills: ["Linux CLI Navigation", "chmod / chown", "System Structure", "Basic SSH usage"],
        proof: ["Used Ubuntu as main environment", "Managed files via CLI", "User/Permission control", "Remote SSH"],
        status: "Completed ✅",
        class: "status-completed"
    },
    {
        id: 1,
        title: "LEVEL 1 — Cloud Basics (Google Cloud)",
        goal: "Learn how to use cloud platforms and deploy basic infrastructure.",
        learned: ["Created VMs on GCP", "Managed resources via gcloud CLI", "Connected via SSH", "Configured machine types"],
        skills: ["gcloud compute", "VM Lifecycle", "CLI operations"],
        proof: ["Created GCP VMs", "Managed infra via CLI", "Understood cloud architecture"],
        status: "Completed ✅",
        class: "status-completed"
    },
    {
        id: 2,
        title: "LEVEL 2 — Networking & Security",
        goal: "Understand how real cloud infrastructure is designed and secured.",
        learned: ["Public vs Private IP", "VPC concepts", "SSH key debugging", "Firewall rules"],
        skills: ["Bastion architecture", "SSH configs", "Network isolation"],
        project: `<strong>🏗️ Project: Secure Bastion Architecture</strong><br>Architecture: Laptop -> Public VM -> Private VM<br>✔ Private VM has no external IP`,
        status: "Completed ✅",
        class: "status-completed"
    },
    {
        id: 3,
        title: "LEVEL 3 — Automation with Terraform (Current)",
        goal: "Automate cloud infrastructure using code instead of manual configuration.",
        learned: ["Writing .tf files", "Connecting to GCP", "IaC concepts", "Rebuilding infra"],
        skills: ["Terraform Configs", "Providers & Resources", "init/plan/apply"],
        proof: ["Installed Terraform", "Authenticated with GCP", "Created main.tf", "Applied changes"],
        project: "🚀 Current Focus: Rebuilding bastion architecture using Terraform",
        status: "In Progress 🔄",
        class: "status-in-progress",
        isCurrent: true
    },
    {
        id: 4,
        title: "LEVEL 4 — Advanced Cloud (Future)",
        goal: "Build scalable, production-ready systems.",
        learned: ["Load balancing", "Kubernetes (GKE)", "IAM security", "Monitoring"],
        skills: ["System design", "Containers", "Observability"],
        status: "Planned ⏳",
        class: "status-planned"
    }
];

const logsData = [
    {
        title: "🚀 Post 1: Initializing the Cloud Environment",
        tags: ["GCP", "CLI", "Foundations"],
        content: `<p>Objective: Manage GCP via terminal. Installed SDK and performed auth handshake.</p>`,
        snippet: `gcloud init\ngcloud auth login`
    },
    {
        title: "🛡️ Post 2: Building the 'Reza-Jeff' Bastion Architecture",
        tags: ["Networking", "Security", "SSH"],
        content: `<p>Created a Public Gateway and a Private Instance with zero external IP exposure.</p>`,
        snippet: `gcloud compute instances create jeff-linux-vm --network-interface=subnet=default,no-address`
    },
    {
        title: "🐛 Post 3: Solving the 'Permission Denied' SSH Puzzle",
        tags: ["Troubleshooting", "Linux"],
        content: `<p>Fixed publickey errors using ProxyJump in SSH config.</p>`,
        snippet: `Host jeff-private\n  ProxyJump reza-public`
    },
    {
        title: "⚙️ Post 4: The Terraform Transition (Level 3)",
        tags: ["Terraform", "IaC", "Automation"],
        content: `<p>Translating firewall rules into HCL for automation.</p>`,
        snippet: `resource "google_compute_instance" "bastion" {\n  name = "reza-bastion"\n}`
    },
    {
        title: "🛠️ Log 5: Installing Terraform & Overcoming 'apt-key' Deprecation",
        tags: ["Terraform", "Linux", "Troubleshooting"],
        content: `<p>Fixed apt-key deprecation by creating a trusted GPG keyring manually.</p>`,
        snippet: `curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg`
    },
    {
        title: "🚀 Log 6: My First Terraform Deployment & The ADC Trap",
        tags: ["Terraform", "GCP", "Authentication"],
        content: `<p>Solved 'No Credentials' error using Application Default Credentials.</p>`,
        snippet: `gcloud auth application-default login`
    }
];

const projectsData = [
    {
        title: "🛡️ Secure Bastion Host",
        tech: "Networking, GCP, SSH",
        desc: "Designed a secure 'Jump Box' architecture to manage private cloud resources safely.",
        link: "#"
    },
    {
        title: "⚙️ Infrastructure as Code",
        tech: "Terraform, HCL, GCP",
        desc: "Automated the deployment of a hardened Linux environment using Terraform.",
        link: "#"
    }
];

const conceptsData = [
    {
        title: "🌐 VPC (Virtual Private Cloud)",
        tech: "Networking",
        desc: "Your own isolated, private section of the Google Cloud network."
    },
    {
        title: "🔑 IAM (Identity Access Management)",
        tech: "Security",
        desc: "Managing permissions: Who can do what, on which resource?"
    },
    {
        title: "🔐 GPG Keyrings",
        tech: "Linux Security",
        desc: "Verifying the 'Chain of Trust' for software packages via digital signatures."
    }
];

// --- 2. Navigation Logic ---
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

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
if(themeBtn) {
    themeBtn.addEventListener('click', () => {
        const htmlObj = document.documentElement;
        const currentTheme = htmlObj.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlObj.setAttribute('data-theme', newTheme);
        themeBtn.innerHTML = newTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });
}

// --- 4. Render Functions ---

function renderRoadmap() {
    const container = document.getElementById('roadmap-timeline');
    if (!container) return;
    container.innerHTML = roadmapLevels.map(lvl => `
        <div class="level-card ${lvl.isCurrent ? 'current-glow' : ''}">
            <h3>${lvl.title}</h3>
            <p><strong>🎯 Goal:</strong> ${lvl.goal}</p>
            <ul class="roadmap-list">${lvl.learned.map(item => `<li>${item}</li>`).join('')}</ul>
            <div class="skills-list">${lvl.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
            ${lvl.project ? `<div class="project-box">${lvl.project}</div>` : ''}
            <p class="status-text"><strong>📍 Status:</strong> <span class="${lvl.class}">${lvl.status}</span></p>
        </div>
    `).join('');
}

function renderLogs(filter = 'all', searchQuery = '') {
    const container = document.getElementById('logs-container');
    if(!container) return;
    const filteredLogs = logsData.filter(log => {
        const matchesTag = filter === 'all' || log.tags.includes(filter);
        const matchesSearch = log.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTag && matchesSearch;
    });
    container.innerHTML = filteredLogs.map(log => `
        <div class="card log-card">
            <h3>${log.title}</h3>
            <div>${log.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
            <div class="log-content">${log.content}</div>
            ${log.snippet ? `<pre><code class="language-bash">${log.snippet}</code></pre>` : ''}
        </div>
    `).join('');
    if (window.Prism) Prism.highlightAll();
}

function renderSimpleCards(dataArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = dataArray.map(item => `
        <div class="card project-card">
            <h3>${item.title}</h3>
            <p><span class="tech-badge">${item.tech}</span></p>
            <p>${item.desc}</p>
            <a href="${item.link || '#'}" class="btn-small">View More</a>
        </div>
    `).join('');
}

// --- 5. Event Listeners ---
const tagFilter = document.getElementById('tag-filter');
const searchInput = document.getElementById('search-logs');
if(tagFilter) tagFilter.addEventListener('change', (e) => renderLogs(e.target.value, searchInput?.value || ''));
if(searchInput) searchInput.addEventListener('input', (e) => renderLogs(tagFilter?.value || 'all', e.target.value));

// --- 6. Initialize App ---
document.addEventListener('DOMContentLoaded', () => {
    renderRoadmap();
    renderLogs();
    renderSimpleCards(projectsData, 'projects-container');
    renderSimpleCards(conceptsData, 'concepts-container');
});
