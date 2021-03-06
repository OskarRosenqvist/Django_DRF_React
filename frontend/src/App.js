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
// import { Signup } from "./components/Signup";
import { ConfirmEmail } from "./components/ConfirmEmail";
import { Payment } from "./components/Payment";
import { Success } from "./components/Success";



function PrivateRoute({children}) {
  const { user } = useContext(AuthContext)

  return user ? children : <Login/>
}

export default function App() {


  return (
    <Router>
      <AuthContextProvider>
        <div>
          <NavBar />
          <div className="max-w-4xl mx-auto py-5 px-4 border-b border-gray-200">
          <Routes>
            <Route path="/about" element={<About/>} />
            <Route path="/sponsor/success" element={<Success/>} />
            <Route path="/jobs/:id" element={<JobDetail/>} />
            <Route path="/jobs/:id/sponsor" element={<Payment/>} />
            <Route path="/jobs/:id/update" element={<PrivateRoute><JobUpdate/></PrivateRoute>} exact />
            <Route path="/jobs/:id/delete" element={<PrivateRoute><JobDelete/></PrivateRoute>} exact />
            <Route path="/create-job" element={<PrivateRoute><JobCreate/></PrivateRoute>} exact />
            <Route path="/login" element={<Login/>} exact />
            <Route path="/signup" element={<Login/>} exact />
            <Route path="/accounts/confirm-email/:key" element={<ConfirmEmail/>} exact />
            <Route path="/" element={<PrivateRoute><JobList/></PrivateRoute>} exact />
          </Routes>
          </div>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

function About() {
  return <h2>Den h??r sidan existerar mest i syfte att anv??ndas som digitalt CV f??r Oskar Rosenqvist 
    och ??r ej seri??st menad att anv??ndas som en Blocket-kopia. Stripe betalningarna som g??rs f??r 
    att sponsra annonserna utf??rs endast i en testmilj?? med Stripes test-kort och leder 
    s??ledes inte till n??gra int??kter. <br></br><br></br>Backend ??r byggd i Django med Rest Framework api till en React Frontend. Servern k??rs p?? Digital Ocean med Docker-liknande containers f??r django, postgres databas och redis. Statiska filer ligger p?? AWS S3. Frontend k??rs p?? Netlify. CI/CD sker automatiskt vid push till GitHub. Jag g??r inga anspr??k p?? att vara n??gon Ernst Billgren s?? frontenden ??r mestadels funktionell.</h2>;
}

