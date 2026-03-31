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
        project: "Laptop → reza-linux-vm (Public) → jeff-linux-vm (Private)",
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
        isCurrent: true // This adds the highlight/glow effect
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

// Update your render function to use these new fields
function renderRoadmap() {
    const container = document.getElementById('roadmap-timeline');
    container.innerHTML = roadmapLevels.map(lvl => `
        <div class="level-card ${lvl.isCurrent ? 'current-glow' : ''}">
            <div class="card-content">
                <h3>${lvl.title}</h3>
                <p><strong>🎯 Goal:</strong> ${lvl.goal}</p>
                <p><strong>📚 What I Learned:</strong></p>
                <ul>${lvl.learned.map(item => `<li>${item}</li>`).join('')}</ul>
                <p><strong>🛠️ Key Skills:</strong></p>
                <div class="skills-list">${lvl.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}</div>
                ${lvl.project ? `<p><strong>🏗️ Project:</strong> ${lvl.project}</p>` : ''}
                <p class="status-text"><strong>📍 Status:</strong> <span class="${lvl.class}">${lvl.status}</span></p>
            </div>
        </div>
    `).join('');
}

renderRoadmap();

const logsData = [
    { 
        title: "🟢 Post 1: Getting Started with Google Cloud", 
        tags: ["GCP", "CLI"], 
        content: `
            <p>I started by learning how to use the gcloud CLI and basic cloud setup. This helped me understand how to manage cloud resources from the terminal instead of using the web interface.</p>
            <p><strong>Key commands I learned:</strong></p>
            <ul>
                <li><code>gcloud init</code></li>
                <li><code>gcloud auth login</code></li>
                <li><code>gcloud compute instances list</code></li>
            </ul>
        `
    },
    { 
        title: "🟡 Post 2: Creating Virtual Machines in GCP", 
        tags: ["GCP", "Compute Engine", "Ubuntu"], 
        content: `
            <p>I created my first VM using a <strong>Machine type: e2-micro</strong> (free tier) and an <strong>Ubuntu OS</strong>. This gave me a Linux server running in the cloud.</p>
        `,
        snippet: `gcloud compute instances create [INSTANCE_NAME] \\
--zone=[ZONE] \\
--image-family=ubuntu-2204-lts \\
--image-project=ubuntu-os-cloud`
    },
    { 
        title: "🛡️ Post 3: Building a Secure Bastion Architecture", 
        tags: ["Architecture", "Security", "Networking"], 
        content: `
            <p>I created two virtual machines:</p>
            <ul>
                <li><strong>reza-linux-vm</strong> &rarr; Public VM (bastion)</li>
                <li><strong>jeff-linux-vm</strong> &rarr; Private VM</li>
            </ul>
            <p><strong>Goal:</strong> Only allow access to the private VM through the public VM.</p>
            <p><strong>Architecture Flow:</strong><br> Laptop &rarr; reza-linux-vm &rarr; jeff-linux-vm</p>
        `
    },
    { 
        title: "🐛 Post 4: Debugging SSH 'Permission Denied (publickey)'", 
        tags: ["SSH", "Troubleshooting"], 
        content: `
            <p>I faced an error when trying to connect from the public VM to the private VM: <code>Permission denied (publickey)</code>.</p>
            <p><strong>What I learned:</strong></p>
            <ul>
                <li>SSH requires matching public + private keys.</li>
                <li>Default keys are not always used automatically.</li>
            </ul>
            <p><strong>Solution:</strong> I explicitly pointed to the key using the command below. Later, I improved it using SSH config.</p>
        `,
        snippet: `ssh -i ~/.ssh/google_compute_engine jeff@10.128.0.3`
    },
    { 
        title: "⚙️ Post 5: Using SSH Config for Cleaner Access", 
        tags: ["SSH", "Linux"], 
        content: `
            <p>Instead of typing long commands, I created an SSH config file at <code>~/.ssh/config</code>. Now I can simply run: <code>ssh jeff-private</code>.</p>
        `,
        snippet: `Host jeff-private
    HostName 10.128.0.3
    User jeff
    IdentityFile ~/.ssh/mykey`
    },
    { 
        title: "🔒 Post 6: Making My Private VM Truly Private", 
        tags: ["Security", "GCP", "Firewall"], 
        content: `
            <p><strong>Steps taken:</strong></p>
            <ol>
                <li>Removed external IP from <code>jeff-linux-vm</code></li>
                <li>Created a firewall rule to allow SSH <em>only</em> from <code>reza-linux-vm</code></li>
                <li>Added network tag: <code>private-vm</code></li>
            </ol>
            <p><strong>Result:</strong></p>
            <ul>
                <li>Internet ❌ &rarr; jeff-linux-vm</li>
                <li>reza-linux-vm ✅ &rarr; jeff-linux-vm</li>
            </ul>
            <p>This is a real-world secure setup!</p>
        `
    },
    { 
        title: "🏗️ Post 7: Starting Terraform", 
        tags: ["Terraform", "IaC", "Automation"], 
        content: `
            <p>I began learning Terraform to automate my infrastructure. My goal is to rebuild my entire Bastion architecture using code.</p>
            <p><strong>Steps:</strong></p>
            <ul>
                <li>Installed Terraform</li>
                <li>Authenticated with Google Cloud</li>
                <li>Created first configuration file (<code>main.tf</code>)</li>
            </ul>
        `
    }
];

