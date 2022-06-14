import { useContext, useEffect, useState } from "react";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { API } from "../api";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { CheckoutForm } from "./CheckoutForm";


const stripePromise = loadStripe('pk_test_51KveESHPYsyPqSfN6nrF7JBG0mtZUUqBfS7rl3cTHdbycKU0WCScDvETmANX1vbZnjilmycDLz3UzDG0pG1KckUg00K3gsFSy5');

export function Payment() {
    const { user: { token } } = useContext(AuthContext)

    const [clientSecret, setClientSecret] = useState("");
    
    useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    axios.post(API.payment.createPayment, {}, {
        headers: {
            "Authorization": `Token ${token}`
        }
    })
        .then(res => setClientSecret(res.data.clientSecret))
    }, [token]);

    const appearance = {
    theme: 'stripe',
    };
    
    const options = {
    clientSecret,
    appearance,
    };

    return (
        <div>
            {clientSecret && (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}