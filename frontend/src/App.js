import React from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { JobList } from "./components/JobList"
import { JobDetail } from "./components/JobDetail" 
import { JobCreate } from "./components/JobCreate"
import { AuthContextProvider } from './contexts/AuthContext' 
import { Login } from './components/Login' 
import { NavBar } from "./components/NavBar";



export default function App() {
  return (
    <Router>
      <AuthContextProvider>
        <div>
          <NavBar />
          <Routes>
            <Route path="/about" element={<About/>} />
            <Route path="/users" element={<Users/>} />
            <Route path="/jobs/:id" element={<JobDetail/>} />
            <Route path="/create-job" element={<JobCreate/>} exact />
            <Route path="/login" element={<Login/>} exact />
            <Route path="/" element={<JobList/>} exact />
          </Routes>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
