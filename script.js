const JOBS = [
  {
    id: 1,
    company: "Mobile First Corp.",
    role: "React Native Developer",
    location: "Remote",
    type: "Full time",
    salary: "$130,000 – $175,000",
    description:
      "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
    status: "not applied",
  },
  {
    id: 2,
    company: "CloudStack Inc.",
    role: "Senior Backend Engineer",
    location: "New York, NY",
    type: "Full time",
    salary: "$140,000 – $190,000",
    description:
      "Design and scale distributed systems powering our SaaS platform. Experience with Go or Rust preferred.",
    status: "not applied",
  },
  {
    id: 3,
    company: "PixelForge Studio",
    role: "UI/UX Designer",
    location: "Remote",
    type: "Contract",
    salary: "$80 – $110 / hr",
    description:
      "Craft delightful user experiences for B2C products. You'll own end-to-end design from research to high-fidelity prototypes.",
    status: "not applied",
  },
  {
    id: 4,
    company: "DataLens Analytics",
    role: "Data Engineer",
    location: "Austin, TX",
    type: "Full time",
    salary: "$120,000 – $155,000",
    description:
      "Build and maintain scalable data pipelines using Apache Spark and dbt. Help teams turn raw data into actionable insights.",
    status: "not applied",
  },
  {
    id: 5,
    company: "Veritas AI",
    role: "Machine Learning Engineer",
    location: "San Francisco, CA",
    type: "Full time",
    salary: "$160,000 – $220,000",
    description:
      "Train and deploy large-scale ML models for NLP and computer vision use cases. PhD or equivalent experience preferred.",
    status: "not applied",
  },
  {
    id: 6,
    company: "Nimbus Systems",
    role: "DevOps / Platform Engineer",
    location: "Remote",
    type: "Full time",
    salary: "$125,000 – $160,000",
    description:
      "Own our Kubernetes infrastructure and CI/CD pipelines. Drive reliability, observability, and developer productivity.",
    status: "not applied",
  },
  {
    id: 7,
    company: "Greenleaf Fintech",
    role: "Full Stack Developer",
    location: "Chicago, IL",
    type: "Hybrid",
    salary: "$110,000 – $145,000",
    description:
      "Build features across our React frontend and Node.js backend for a fast-growing personal finance app.",
    status: "not applied",
  },
  {
    id: 8,
    company: "Skyward Robotics",
    role: "Embedded Systems Engineer",
    location: "Boston, MA",
    type: "Full time",
    salary: "$135,000 – $170,000",
    description:
      "Develop real-time firmware for autonomous drones. Work closely with hardware and controls teams to ship reliable systems.",
    status: "not applied",
  },
];

const TAB = {all: true, interview: false, rejected: false};
const STATUS = {interview: 'applied', rejected: 'rejected', pending: 'not applied'};

const clearTab = () => Object.keys(TAB).forEach(key => TAB[key] = false);;
const updateTab = (tab) => TAB[tab] = true;

const updateStatus = (id, status) => {
  const job = JOBS.find((job) => job.id === Number(id));
  if (job) job.status = status;
};

const removeJob = (id) => {
  const index = JOBS.findIndex((job) => job.id === Number(id));
  if (index !== -1) JOBS.splice(index, 1);
};

const filterJobs = (status) => status ? JOBS.filter((job => job.status === status)) : JOBS;

