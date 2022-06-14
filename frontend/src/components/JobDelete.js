import { useContext, useEffect, useState } from "react"
import axios from "axios";
import { API } from "../api";
import { AuthContext } from "../contexts/AuthContext"
import { useNavigate, useParams } from "react-router-dom";


export function JobDelete() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [loadingJob, setLoadingJob] = useState(false)
    const [job, setJob] = useState(null)
    const { user: { token } } = useContext(AuthContext)
    const { id } = useParams()

    useEffect(() => {
        setLoadingJob(true)
        function fetchJob() {
            axios.get(API.jobs.retrieve(id))
            .then(res => {
                setJob(res.data)
            })
            .finally(() => {
                setLoadingJob(false)
            })
        }
        fetchJob()
        return () => null

    }, [id])

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        axios.delete(API.jobs.delete(id), {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        .then(res => {            
            navigate(`/`)
        })
        .finally(() => {
            setLoading(false)
        })
        
    }

    return (
        <div>
            {loading && "Loading..."}
            {loadingJob && "Fetching Job details..."}
            {job && (
                <form onSubmit={handleSubmit}>
                    <button className="ml-2 bg-blue-100 rounded-md shadow-sm px-3 py-2 hover:bg-red-500" type="submit">Delete</button>
                </form>
            )}
        </div>
    )
}