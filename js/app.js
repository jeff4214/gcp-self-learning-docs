// --- 1. Data Mockup ---

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
        proof: [
            "Used Ubuntu as main working environment",
            "Managed files and directories from CLI",
            "Practiced user and permission control",
            "Connected to remote systems via SSH"
        ],
        status: "Completed ✅",
        class: "status-completed"
    },
    {
        id: 1,
        title: "LEVEL 1 — Cloud Basics (Google Cloud)",
        goal: "Learn how to use cloud platforms and deploy basic infrastructure.",
        learned: [
            "Created virtual machines using Google Cloud",
            "Managed cloud resources using gcloud CLI",
            "Connected to cloud VMs using SSH",
            "Configured basic VM settings (machine type, OS, zone)"
        ],
        skills: ["gcloud compute instances", "gcloud compute ssh", "VM Lifecycle Management", "CLI-based operations"],
        proof: [
            "Created and configured VMs on Google Cloud",
            "Connected to instances using SSH",
            "Managed infrastructure using CLI instead of GUI",
            "Understood basic cloud architecture concepts"
        ],
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
    title: "LEVEL 3 — Automation with Terraform",
    isCurrent: true,
    goal: "Transitioning from manual clicks to Infrastructure as Code (IaC).",
    learned: [
        "HCL Syntax (Providers, Resources, Variables)",
        "Terraform State Management",
        "Automating VPCs and Firewall Rules"
    ],
    skills: ["Terraform CLI", "IaC Design", "GCP API Auth"],
    proof: [
        "Successfully installed Terraform & set up GPG Keyrings",
        "Authenticated via ADC (Application Default Credentials)",
        "Deployed 2-tier VM architecture via HCL"
    ],
    project: `
        <strong>🚀 Project: The Terraform Bastion</strong><br>
        Automated a secure gateway and private node environment. 
        <br><a href="#projects" class="nav-jump-btn btn-small">View Project Details</a>
    `,
    status: "In Progress 🔄",
    class: "status-in-progress"
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
        title: "🚀 Post 1: Initializing the Cloud Environment",
        tags: ["GCP", "CLI", "Foundations"],
        content: `
            <p><strong>Objective:</strong> Move away from the Web Console and manage Google Cloud entirely through the terminal.</p>
            <p>I installed the Google Cloud SDK on my Ubuntu machine and performed the initial authentication handshake. This is the foundation for all future automation.</p>
            <p><strong>Key Commands:</strong></p>
            <ul>
                <li><code>gcloud init</code> - To link my local terminal to my GCP project.</li>
                <li><code>gcloud auth login</code> - To obtain access credentials via OAuth.</li>
                <li><code>gcloud config set compute/region europe-west1</code> - Setting my default "home" for resources.</li>
            </ul>
        `
    },
    {
        title: "🛡️ Post 2: Building the 'Reza-Jeff' Bastion Architecture",
        tags: ["Networking", "Security", "SSH"],
        content: `
            <p><strong>The Experiment:</strong> Can I access a VM that has no public internet access?</p>
            <p>I created two VMs. <strong>'Reza-vm'</strong> has a Public IP (the gateway), while <strong>'Jeff-vm'</strong> only has a Private IP. I configured firewall rules to block all traffic to Jeff-vm except from Reza-vm.</p>
            <p><strong>The Breakthrough:</strong> I learned that SSH isn't just for logging in; it's a secure tunnel. By using <code>ssh-agent</code>, I can hop through the bastion without storing my private keys on the public server.</p>
            <p><strong>Execution:</strong></p>
        `,
        snippet: `# Creating the private instance without an external IP
gcloud compute instances create jeff-linux-vm \\
    --network-interface=subnet=default,no-address \\
    --zone=europe-west1-b`
    },
    {
        title: "🐛 Post 3: Solving the 'Permission Denied' SSH Puzzle",
        tags: ["Troubleshooting", "Linux"],
        content: `
            <p><strong>The Problem:</strong> When trying to jump from Reza to Jeff, I kept getting <code>Permission denied (publickey)</code>. </p>
            <p><strong>Investigation:</strong> I used <code>ssh -vvv</code> to see the debug logs. I realized the public VM didn't know which private key to present to the internal VM.</p>
            <p><strong>The Fix:</strong> I implemented a local <code>~/.ssh/config</code> file on my laptop to automate the "ProxyJump" command. This made the security invisible to my daily workflow.</p>
        `,
        snippet: `# My final SSH Config solution
Host jeff-private
    HostName 10.128.0.3
    User reza
    ProxyJump reza-public
    IdentityFile ~/.ssh/google_compute_engine`
    },
    {
        title: "⚙️ Post 4: The Terraform Transition (Level 3)",
        tags: ["Terraform", "IaC", "Automation"],
        content: `
            <p><strong>The Experiment:</strong> Replicate my entire manual networking setup using a single file.</p>
            <p>I am currently translating my firewall rules and VM definitions into HashiCorp Configuration Language (HCL). This is a game changer because I can now 'destroy' and 'recreate' my entire lab in seconds.</p>
            <p><strong>Key Workflow:</strong></p>
            <ul>
                <li><code>terraform init</code> - Downloads the Google Cloud provider.</li>
                <li><code>terraform plan</code> - Shows me exactly what GCP will build before I pay for it.</li>
                <li><code>terraform apply</code> - The magic moment where the code becomes real infrastructure.</li>
            </ul>
        `,
        snippet: `// Part of my main.tf for the Bastion Host
resource "google_compute_instance" "bastion" {
  name         = "reza-bastion"
  machine_type = "e2-micro"
  zone         = "europe-west1-b"

  boot_disk {
    initialize_params { image = "ubuntu-os-cloud/ubuntu-2204-lts" }
  }

  network_interface { network = "default" }
}`
    },
    {
    title: "🛠️ Log 5: Installing Terraform & Overcoming 'apt-key' Deprecation",
    tags: ["Terraform", "Linux", "Troubleshooting"],
    content: `
        <p><strong>The Mission:</strong> Shift from manual <code>gcloud</code> commands to Infrastructure as Code (IaC) by installing Terraform on my local Ubuntu machine.</p>
        
        <p><strong>The Challenge:</strong> Standard tutorials often use <code>apt-key</code>, but on modern systems (like Ubuntu 22.04+), this command is deprecated and can fail with <code>command not found</code>.</p>
        
        <p><strong>The Modern Fix:</strong> Instead of the old method, I manually created a trusted keyring. This is a more secure way to manage third-party repository signatures.</p>
        
        <p><strong>Step-by-Step Execution:</strong></p>
        <ol>
            <li>Create the keyring directory: <code>sudo mkdir -p /usr/share/keyrings</code></li>
            <li>Download and dearmor the GPG key: <code>curl -fsSL ... | sudo gpg --dearmor</code></li>
            <li>Add the signed repository to the sources list.</li>
            <li>Install the package via <code>apt</code>.</li>
        </ol>
    `,
    snippet: `# How I successfully installed Terraform
sudo apt update
sudo apt install -y gnupg software-properties-common curl

# The Modern Keyring Method
curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg

echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list

sudo apt update && sudo apt install terraform`
},
    {
    title: "🚀 Log 6: My First Terraform Deployment & The ADC Trap",
    tags: ["Terraform", "GCP", "Authentication", "Troubleshooting"],
    content: `
        <p><strong>The Mission:</strong> Deploy a Google Compute Instance purely through code using Terraform.</p>
        
        <p><strong>The "Gotcha":</strong> Even with <code>gcloud auth login</code> active, Terraform failed with a 'No credentials loaded' error. </p>
        
        <p><strong>The Discovery:</strong> I learned that the gcloud CLI and Terraform use different authentication paths. Terraform requires <strong>Application Default Credentials (ADC)</strong> to communicate with the Google Cloud APIs.</p>
        
        <p><strong>The Fix:</strong> Running <code>gcloud auth application-default login</code> creates a local JSON file that Terraform can use to prove its identity to GCP.</p>
        
        <p><strong>Workflow Checklist:</strong></p>
        <ul>
            <li><code>terraform init</code>: Prepare the working directory.</li>
            <li><code>terraform plan</code>: Review the execution strategy.</li>
            <li><code>terraform apply</code>: Turn code into real cloud resources.</li>
            <li><code>terraform destroy</code>: Safely decommission the infrastructure.</li>
        </ul>
    `,
    snippet: `# The command that fixed my 'No Credentials' error
gcloud auth application-default login

# Verifying the deployment afterward
gcloud compute instances list`
},
    {
    title: "🧠 Log 7: Deep Dive into Terraform Concepts & Lifecycle",
    tags: ["Terraform", "IaC", "Cloud-Architecture"],
    content: `
        <p><strong>The Mission:</strong> Move beyond basic installation and understand the core "DNA" of Terraform.</p>
        
        <p><strong>What I Learned:</strong> Infrastructure as Code (IaC) isn't just a script; it's a <em>declarative</em> blueprint. I don't tell GCP 'Create a VM'; I tell Terraform 'The desired state is a VM,' and Terraform makes it happen.</p>

        <p><strong>⚙️ Core Architecture Concepts:</strong></p>
        <ul>
            <li><strong>Provider:</strong> The bridge. It tells Terraform how to talk to the Google Cloud API.</li>
            <li><strong>Resource:</strong> The building blocks. This defines the specific VM, Network, or Firewall rule.</li>
            <li><strong>State File:</strong> The "Memory." Terraform keeps a <code>.tfstate</code> file to remember exactly what it built so it doesn't create duplicates.</li>
        </ul>

        <p><strong>🔄 The Workflow Lifecycle:</strong></p>
        <ol>
            <li><code>terraform plan</code>: The "Dry Run." It shows a preview of changes without actually touching the cloud.</li>
            <li><code>terraform apply</code>: The "Execution." Code becomes real infrastructure.</li>
            <li><code>terraform destroy</code>: The "Cleanup." Safely removes everything to avoid unexpected costs.</li>
        </ol>
    `,
    snippet: `// Example of the "Desired State" for my Bastion project
resource "google_compute_firewall" "allow_ssh" {
  name    = "allow-ssh-bastion"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["22"]
  }

  // Only allow my specific IP to access the gateway
  source_ranges = ["YOUR_EXTERNAL_IP/32"]
  target_tags   = ["bastion"]
}`
},

];

