import { useContext, useEffect, useState } from "react";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { API } from "../api";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { CheckoutForm } from "./CheckoutForm";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export function Payment() {
    // const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    let token = ""
    if (user) {
      token = user.token
    }
    const { id } = useParams()
    const [clientSecret, setClientSecret] = useState("");
    const [canSponsor, setCanSponsor] = useState(true)
    // const [job, setJob] = useState(null)
    // const [loadingJob, setLoadingJob] = useState(false)
    
    // useEffect(() => {
    //     {job && !job.is_owner && (
    //         navigate('/')
    //     )}
    //     return () => null
    // })

    // useEffect(() => {
    //     setLoadingJob(true)
    //     function fetchJob() {
    //         axios.get(API.jobs.retrieve(id), {headers: {
    //             "Authorization": `Token ${token}`
    //         }})
    //         .then(res => {
    //             setJob(res.data)
    //         })
    //         .finally(() => {
    //             setLoadingJob(false)
    //         })
    //     }
    //     fetchJob()
    //     return () => null

    // }, [id, token])

    useEffect(() => {
        async function CreatePayment() {
            // Create PaymentIntent as soon as the page loads
            try {
                const res = await axios.post(API.payment.createPayment, {job_id: id}, {
                    headers: {
                        "Authorization": `Token ${token}`
                    }
                })
                setClientSecret(res.data.clientSecret)
            } catch (e) {
                console.log(e)
            }
        }

        async function FetchSponsoredJobCount() {
            try {
                const res = await axios.get(API.jobs.sponsored_count, {
                    headers: {
                        "Authorization": `Token ${token}`
                    }
                })
                
                setCanSponsor(res.data.job_count <3)
                
            } catch (e) {
                console.log(e)
            }
        }
        FetchSponsoredJobCount()
        CreatePayment()
    }, [token, id]);

    const appearance = {
    theme: 'stripe',
    };
    
    const options = {
    clientSecret,
    appearance,
    };

    return (
        <div>
            {/* {loadingJob && "Fetching payment details..."} */}
            {!canSponsor && (
                <div>
                    <p className="text-gray-600 italic">
                        We already have 3 sponsored job posts at the moment. Please check back in a few days.
                    </p>
                </div>
            )}
            {clientSecret && canSponsor && (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}