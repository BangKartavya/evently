"use server";

import {CreateEventParams} from "@/types";
import {handleError} from "@/lib/utils";
import {connectToDatabase} from "@/lib/database";
import User from "@/lib/database/models/user.model";
import Event from "@/lib/database/models/event.model";

export const createEvent = async ({event, userId, path}: CreateEventParams) => {
    try {
        await connectToDatabase();

        // console.log({
        //     categoryId: event.categoryId,
        //     organizerId: userId
        // });

        const organizer = await User.findById(userId);

        if (!organizer) {
            throw new Error("Organizer not Found");
        }

        const newEvent = await Event.create({
            ...event,
            category: event.categoryId,
            organizer: userId
        });

        return JSON.parse(JSON.stringify(newEvent));
    } catch (error) {
        console.log(error);
        handleError(error);
    }
};
