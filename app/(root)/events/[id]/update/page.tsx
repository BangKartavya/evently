import React from 'react'
import EventForm from "@/components/shared/EventForm";
import {auth} from "@clerk/nextjs/server";
import {getEventById} from "@/lib/actions/event.actions";
import {UpdateEventParams} from "@/types";

interface UpdateEventProps {
    params: any
}

const UpdateEvent = async ({params}: UpdateEventProps) => {
    const {id} = await params;
    const event = await getEventById(id);
    const {sessionClaims} = await auth();
    const userId = sessionClaims?.userId as string;


    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <h3 className="wrapper h3-bold text-center sm:text-left">
                    Update Event
                </h3>
            </section>
            <div className="wrapper my-8">
                <EventForm
                    userId={userId}
                    type="Update"
                    event={event}
                    eventId={event._id}
                />
            </div>
        </>
    )
};
export default UpdateEvent;
