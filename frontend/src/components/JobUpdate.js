import { useContext, useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { API } from '../api'
import { AuthContext } from "../contexts/AuthContext";
import { useParams } from 'react-router';

export function JobUpdate() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [loadingJob, setLoadingJob] = useState(false)

    const [job, setJob] = useState(null)
    const { id } = useParams()

    const { user } = useContext(AuthContext)
    let token = null
    if (user) {
      token = user.token
    }
    
    // useEffect(() => {
    //     {job && !job.is_owner && (
    //         navigate('/')
    //     )}
    //     return () => null
    // })

    useEffect(() => {
        setLoadingJob(true)
        function fetchJob() {
            if (token) {
                axios.get(API.jobs.retrieve(id), {
                    headers: {
                        "Authorization": `Token ${token}`
                    }
                })
                    .then(res => {
                        setJob(res.data)
                    })
                    .finally(() => {
                        setLoadingJob(false)
                    })
            }
            
        }
        fetchJob()
        return () => null
    }, [id, token])

    function handleSubmit(values) {
        setLoading(true)
        axios.put(API.jobs.update(id), values, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
            .then(res => {
                navigate(`/jobs/${id}`)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div>
            {loading && "Submitting..."}
            {loadingJob && "Fetching Job Details..."}
            {job && (
                <Formik
                    initialValues={{
                        title: job.title,
                        company_name: job.company_name,
                        company_website: job.company_website,
                        location: job.location,
                        salary: job.salary,
                        // available: job.available,
                        remote: job.remote,
                    }}
                    onSubmit={handleSubmit}>

                    {({ errors, touched }) => (
                        <Form>
                            <Field name="title">
                                {({ field, form }) => (
                                    <label className="mt-3 block">
                                        <span className="text-gray-700">Vad s??ljer du?</span>
                                        <input
                                        {...field}
                                        type="text"
                                        required
                                        className="
                                            mt-1
                                            block
                                            w-full
                                            rounded-md
                                            border-gray-300
                                            shadow-sm
                                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                        placeholder="Software developer"
                                        style={
                                            form.touched.title && form.errors.title ? (
                                                { border: '2px solid var(--primary-red)'}
                                            ) : null
                                        }
                                        />
                                    </label>
                                )}
                            </Field>

                            <Field name="company_name">
                                {({ field, form }) => (
                                    <label className="mt-3 block">
                                        <span className="text-gray-700">S??ljarens Namn och Telefonnummer:</span>
                                        <input
                                        {...field}
                                        type="text"
                                        required
                                        className="
                                            mt-1
                                            block
                                            w-full
                                            rounded-md
                                            border-gray-300
                                            shadow-sm
                                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                        placeholder="Facebook"
                                        style={
                                            form.touched.company_name && form.errors.company_name ? (
                                                { border: '2px solid var(--primary-red)'}
                                            ) : null
                                        }
                                        />
                                    </label>
                                )}
                            </Field>

                            <Field name="company_website">
                                {({ field, form }) => (
                                    <label className="mt-3 block">
                                        <span className="text-gray-700">L??nk till mer info:</span>
                                        <input
                                        {...field}
                                        type="url"
                                        required
                                        className="
                                            peer
                                            mt-1
                                            block
                                            w-full
                                            rounded-md
                                            border-gray-300
                                            shadow-sm
                                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                        placeholder="https://www..."
                                        style={
                                            form.touched.company_website && form.errors.company_website ? (
                                                { border: '2px solid var(--primary-red)'}
                                            ) : null
                                        }
                                        />
                                        <p class="mt-2 invisible peer-invalid:visible text-red-600 text-sm">
                                        Please provide a valid url.
                                        </p>
                                    </label>
                                )}
                            </Field>

                            <Field name="location">
                                {({ field, form }) => (
                                    <label className="mt-3 block">
                                        <span className="text-gray-700">Plats</span>
                                        <input
                                        {...field}
                                        type="text"
                                        required
                                        className="
                                            mt-1
                                            block
                                            w-full
                                            rounded-md
                                            border-gray-300
                                            shadow-sm
                                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                        placeholder="California"
                                        style={
                                            form.touched.location && form.errors.location ? (
                                                { border: '2px solid var(--primary-red)'}
                                            ) : null
                                        }
                                        />
                                    </label>
                                )}
                            </Field>

                            <Field name="salary">
                                {({ field, form }) => (
                                    <label className="mt-3 block">
                                        <span className="text-gray-700">Pris usd:</span>
                                        <input
                                        {...field}
                                        type="number"
                                        required
                                        className="
                                            mt-1
                                            block
                                            w-full
                                            rounded-md
                                            border-gray-300
                                            shadow-sm
                                            focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                        "
                                        style={
                                            form.touched.salary && form.errors.salary ? (
                                                { border: '2px solid var(--primary-red)'}
                                            ) : null
                                        }
                                        />
                                    </label>
                                )}
                            </Field>

                            {/* <Field name="available">
                                {({ field, form }) => (
                                    <div className="block">
                                    <label className="mt-3 block">
                                        
                                        <input
                                        {...field}
                                        type="checkbox"
                                        className="
                                        rounded
                                        bg-blue-200
                                        border-transparent
                                        focus:border-transparent focus:bg-blue-200
                                        text-blue-700
                                        focus:ring-1 focus:ring-offset-2 focus:ring-blue-500
                                        "
                                        style={
                                            form.touched.available && form.errors.available ? (
                                                { border: '2px solid var(--primary-red)'}
                                            ) : null
                                        }
                                        />
                                        <span className="text-gray-700">D??lj Annons</span>
                                    </label>
                                    </div>
                                )}
                            </Field> */}
                            <Field name="remote">
                                {({ field, form }) => (
                                    <label className="mt-3 block">
                                        
                                        <input
                                        {...field}
                                        type="checkbox"
                                        className="
                                            rounded
                                            bg-blue-200
                                            border-transparent
                                            focus:border-transparent focus:bg-blue-200
                                            text-blue-700
                                            focus:ring-1 focus:ring-offset-2 focus:ring-blue-500
                                        "
                                        style={
                                            form.touched.remote && form.errors.remote ? (
                                                { border: '2px solid var(--primary-red)'}
                                            ) : null
                                        }
                                        />
                                        <span className="text-gray-700">S??ld</span>
                                    </label>
                                )}
                            </Field>

                            <button type="submit" className="mt-3 bg-blue-100 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-blue-200 ">Submit</button>
                        </Form>
                    )}
                </Formik>
            )}
        </div>
    )

}