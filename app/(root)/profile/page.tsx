import React from 'react';
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Collection from "@/components/shared/Collection";
import {auth} from "@clerk/nextjs/server";
import {getEventsByUser} from "@/lib/actions/event.actions";

const ProfilePage = async () => {
    const {sessionClaims} = await auth();

    const userId = sessionClaims?.userId as string;

    const organizedEvents = await getEventsByUser({
        userId,
        page: 1
    });

    return (
        <>
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
                    <Button
                        asChild
                        size="lg"
                        className="button hidden sm:flex"
                    >
                        <Link href="/#events">Explore More Events</Link>
                    </Button>
                </div>
            </section>
            <section className="wrapper my-8">
                {
                    /*
                    <Collection
                        data={[]}
                        emptyTitle="No Tickets purchased for future events"
                        emptyStateSubtext="Explore events to attend"
                        collectionType="My_Tickets"
                        limit={3}
                        page={1}
                        urlParamName="ordersPage"
                        totalPages={2}
                    />
                     */
                }
            </section>
            {/*TODO Events Organized*/}
            <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
                <div className="wrapper flex items-center justify-center sm:justify-between">
                    <h3 className="h3-bold text-center sm:text-left">My Events</h3>
                    <Button
                        asChild
                        size="lg"
                        className="button hidden sm:flex"
                    >
                        <Link href="/events/create">Create More Events</Link>
                    </Button>
                </div>
            </section>
            <section className="wrapper my-8">
                <Collection
                    data={organizedEvents?.data}
                    emptyTitle="No Events have been created"
                    emptyStateSubtext="Click the Button to create your first event"
                    collectionType="Events_Organized"
                    limit={3}
                    page={1}
                    urlParamName="eventsPage"
                    totalPages={2}
                />
            </section>
        </>
    );
};

export default ProfilePage;