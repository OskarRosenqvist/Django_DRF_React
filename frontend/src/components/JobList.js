import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { API } from "../api"
import { AuthContext } from "../contexts/AuthContext"

function JobListItem({job}) {
  return (
    <div className="mt-5 border border-gray-200 px-3 py-3 shadow-sm rounded-sm">
      <div className="flex items-center justify-between">
      <NavLink to={`/jobs/${job.id}`}>
      <h3 className="text-2xl text-gray-800 font-semibold">
        {job.title}
        {job.sponsored && (
          <span className="ml-2 px-2 py-2 text-sm bg-yellow-200 text-red-500 shadow-md rounded-xl">Hot!</span>
        )}
        </h3>
      </NavLink>
      
      {job.company_logo && (
        <div className="mt-1 italic text-sm text-gray-500">
          <img src={job.company_logo} className="object-cover h-96 w-86 shadow-md rounded-xl px-2 py-2" alt=""/>
        </div>
      )}
      
      </div>
      
      <p className="mt-1 text-xl text-gray-500">Pris: ${job.salary}</p>
      <p className="mt-1 text-gray-500">Säljare: {job.company_name}</p>
      <p className="mt-1 italic text-sm text-gray-500">
         Mer info: 
        <a className="ml-3 text-blue-500 hover:text-blue-600" href={job.company_website}>{job.company_website}</a>
      </p>
      <p className="mt-1 text-gray-500">{job.location}</p>
      {job.remote && (
        <p className="mt-1 bold text-red-500">Såld!</p>
      )}
      <div className="mt-1 italic text-sm text-gray-500">{new Date(job.date_created).toUTCString()}</div>
      
      
    </div>
  )
}

export function JobList() {
    const [jobs, setJobs] = useState(null)
    const [sponsoredJobs, setSponsoredJobs] = useState(null)
    const { user } = useContext(AuthContext)
    let token = null
    if (user) {
      token = user.token
    }
 
    useEffect (() => {
      function fetchJobs() {
        if (token) {
          axios.get(API.jobs.list, {headers: {
            "Authorization": `Token ${token}`
          }})
            .then(res => {
              const sponsoredJobs = res.data.filter(job => job.sponsored)
              const restOfJobs = res.data.filter(job => !job.sponsored)
              setSponsoredJobs(sponsoredJobs)
              setJobs(restOfJobs)
            })
        }
        
      }
      fetchJobs()
      return () => null
    }, [token])
  
    
  
    return (
      <div>
        {!jobs && "Loading..."}
        {sponsoredJobs && sponsoredJobs.map(job =>{
          return ( 
            <JobListItem key={job.id} job={job} />
          )
        })}
        {jobs && jobs.map(job =>{
          return ( 
            <JobListItem key={job.id} job={job} />
          )
        })}
      </div>
    );
  }