const render = () => {
  const JOBS = {
    all: filterJobs(null),
    interview: filterJobs(STATUS.interview),
    rejected: filterJobs(STATUS.rejected)
  }

  const renderAbleJobs = JOBS[Object.keys(JOBS).find(key => TAB[key])];

  const jobList = () => {
    if (!renderAbleJobs || renderAbleJobs.length === 0) {
      return [`<div
        class="flex flex-col justify-center items-center gap-2 h-[300px] bg-gray-50 rounded-lg p-4 shadow mt-2 relative">
        
        <div class="w-[100px] aspect-square">
          <img
            class="w-full aspect-square"
            src="./assets/jobs.png"
            alt="Job Icon"
          />
        </div>

        <h2 class="text-xl font-semibold">No jobs available</h2>
        <p class="text-sm text-gray-600">
          Check back soon for new job opportunities
        </p>
      </div>`];
    } else {
      const list = [];

      for(const job of renderAbleJobs) {
        const isApplied = job.status.toLowerCase() === "applied";
        const isRejected = job.status.toLowerCase() === "rejected";

        const item = `<div
        data-id="${job.id}" data-status="${job.status}"
        class="job-card flex flex-col gap-4 bg-gray-50 rounded-lg p-4 shadow mt-2 relative">

        <div>
          <h3 class="text-lg font-semibold">${job.company}</h3>
          <h5 class="text-sm text-gray-600">${job.role}</h5>
        </div>

        <p class="text-xs text-gray-600">
          ${job.location} • ${job.type} • ${job.salary}
        </p>

        <div class="badge-${job.status.toLowerCase()} w-fit text-xs font-semibold text-blue-800 bg-blue-100 px-4 py-2 rounded uppercase select-none">
          ${job.status}
        </div>

        <p class="text-sm text-gray-700">
          ${job.description}
        </p>

        <div class="btns flex gap-2">
          <button class="btn ${isApplied ? "btn-disabled" : ""} text-green-600 border border-green-600 px-4 py-2 rounded cursor-pointer transition-all hover:bg-green-600 hover:text-gray-50" ${isApplied ? "disabled" : ""}>
            Interview
          </button>
          <button class="btn ${isRejected ? "btn-disabled" : ""} text-red-600 border border-red-600 px-4 py-2 rounded cursor-pointer transition-all hover:bg-red-600 hover:text-gray-50" ${isRejected ? "disabled" : ""}>
            Rejected
          </button>
        </div>

        <div
          class="delete absolute top-4 right-4 w-10 aspect-square border border-gray-300 rounded-full flex justify-center items-center cursor-pointer hover:bg-amber-200"
        >
          <i class="icon fa-regular fa-trash-can text-sm text-gray-500"></i>
        </div>
        </div>`

        list.push(item);

      }

      return list;
    }
  };

  document.getElementById("app").innerHTML = 
    `<div class="flex flex-col gap-4">
        <h1 class="text-2xl font-semibold">Job Application Tracker</h1>

        <!-- Tracker Cards -->
        <div class="grid grid-cols-3 gap-4">
          <div class="flex flex-col bg-gray-50 p-4 rounded-lg shadow">
            <span class="text-xs font-semibold"> Total Jobs </span>
            <span class="text-xl font-bold">${JOBS.all.length}</span>
          </div>

          <div class="flex flex-col bg-gray-50 p-4 rounded-lg shadow">
            <span class="text-xs font-semibold"> Interview </span>
            <span class="text-green-500 text-xl font-bold">${JOBS.interview.length}</span
            >
          </div>

          <div class="flex flex-col bg-gray-50 p-4 rounded-lg shadow">
            <span class="text-xs font-semibold"> Rejected </span>
            <span class="text-red-500 text-xl font-bold"
              >${JOBS.rejected.length}</span
            >
          </div>
        </div>
      </div>

      <hr class="border-t border-gray-300" />

      <!-- Available Jobs -->
      <div class="flex flex-col gap-2 min-h-0 flex-1">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold">Available Jobs</h2>
          <div class="text-gray-600 text-sm font-semibold">
            ${JOBS.all.length} Jobs
          </div>
        </div>

        <!-- Tabs -->
        <div id="tabs" class="flex gap-2 select-none">
          <div
            class="tab ${TAB.all ? 'tab-active' : ''} text-xs bg-gray-50 font-semibold px-4 py-2 rounded-lg shadow cursor-pointer transition-all"
          >
            All
          </div>
          <div
            class="tab ${TAB.interview ? 'tab-active' : ''} text-xs bg-gray-50 font-semibold px-4 py-2 rounded-lg shadow cursor-pointer transition-all"
          >
            Interview
          </div>
          <div
            class="tab ${TAB.rejected ? 'tab-active' : ''} text-xs bg-gray-50 font-semibold px-4 py-2 rounded-lg shadow cursor-pointer transition-all"
          >
            Rejected
          </div>
        </div>

        <!-- Jobs -->
        <div class="flex flex-col">
          <!-- Job lists -->
          <div id="job-list">${jobList().join('')}</div>
        </div>
      </div>
    `
};

document.addEventListener("click", (e) => {

  // Tab button
  const tab = e.target.closest(".tab");
  if (tab) {
    const tabText = tab.innerText.toLowerCase();
    clearTab();
    updateTab(tabText);
    render();
    return;
  }

  // Job button click
  const card = e.target.closest(".job-card");
  if (!card) return;

  const id = card.dataset.id;

  const btn = e.target.closest(".btn");
  if (btn) {
    const action = btn.innerText.toLowerCase();

    if (action === "interview") updateStatus(id, "applied");
    if (action === "rejected") updateStatus(id, "rejected");

    render();
    return;
  }

  // Delete button click
  const del = e.target.closest(".delete");
  if (del) {
    removeJob(id);
    render();
  }

});

render();
