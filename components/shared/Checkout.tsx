import React, {useEffect} from 'react';
import {IEvent} from "@/lib/database/models/event.model";
import {Button} from "@/components/ui/button";
import {loadStripe} from '@stripe/stripe-js';
import {checkoutOrder} from "@/lib/actions/order.actions";

interface CheckOutProps {
    event: IEvent;
    userId: string;
};

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!).then();

const Checkout = ({event, userId}: CheckOutProps) => {
    const isFree = event.isFree;
    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }

        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    const onCheckout = async () => {
        const order = {
            eventTitle: event.title,
            eventId: event._id,
            price: event.price!,
            isFree: isFree!,
            buyerId: userId
        };

        await checkoutOrder(order);
    }

    return (
        <form action={onCheckout}>
            <Button type="submit" role="link" size="lg" className="button sm:w-fit">
                {isFree ? "Get Ticket" : "Buy Ticket"}
            </Button>
        </form>
    );
};

export default Checkout;