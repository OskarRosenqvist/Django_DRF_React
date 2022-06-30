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
                                <li className="text-gray-600">
                                <Link className="hover:text-blue-600" to="/">Alla Annonser</Link>
                                </li>
                                <li className="ml-4 text-gray-600">
                                <Link className="hover:text-blue-600" to="/about">Om den här sidan</Link>
                                </li>
                                <li className="ml-4 text-gray-600">
                                <Link className="hover:text-blue-600" to="/create-job">Lägg in Annons</Link>
                                </li>
                            </div>
                            <div className="flex items-center">
                                {user ? (
                                    <li className="px-3 text-gray-600">
                                    <button className="hover:text-blue-600" onClick={(handleSubmit)}>Logga ut</button>
                                    </li>
                                    ): 
                                    (
                                    <div className="flex items-center">
                                        <li className="px-3 text-gray-600">
                                            <Link className="hover:text-blue-600" to="/signup">Registrera Konto</Link>
                                        </li>
                                        <li className="px-3 text-gray-600">
                                            <Link className="hover:text-blue-600" to="/login">Logga In</Link>
                                        </li>
                                    </div>
                                )}
                            </div>
                            
                        </ul>
        </nav>
    )
}