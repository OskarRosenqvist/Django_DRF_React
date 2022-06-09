import { useContext, useState } from "react"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from "axios";
import { API } from "../api";
import { AuthContext } from "../contexts/AuthContext"


export function JobCreate() {
    const [loading, setLoading] = useState(false)
    const { user: { token } } = useContext(AuthContext)
    
    function handleSubmit(values) {
        console.log(values)
        setLoading(true)
        axios.post(API.jobs.create, values, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
        .then(res => {
            console.log(res.data)
        })
        .finally(() => {
            setLoading(false)
        })
        
    }

    return (
        <div>
            {loading && "Loading..."}
            <Formik
                initialValues={{
                    title: '',
                    company_name: '',
                    company_website: '',
                    location: '',
                    salary: 0,
                }}
                onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                    <Form>
                        <label htmlFor="title">title</label>
                        <Field id="title" name="title" placeholder="title" />
                        <ErrorMessage name="title" />
                        <label htmlFor="companyName">companyName</label>
                        <Field id="companyName" name="company_name" placeholder="companyName" />
                        <ErrorMessage name="company_name" />
                        <label htmlFor="companyWebsite">companyWebsite</label>
                        <Field id="companyWebsite" name="company_website" placeholder="companyWebsite" />
                        <ErrorMessage name="company_website" />
                        <label htmlFor="location">location</label>
                        <Field id="location" name="location" placeholder="location" />
                        <ErrorMessage name="location" />
                        <label htmlFor="salary">salary</label>
                        <Field type="number" id="salary" name="salary"  />
                        <ErrorMessage name="salary" />
                        
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}