import { useState } from "react"
import axios from "axios";
import { API } from "../api";
import { useParams } from "react-router-dom";

export function ConfirmEmail() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const { key } = useParams()

    function handleSubmit(e) {
        e.preventDefault()
        // console.log(values)
        setLoading(true)
        axios.post(API.auth.verifyEmail, { key })
        .then(res => {
            setSuccess(true)
        })
        .finally(() => {
            setLoading(false)
        })
        
    }

    return (
        <div>
            {loading && "Loading..."}
            {success && "Your email has been verified!"}
            <form onSubmit={handleSubmit}>
                    <button className="mt-3 bg-blue-100 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-blue-200" 
                        type="submit">
                        Confirm Email
                    </button>
            </form>
        </div>
    )
}