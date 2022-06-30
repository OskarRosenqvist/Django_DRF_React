import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import { API } from "../api"
import { AuthContext } from "../contexts/AuthContext"

export function JobDetail() {
    const [job, setJob] = useState(null)
    const { id } = useParams()
    const { user } = useContext(AuthContext)
    let token = null
    if (user) {
      token = user.token
    }

    useEffect(() => {
        function fetchJob() {
            if (token) {
                axios.get(API.jobs.retrieve(id), {headers: {
                    "Authorization": `Token ${token}`
                }})
                .then(res => {
                    setJob(res.data)
    
                })
            }
            
        }
        fetchJob()

    }, [id, token])

    return (
        <div>
            {!job && "Loading..."}
            {job && (
                <div>
                    <div className="border border-gray-200 px-3 py-3 shadow-sm rounded-sm">
                    <div className="flex items-center justify-between">
                    <NavLink to={`/jobs/${job.id}`}>
                    <h3 className="text-2xl text-gray-800 font-semibold">{job.title}</h3>
                    </NavLink>
                    {/* <div className="mt-1 italic text-sm text-gray-500">{new Date(job.date_created).toUTCString()}</div> */}
                    </div>
                    {job.company_logo && (
                    <div className="mt-1 italic text-sm text-gray-500">
                    <img src={job.company_logo} className="px-2 py-2" alt=""/>
                    </div>
                    )}
                    
                    <p className="mt-1 text-xl text-gray-500">Pris: ${job.salary}</p>
                    <p className="mt-1 text-gray-500">Säljare: {job.company_name}</p>
                    <p className="mt-1 italic text-sm text-gray-500">
                        Länk till mer information: 
                        <a className="ml-3 text-blue-500 hover:text-blue-600" href={job.company_website}>{job.company_website}</a>
                    </p>
                    <p className="mt-1 text-gray-500">{job.location}</p>
                    {job.remote && (
                        <p className="mt-1 bold text-gray-500">Såld!</p>
                    )}
                    
                    
                    </div>
                    {job.is_owner && (
                    <div className="mt-5 flex items-center">
                    <NavLink className="bg-blue-100 rounded-md shadow-sm px-3 py-2 hover:bg-blue-500" to={`/jobs/${id}/update`}>
                        Updatera
                    </NavLink>
                    <NavLink className="ml-2 bg-blue-100 rounded-md shadow-sm px-3 py-2 hover:bg-red-500" to={`/jobs/${id}/delete`}>
                        Ta bort
                    </NavLink>
                    
                    {!job.sponsored && (
                        <NavLink className="ml-2 bg-blue-100 rounded-md shadow-sm px-3 py-2 hover:bg-yellow-500" to={`/jobs/${id}/sponsor`}>
                            Betala för att synas överst!
                        </NavLink>
                    )}
                    
                    </div>
                    )}
                </div>
                
            )}
        </div>
    )
}