const projectsData = [
    {
        title: "🛡️ Secure Bastion Host Architecture",
        tech: "Google Cloud (GCP), Linux, Networking",
        desc: `
            <p>Designed and deployed a multi-tier network architecture to isolate private resources from the public internet.</p>
            <ul class="project-features">
                <li><strong>Network Isolation:</strong> Private VM has 0% external exposure (no Public IP).</li>
                <li><strong>Gateway Access:</strong> All management traffic routed through a hardened Bastion Host.</li>
                <li><strong>Security Rules:</strong> Custom firewall rules allowing SSH only from specific internal tags.</li>
            </ul>
            <div class="arch-flow">
                <code>Laptop ➔ Public VM (Bastion) ➔ Private VM (Secure)</code>
            </div>
        `,
        link: "#" // Link to a GitHub repo or a specific Log post
    },
    {
        title: "⚙️ Infrastructure as Code: Cloud Automation",
        tech: "Terraform, HCL, GCP API",
        desc: `
            <p>Automating the manual Bastion setup using declarative code. This ensures 100% repeatable and version-controlled infrastructure.</p>
            <ul class="project-features">
                <li><strong>Provider Config:</strong> Secure authentication with Google Cloud Service Accounts.</li>
                <li><strong>Resource Management:</strong> Defining VPCs, Subnets, and Instances in <code>.tf</code> files.</li>
                <li><strong>State Management:</strong> Tracking cloud changes via Terraform State.</li>
            </ul>
            <p><em>Status: Currently migrating manual rules to automated HCL scripts.</em></p>
        `,
        link: "#"
    },
    {
    title: "⚙️ Infrastructure as Code: Cloud Automation",
    tech: "Terraform, HCL, GCP API",
    desc: `
        <p>Automated the deployment of a hardened Linux environment using HashiCorp Configuration Language (HCL).</p>
        <ul class="project-features">
            <li><strong>Provider Config:</strong> Securely linked Terraform to GCP via Application Default Credentials.</li>
            <li><strong>Declarative VMs:</strong> Defined machine types and OS images via code variables.</li>
            <li><strong>Resource Lifecycle:</strong> Mastered the Init ➔ Plan ➔ Apply ➔ Destroy cycle.</li>
        </ul>
        <p><em>Status: ✅ Basic automation successful. Moving to multi-VM networking.</em></p>
    `,
    link: "#" 
},
    {
    title: "🛡️ Automated Secure Bastion Architecture",
    tech: "Terraform • GCP • Linux Security",
    desc: `
        <p>A fully automated "Jump Box" environment deployed via Infrastructure as Code (IaC). This project eliminates manual configuration errors by codifying networking and security policies.</p>
        
        <ul class="project-features">
            <li><strong>Network Isolation:</strong> Private subnets with zero external IP exposure for internal nodes.</li>
            <li><strong>Hardened Access:</strong> SSH traffic restricted via firewall tags, allowing entry only through a verified Bastion host.</li>
            <li><strong>Reproducibility:</strong> The entire stack (VPC, Firewall, VMs) can be destroyed and recreated in under 2 minutes.</li>
        </ul>
    `,
    link: "#logs" // This points back to your Log 7 Lab Report!
    }
];

