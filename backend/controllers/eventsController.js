import eventsModel from "../models/eventsModel.js";

const addEvent = async (req, res) => {
    const { name, description, location, date, attendees } = req.body;

    try {
        const event = new eventsModel({
            name,
            description,
            location,
            date,
            attendees,
        });

        await event.save();
        res.status(201).json({ success: true, message: 'Event Added' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

const getAllEvent = async (req, res) => {
    try {
        const events = await eventsModel.find();
        res.status(200).json({ success: true, events });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getSingleEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await eventsModel.findById(id);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({ success: true, event });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}



const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { name, description, location, date, attendees } = req.body;

    try {
        const event = await eventsModel.findByIdAndUpdate(
            id,
            { name, description, location, date, attendees },
            { new: true }
        );
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found' });
        }
        res.status(200).json({ success: true, message: 'Event Updated' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}


const deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await eventsModel.findByIdAndDelete(id);
        if (!event) {
            return res.status(404).json({success:false, message: 'Event not found' });
        }
        res.status(200).json({success:true, message: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export { addEvent, getAllEvent, updateEvent, deleteEvent, getSingleEvent }