const response = require("../utils/responseHandler");
const {Event} = require("../model/eventModel");
const sendDataEvent = async (req, res) => {
    const { name,
        prizePool,
        organizer,
        participants,
        description,
        dateOfEvent,
        eventStatus
    } = req.body;
    try {
        const event = new Event({
            name,
            prizePool,
            organizer,
            participants,
            description,
            dateOfEvent,
            eventStatus
        })
        await event.save();
        return response(res, 201, "Event Created Successfully", event)
    } catch (error) {
        console.error(error)
        return response(res, 500, "internal Server error eventController")
    }
}
module.exports = {
    sendDataEvent
}