const projectsData = [
    { 
        title: "Bastion Host Architecture (GCP)", 
        desc: `
            <p><strong>Description:</strong> I built a secure cloud environment using a public and private VM.</p>
            <br>
            <p><strong>Components:</strong></p>
            <ul>
                <li>Public VM (reza-linux-vm)</li>
                <li>Private VM (jeff-linux-vm)</li>
                <li>Firewall rules & SSH key authentication</li>
            </ul>
            <br>
            <p><strong>Security Features:</strong></p>
            <ul>
                <li>Private VM has no external IP</li>
                <li>SSH access restricted to bastion only</li>
            </ul>
            <br>
            <p><strong>Architecture:</strong> Laptop &rarr; Public VM &rarr; Private VM</p>
            <br>
            <p><strong>Skills Learned:</strong> SSH key management, Firewall rules, Cloud networking.</p>
        `
    }
];

const conceptsData = [
    { title: "VPC (Virtual Private Cloud)", desc: "A private network space in the cloud where you can launch resources securely." },
    { title: "IAM", desc: "Identity and Access Management - Controls WHO can do WHAT in your cloud." },
    { title: "Bastion Host", desc: "A special purpose computer on a network specifically designed and configured to withstand attacks, used as a gateway to private networks." }
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
function renderRoadmap() {
    const container = document.getElementById('roadmap-container');
    container.innerHTML = roadmapData.map(item => {
        let borderColor = 'var(--border)';
        if (item.status === 'completed') borderColor = '#28a745'; // Green
        if (item.status === 'current') borderColor = 'var(--accent)'; // Blue
        if (item.status === 'in-progress') borderColor = '#ffc107'; // Yellow

        return `
        <div class="card" style="border-left: 4px solid ${borderColor}">
            <h3>Level ${item.level}: ${item.title} 
                <span class="tag">${item.status.toUpperCase()}</span>
            </h3>
            <p>${item.desc}</p>
        </div>
        `;
    }).join('');
}

function renderLogs(filter = 'all', searchQuery = '') {
    const container = document.getElementById('logs-container');
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
    
    // Trigger Prism to highlight newly injected code blocks (if loaded)
    if (window.Prism) {
        Prism.highlightAll();
    }
}

function renderSimpleCards(dataArray, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = dataArray.map(item => `
        <div class="card">
            <h3>${item.title}</h3>
            <div>${item.desc}</div>
            ${item.tech ? `<br><small><strong>Tech:</strong> ${item.tech}</small>` : ''}
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
