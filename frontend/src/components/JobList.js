import axios from "axios"
import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { API } from "../api"

function JobListItem({job}) {
  return (
    <div className="border border-gray-200 px-3 py-3 shadow-sm rounded-sm">
      <div className="flex items-center justify-between">
      <NavLink to={`/jobs/${job.id}`}>
      <h3 className="text-2xl text-gray-800 font-semibold">{job.title}</h3>
      </NavLink>
      <div className="mt-1 italic text-sm text-gray-500">{new Date(job.date_created).toUTCString()}</div>
      </div>
      
      <p className="mt-1 text-xl text-gray-500">${job.salary}</p>
      <p className="mt-1 text-gray-500">{job.company_name}</p>
      <p className="mt-1 italic text-sm text-gray-500">
         Company Website: 
        <a className="ml-3 text-blue-500 hover:text-blue-600" href={job.company_website}>{job.company_website}</a>
      </p>
      <p className="mt-1 text-gray-500">{job.location}</p>
      {job.remote && (
        <p className="mt-1 text-gray-500">Remote work accepted.</p>
      )}
      
      
    </div>
  )
}

export function JobList() {
    const [jobs, setJobs] = useState(null)
    useEffect (() => {
      function fetchJobs() {
        axios.get(API.jobs.list)
        .then(res => {
          console.log(res.data)
          setJobs(res.data)
        })
      }
      fetchJobs()
    }, [])
  
    
  
    return (
      <div>
        {!jobs && "Loading..."}
        {jobs && jobs.map(job =>{
          return ( 
            <JobListItem key={job.id} job={job} />
          )
        })}
      </div>
    );
  }

