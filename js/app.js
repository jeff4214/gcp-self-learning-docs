// --- 1. Data Mockup ---

const roadmapLevels = [
    {
        id: 0,
        title: "LEVEL 0 — Foundations (Linux & Basics)",
        goal: "Build a strong understanding of how operating systems and basic networking work.",
        learned: [
            "Linux file system structure (/home, /etc, /var)",
            "User and permission management",
            "Basic terminal commands",
            "Networking basics (IP, ports, SSH)"
        ],
        skills: ["Navigating Linux using CLI", "Managing permissions (chmod, chown)", "Using SSH"],
        status: "Completed ✅",
        class: "status-completed"
    },
    {
        id: 1,
        title: "LEVEL 1 — Cloud Basics (Google Cloud)",
        goal: "Learn how to use cloud platforms and deploy basic infrastructure.",
        learned: [
            "Basics of Google Cloud",
            "Creating and managing virtual machines",
            "Using gcloud CLI",
            "SSH into cloud VMs"
        ],
        skills: ["gcloud compute instances create", "gcloud compute ssh", "Terminal resource management"],
        status: "Completed ✅",
        class: "status-completed"
    },
    {
        id: 2,
        title: "LEVEL 2 — Networking & Security",
        goal: "Understand how real cloud infrastructure is designed and secured.",
        learned: [
            "Public vs Private IP",
            "Internal networking (VPC concepts)",
            "SSH key authentication & Debugging",
            "Firewall rules and traffic control"
        ],
        skills: ["Designing bastion architecture", "Managing SSH configs", "Securing private VMs"],
        
        // --- UPDATE THIS SECTION BELOW ---
        project: `
            <strong>🏗️ Project: Secure Bastion Architecture</strong><br><br>
            <strong>Architecture:</strong><br>
            Laptop → Public VM (reza) → Private VM (jeff)<br><br>
            <strong>Security Features:</strong><br>
            ✔ Private VM has no external IP<br>
            ✔ SSH restricted via firewall rules<br>
            ✔ Access only through bastion<br><br>
            <strong>What I learned:</strong><br>
            • Real-world cloud security design<br>
            • SSH key management<br>
            • Network isolation
        `,
        // ---------------------------------
        
        status: "Completed ✅",
        class: "status-completed"
    },
    {
        id: 3,
        title: "LEVEL 3 — Terraform (Current)",
        goal: "Automate infrastructure using code.",
        learned: [
            "Terraform basics",
            "Writing .tf files",
            "Authentication with Google Cloud",
            "Infrastructure as Code (IaC)"
        ],
        skills: ["Writing Terraform configs", "Automating VM creation", "Managing infrastructure with code"],
        status: "In Progress 🔄",
        class: "status-in-progress",
        isCurrent: true 
    },
    {
        id: 4,
        title: "LEVEL 4 — Advanced Cloud (Future)",
        goal: "Build scalable, production-ready systems.",
        learned: [
            "Load balancing",
            "Kubernetes (GKE)",
            "IAM and security",
            "Monitoring and logging"
        ],
        skills: ["System design", "Container orchestration", "Observability"],
        status: "Planned ⏳",
        class: "status-planned"
    }
];