const conceptsData = [
    {
        title: "🌐 VPC (Virtual Private Cloud)",
        tech: "Cloud Networking",
        desc: `
            <p><strong>The Concept:</strong> Your own isolated, private section of the Google Cloud network.</p>
            <p>Within a VPC, you define your own IP address ranges, create subnets, and configure route tables and network gateways.</p>
            <div class="arch-flow">
                <code>Internet ➔ Cloud Router ➔ VPC ➔ Subnets</code>
            </div>
            <ul class="project-features">
                <li><strong>Segmentation:</strong> Keeping Web servers separate from Database servers.</li>
                <li><strong>Control:</strong> You decide exactly which traffic enters and leaves.</li>
            </ul>
        `
    },
    {
        title: "🔑 IAM (Identity & Access Management)",
        tech: "Cloud Security",
        desc: `
            <p><strong>The Concept:</strong> Who can do what, on which resource?</p>
            <p>IAM allows you to grant granular access to specific Google Cloud resources and prevents adventurous "all-access" permissions that cause security leaks.</p>
            <div class="arch-flow">
                <code>Principal (User/SA) ➔ Role (Permissions) ➔ Resource (VM/Bucket)</code>
            </div>
            <ul class="project-features">
                <li><strong>Least Privilege:</strong> Only give the minimum access needed for a job.</li>
                <li><strong>Service Accounts:</strong> Allowing Terraform to talk to GCP securely.</li>
            </ul>
        `
    },
    {
        title: "🛡️ Bastion Host (Jump Box)",
        tech: "Network Security",
        desc: `
            <p><strong>The Concept:</strong> A hardened "gatekeeper" server used to access a private network.</p>
            <p>Instead of exposing your database or private app to the whole internet, you log into the Bastion Host first, then "jump" to the internal resource.</p>
            <div class="arch-flow">
                <code>Admin ➔ SSH ➔ Bastion (Public) ➔ SSH ➔ Internal VM (Private)</code>
            </div>
            <ul class="project-features">
                <li><strong>Reduced Attack Surface:</strong> Only one point of entry to defend.</li>
                <li><strong>Audit Trails:</strong> Centralized logging of who accessed the network.</li>
            </ul>
        `
    },
    {
    title: "🔐 GPG Keyrings & Chain of Trust",
    tech: "Linux Security / Apt",
    desc: `
        <p><strong>The Concept:</strong> How do you know the 'Terraform' package you just downloaded actually came from HashiCorp and wasn't modified by a hacker?</p>
        
        <p><strong>The Mechanism:</strong> Linux uses GPG (GNU Privacy Guard) keys. Think of it as a digital wax seal on a letter. 
        The <code>.gpg</code> file you downloaded is the public key that verifies the signature on the software packages.</p>
        
        <div class="arch-flow">
            <code>Developer Sign ➔ GPG Keyring ➔ Package Manager Verify</code>
        </div>

        <ul class="project-features">
            <li><strong>Security:</strong> Prevents "Man-in-the-Middle" attacks during installation.</li>
            <li><strong>Modern Standards:</strong> Moving from <code>apt-key</code> (global trust) to <code>signed-by</code> (specific trust) makes the system more secure.</li>
        </ul>
    `,
    link: "https://ubuntu.com/server/docs/security-software-repositories" // Link to official Ubuntu security docs
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
                
                <p><strong>📚 What I Built / Practiced:</strong></p>
                <ul class="roadmap-list">
                    ${lvl.learned.map(item => `<li>${item}</li>`).join('')}
                </ul>

                <p><strong>🛠️ Key Skills:</strong></p>
                <div class="skills-list">
                    ${lvl.skills.map(s => `<span class="skill-tag">${s}</span>`).join('')}
                </div>

                ${lvl.proof ? `
                    <p style="margin-top:15px;"><strong>💡 Proof of Work:</strong></p>
                    <ul class="proof-list" style="list-style: none; padding-left: 5px;">
                        ${lvl.proof.map(p => `<li style="color: var(--text); opacity: 0.9;">✔ ${p}</li>`).join('')}
                    </ul>
                ` : ''}

                ${lvl.project ? `<div class="project-box" style="margin-top:15px; padding:10px; background: rgba(0,0,0,0.2); border-radius:8px;">${lvl.project}</div>` : ''}
                
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
    if (!container) return;

    container.innerHTML = dataArray.map(item => `
        <div class="card project-card">
            <div class="project-header">
                <h3>${item.title}</h3>
                <span class="tech-badge">${item.tech}</span>
            </div>
            <div class="project-body">${item.desc}</div>
            <div class="project-footer">
                <a href="${item.link}" class="btn-small">View Documentation</a>
            </div>
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
