import { useState } from "react"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from "axios";
import { API } from "../api";
import { authService } from "../services/authentication"


export function Login() {
    const [loading, setLoading] = useState(false)
    
    
    function handleSubmit(values) {
        // console.log(values)
        setLoading(true)
        axios.post(API.auth.login, values)
        .then(res => {
            // console.log(res.data)
            authService.login(res.data.token)
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
                    username: '',
                    password: '',
                }}
                onSubmit={handleSubmit}>
                {({ errors, touched }) => (
                    <Form>
                        <label htmlFor="username">username</label>
                        <Field id="username" name="username" placeholder="username" />
                        <ErrorMessage name="username" />
                        <label htmlFor="password">password</label>
                        <Field id="password" name="password" type="password" />
                        <ErrorMessage name="password" />
                        
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}