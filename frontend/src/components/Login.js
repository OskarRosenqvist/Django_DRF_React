import { useContext, useState } from "react"
import { Formik, Field, Form } from 'formik';
import axios from "axios";
import { API } from "../api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function Login() {
    const [loading, setLoading] = useState(false)
    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    
    function handleSubmit(values) {
        // console.log(values)
        setLoading(true)
        axios.post(API.auth.login, values)
        .then(res => {
            // console.log(res.data)
            login(res.data.key)
            navigate('/')
        })
        .finally(() => {
            setLoading(false)
        })
        
    }

    return (
        <div>
            {loading && "Loading..."}
            Signup for new users is disabled.
            For testing purposes login using user1@test.com and Lösenord123
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={handleSubmit}>

                {({ errors, touched }) => (
                    <Form>
                        <Field name="email">
                            {({ field, form }) => (
                                <label className="mt-3 block">
                                    <span className="text-gray-700">Email</span>
                                    <input
                                    {...field}
                                    type="text"
                                    className="
                                        mt-1
                                        block
                                        w-full
                                        rounded-md
                                        border-gray-300
                                        shadow-sm
                                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                    "
                                    placeholder=""
                                    style={
                                        form.touched.email && form.errors.email ? (
                                            { border: '2px solid var(--primary-red)'}
                                        ) : null
                                    }
                                    />
                                </label>
                            )}
                        </Field>

                        <Field name="password">
                            {({ field, form }) => (
                                <label className="mt-3 block">
                                    <span className="text-gray-700">Password</span>
                                    <input
                                    {...field}
                                    type="password"
                                    className="
                                        mt-1
                                        block
                                        w-full
                                        rounded-md
                                        border-gray-300
                                        shadow-sm
                                        focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                    "
                                    placeholder=""
                                    style={
                                        form.touched.password && form.errors.password ? (
                                            { border: '2px solid var(--primary-red)'}
                                        ) : null
                                    }
                                    />
                                </label>
                            )}
                        </Field>

                        <button className="mt-3 bg-blue-100 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-blue-200" 
                            type="submit">
                            Submit
                        </button>
                    </Form>
                )}

            </Formik>
        </div>
    )
}