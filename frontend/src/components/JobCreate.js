import { useContext, useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import axios from "axios"
import { API } from '../api'
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export function JobCreate() {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext)
    let token = null
    if (user) {
      token = user.token
    }
    const navigate = useNavigate()
    
    function ImagePreview ({file}) {
        const [imageSrc, setImageSRC] = useState(null)

        useEffect(() => {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImageSRC(reader.result)
            }
            reader.readAsDataURL(file)
        })

        return (
            <div>
                {!imageSrc && "Loading..."}
                {imageSrc && (
                    <img src={imageSrc} className="h-20 w-20 px-2 py-2" alt={file.name}/>
                )}
                
            </div>
        )
    }

    function handleSubmit(values) {
        setLoading(true)
        const data = new FormData()
        data.append('title', values.title)
        data.append('company_name', values.company_name)
        data.append('company_logo', file)
        data.append('company_website', values.company_website)
        data.append('location', values.location)
        data.append('salary', values.salary)
        if (token) {
            axios.post(API.jobs.create, data, {
                    headers: {
                        "Authorization": `Token ${token}`
                    }
                })
                    .then(res => {
                        // console.log(res.data)
                        navigate("/")
                    })
                    .finally(() => {
                        setLoading(false)
                    })
        }
        
    }

    return (
        <div>
            {loading && "Loading..."}
            <Formik
                initialValues={{
                    title: 'Varans namn',
                    company_name: 'Säljares namn och telefonnr',
                    company_logo: '',
                    company_website: 'https://google.com',
                    location:'Stockholm',
                    salary: 100
                }}
                onSubmit={handleSubmit}>

                {({ errors, touched }) => (
                    <Form>
                        <Field name="title">
                            {({ field, form }) => (
                                <label className="mt-3 block">
                                    <span className="text-gray-700">Vad säljer du?</span>
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
                                    <span className="text-gray-700">Säljarens Namn och Telefonnummer:</span>
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

                        
                        <div className="flex items-center">
                            <label className="mt-3 block">
                                <span className="text-gray-700">Bild på varan:</span>
                                <input
                                onChange={e => setFile(e.target.files[0])}
                                type="file"
                                className="
                                    mt-1
                                    block
                                    w-full
                                    rounded-md
                                    border-gray-300
                                    focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                                "
                                />
                                {file && (
                                    <ImagePreview file={file}/>
                                )}
                            </label>
                        </div>
                        

                        <Field name="company_website">
                            {({ field, form }) => (
                                <label className="mt-3 block">
                                    <span className="text-gray-700">Länk till mer information om varan:</span>
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
                                    placeholder="https://www..."
                                    style={
                                        form.touched.company_website && form.errors.company_website ? (
                                            { border: '2px solid var(--primary-red)'}
                                        ) : null
                                    }
                                    />
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
                                    <span className="text-gray-700">Pris (usd):</span>
                                    <input
                                    {...field}
                                    type="number"
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

                        <button type="submit" className="mt-3 bg-blue-100 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-blue-200 ">Skapa Annons</button>
                    </Form>
                )}

            </Formik>
        </div>
    )

}