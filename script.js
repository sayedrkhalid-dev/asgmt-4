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

let selectedTab = "all";

const updateTab = (tab) => (selectedTab = tab);

const updateStatus = (id, status) => {
  const job = JOBS.find((job) => job.id === Number(id));
  if (job) job.status = status;
};

const deleteJob = (id) => {
  const index = JOBS.findIndex((job) => job.id === Number(id));
  if (index !== -1) JOBS.splice(index, 1);
};

const interviewJobs = () =>
  JOBS.filter((job) => job.status.toLowerCase() === "applied");

const rejectedJobs = () =>
  JOBS.filter((job) => job.status.toLowerCase() === "rejected");

const filteredJobs = (tab) => {
  return tab === "all"
    ? JOBS
    : tab === "interview"
      ? interviewJobs()
      : rejectedJobs();
};

const updateStats = () => {
  document.querySelector("#stat-total").textContent = JOBS.length;
  document.querySelector("#stat-interview").textContent =
    interviewJobs().length;
  document.querySelector("#stat-rejected").textContent = rejectedJobs().length;
};

const renderJobs = (jobs) => {
  const jobListElement = document.querySelector("#job-list");
  jobListElement.innerHTML = "";

  const currentJobs = filteredJobs(selectedTab);
  document.querySelector("#job-count").textContent = currentJobs.length;

  updateStats();

  if (!jobs || jobs.length === 0) {
    jobListElement.innerHTML = `
    <div
      class="flex flex-col justify-center items-center gap-2 h-[300px] bg-gray-50 rounded-lg p-4 shadow mt-2 relative"
    >
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
    </div>
    `;
  } else {
    for (const job of jobs) {
      const isApplied = job.status.toLowerCase() === "applied";
      const isRejected = job.status.toLowerCase() === "rejected";

      const jobElement = `
      <div
        data-id="${job.id}" data-status="${job.status}"
        class="job-card flex flex-col gap-4 bg-gray-50 rounded-lg p-4 shadow mt-2 relative">

        <div>
          <h3 class="text-lg font-semibold">${job.company}</h3>
          <h5 class="text-sm text-gray-600">${job.role}</h5>
        </div>

        <p class="text-xs text-gray-600">
          ${job.location} • ${job.type} • ${job.salary}
        </p>

        <div class="badge-${job.status.toLowerCase().replace(" ", "-")} w-fit text-xs font-semibold text-blue-800 bg-blue-100 px-4 py-2 rounded uppercase select-none">
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
          <i class="fa-regular fa-trash-can text-sm text-gray-500"></i>
        </div>
      </div>
    `;

      jobListElement.innerHTML += jobElement;
    }
  }
};

document.querySelector("#job-list").addEventListener("click", (e) => {
  const buttonElement = e.target.closest(".btn");
  const deleteElement = e.target.closest(".delete");

  if (buttonElement && !buttonElement.disabled) {
    const card = e.target.closest(".job-card");
    const id = card.dataset.id;

    switch (buttonElement.innerText.trim().toLowerCase()) {
      case "interview":
        updateStatus(id, "applied");
        break;
      case "rejected":
        updateStatus(id, "rejected");
        break;
    }
  } else if (deleteElement) {
    const card = e.target.closest(".job-card");
    const id = card.dataset.id;
    deleteJob(id);
  }

  renderJobs(filteredJobs(selectedTab));
});

document.querySelector("#tabs").addEventListener("click", (e) => {
  if (!e.target.classList.contains("tab")) return;

  const tabs = e.currentTarget.querySelectorAll(".tab");
  tabs.forEach((tab) => tab.classList.remove("tab-active"));
  e.target.classList.add("tab-active");

  updateTab(e.target.innerText.trim().toLowerCase());

  renderJobs(filteredJobs(selectedTab));
});

renderJobs(filteredJobs(selectedTab));
