import axios from "axios"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { API } from "../api"
import { AuthContext } from "../contexts/AuthContext"

export function NavBar() {
    const { user, logout } = useContext(AuthContext)
    const navigate = useNavigate()
    
    function handleSubmit() {
        axios.post(API.auth.logout)
        .then(res => {
            logout()
            navigate('/login')
        })
        
    }

    return (
        
        <nav className="max-w-4xl mx-auto py-5 border-b border-gray-200">
                        <img src="https://djangodata.s3.amazonaws.com/static/plocket.png" alt=""/>
                        <ul className="flex items-center justify-between py-3 px-2 bg-blue-200 shadow-md rounded-md">
                            <div className="flex items-center">
                                <li className="bold text-gray-600">
                                <Link className="bg-blue-600 text-white px-3 py-2 rounded-full shadow-md text-sm font-medium hover:bg-orange-600 focus:bg-orange-600" to="/">Start</Link>
                                </li>
                                <li className="bold ml-6 text-gray-600">
                                <Link className="bg-blue-200 text-blue-600 px-3 py-2 rounded-md shadow-md text-sm font-medium hover:bg-blue-300 focus:bg-orange-600 focus:text-white" to="/create-job">Annonsera</Link>
                                </li>
                                <li className="bold ml-6 text-gray-600">
                                <Link className="bg-blue-200 text-blue-600 px-3 py-2 rounded-md shadow-md text-sm font-medium hover:bg-blue-300 focus:bg-orange-600 focus:text-white" to="/about">Info</Link>
                                </li>
                            </div>
                            <div className="flex items-center">
                                {user ? (
                                    <li className="bold px-3 text-gray-600">
                                    <button className="bg-blue-400 text-white px-3 py-2 rounded-md shadow-md text-sm font-medium hover:text-blue-200" onClick={(handleSubmit)}>Logout</button>
                                    </li>
                                    ): 
                                    (
                                    <div className="flex items-center">
                                        <li className="bold px-3 text-gray-600">
                                            <Link className="bg-blue-400 text-white px-3 py-2 rounded-md shadow-md text-sm font-medium hover:text-blue-200" to="/signup">Register</Link>
                                        </li>
                                        <li className="bold px-3 text-gray-600">
                                            <Link className="bg-blue-400 text-white px-3 py-2 rounded-md shadow-md text-sm font-medium hover:text-blue-200" to="/login">Login</Link>
                                        </li>
                                    </div>
                                )}
                            </div>
                            
                        </ul>
        </nav>
    )
}