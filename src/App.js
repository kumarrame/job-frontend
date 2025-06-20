import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [jobs, setJobs] = useState([]);

  const loadJobs = async () => {
    const res = await fetch("https://job-api-eghg.onrender.com/jobs");
    const data = await res.json();
    setJobs(data);
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const job = {
      title: form.title.value,
      company: form.company.value,
      location: form.location.value,
      type: form.type.value,
      description: form.description.value,
    };

    await fetch("https://job-api-eghg.onrender.com/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });

    form.reset();
    loadJobs();
  };

  return (
    <div className="App">
      <h1>🚀 Job Portal</h1>

      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" required />
        <input name="company" placeholder="Company" required />
        <input name="location" placeholder="Location" required />
        <input name="type" placeholder="Type (Full Time, Part Time)" required />
        <textarea name="description" placeholder="Description" required />
        <button type="submit">Post Job</button>
      </form>

      <h2>📃 Job Listings</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job._id}>
            <strong>{job.title}</strong> at {job.company} — {job.location} ({job.type})<br />
            <em>{job.description}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;