const logsData = [
    { 
        title: "🟢 Post 1: Getting Started with Google Cloud", 
        tags: ["GCP", "CLI"], 
        content: `<p>I started by learning how to use the gcloud CLI and basic cloud setup...</p>`
    },
    { 
        title: "🟡 Post 2: Creating Virtual Machines in GCP", 
        tags: ["GCP", "Compute Engine"], 
        content: `<p>I created my first VM using a Machine type: e2-micro...</p>`,
        snippet: `gcloud compute instances create [INSTANCE_NAME] --zone=[ZONE] --image-family=ubuntu-2204-lts --image-project=ubuntu-os-cloud`
    },
    { 
        title: "🛡️ Post 3: Building a Secure Bastion Architecture", 
        tags: ["Architecture", "Security"], 
        content: `<p>I created two virtual machines: reza-linux-vm and jeff-linux-vm...</p>`
    },
    { 
        title: "🐛 Post 4: Debugging SSH 'Permission Denied'", 
        tags: ["SSH", "Troubleshooting"], 
        content: `<p>I faced an error when trying to connect... matching keys required.</p>`,
        snippet: `ssh -i ~/.ssh/google_compute_engine jeff@10.128.0.3`
    },
    { 
        title: "⚙️ Post 5: Using SSH Config", 
        tags: ["SSH", "Linux"], 
        content: `<p>Created ~/.ssh/config for cleaner access.</p>`,
        snippet: `Host jeff-private\n  HostName 10.128.0.3\n  User jeff`
    },
    { 
        title: "🔒 Post 6: Making My Private VM Truly Private", 
        tags: ["Security", "GCP"], 
        content: `<p>Removed external IP and added firewall rules.</p>`
    },
    { 
        title: "🏗️ Post 7: Starting Terraform", 
        tags: ["Terraform", "IaC"], 
        content: `<p>Installed Terraform and created main.tf.</p>`
    }
];

const projectsData = [
    { 
        title: "Bastion Host Architecture (GCP)", 
        desc: `<p>I built a secure cloud environment using a public and private VM.</p>`
    }
];

const conceptsData = [
    { title: "VPC", desc: "Private network space in the cloud." },
    { title: "IAM", desc: "Identity and Access Management." },
    { title: "Bastion Host", desc: "Gateway to private networks." }
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
themeBtn.addEventListener('click', () => {
    const htmlObj = document.documentElement;
    const currentTheme = htmlObj.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlObj.setAttribute('data-theme', newTheme);
    themeBtn.innerHTML = newTheme === 'dark' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});

// --- 4. Render Functions ---

// FIXED: Uses roadmapLevels variable and the correct ID for the container
function renderRoadmap() {
    const container = document.getElementById('roadmap-timeline');
    if (!container) return;

    container.innerHTML = roadmapLevels.map(lvl => `
        <div class="level-card ${lvl.isCurrent ? 'current-glow' : ''}">
            <div class="card-content">
                <h3>${lvl.title}</h3>
                <p><strong>🎯 Goal:</strong> ${lvl.goal}</p>
                
                <p><strong>📚 What I Learned:</strong></p>
                <ul style="padding-left: 20px;">
                    ${lvl.learned.map(item => `<li>${item}</li>`).join('')}
                </ul>

                <p><strong>🛠️ Key Skills:</strong></p>
                <div class="skills-list">
                    ${lvl.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                </div>

                ${lvl.project ? `<p style="margin-top:15px;"><strong>🏗️ Project:</strong> ${lvl.project}</p>` : ''}
                
                <p class="status-text" style="margin-top:20px; border-top: 1px solid var(--border); padding-top:10px;">
                    <strong>📍 Status:</strong> <span class="${lvl.class}">${lvl.status}</span>
                </p>
            </div>
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
            <div style="margin: 0.8rem 0;">
                ${log.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            <div class="log-content">${log.content}</div>
            ${log.snippet ? `<pre><code class="language-bash">${log.snippet}</code></pre>` : ''}
        </div>
    `).join('');
    
    if (window.Prism) { Prism.highlightAll(); }
}

function renderSimpleCards(dataArray, containerId) {
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = dataArray.map(item => `
        <div class="card">
            <h3>${item.title}</h3>
            <div>${item.desc}</div>
        </div>
    `).join('');
}

// --- 5. Event Listeners for Filtering ---
const tagFilter = document.getElementById('tag-filter');
const searchInput = document.getElementById('search-logs');

if(tagFilter) {
    tagFilter.addEventListener('change', (e) => {
        renderLogs(e.target.value, searchInput.value);
    });
}

if(searchInput) {
    searchInput.addEventListener('input', (e) => {
        renderLogs(tagFilter.value, e.target.value);
    });
}

// --- 6. Initialize App ---
renderRoadmap();
renderLogs();
renderSimpleCards(projectsData, 'projects-container');
renderSimpleCards(conceptsData, 'concepts-container');
