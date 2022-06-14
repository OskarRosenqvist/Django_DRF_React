import React, { useContext } from "react"
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { JobList } from "./components/JobList"
import { JobDetail } from "./components/JobDetail" 
import { JobCreate } from "./components/JobCreate"
import { AuthContext, AuthContextProvider } from './contexts/AuthContext' 
import { Login } from './components/Login' 
import { NavBar } from "./components/NavBar";
import { JobUpdate } from "./components/JobUpdate";
import { JobDelete } from "./components/JobDelete";
import { Signup } from "./components/Signup";
import { ConfirmEmail } from "./components/ConfirmEmail";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51KveESHPYsyPqSfN6nrF7JBG0mtZUUqBfS7rl3cTHdbycKU0WCScDvETmANX1vbZnjilmycDLz3UzDG0pG1KckUg00K3gsFSy5');

function PrivateRoute({children}) {
  const { user } = useContext(AuthContext)

  return user ? children : <Login/>
}


export default function App() {

  const options = {
    // passing the client secret obtained from the server
    clientSecret: '{{CLIENT_SECRET}}',
  };

  return (
    <Router>
      <AuthContextProvider>
      <Elements stripe={stripePromise} options={options}>
        <div>
          <NavBar />
          <div className="max-w-4xl mx-auto py-5 px-4 border-b border-gray-200">
          <Routes>
            <Route path="/about" element={<About/>} />
            <Route path="/users" element={<Users/>} />
            <Route path="/jobs/:id" element={<JobDetail/>} />
            <Route path="/jobs/:id/update" element={<PrivateRoute><JobUpdate/></PrivateRoute>} exact />
            <Route path="/jobs/:id/delete" element={<PrivateRoute><JobDelete/></PrivateRoute>} exact />
            <Route path="/create-job" element={<PrivateRoute><JobCreate/></PrivateRoute>} exact />
            <Route path="/login" element={<Login/>} exact />
            <Route path="/signup" element={<Signup/>} exact />
            <Route path="/accounts/confirm-email/:key" element={<ConfirmEmail/>} exact />
            <Route path="/" element={<JobList/>} exact />
          </Routes>
          </div>
        </div>
      </Elements>
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
