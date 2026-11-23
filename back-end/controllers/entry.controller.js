const Entry = require('../models/Entry')

async function createEntry(req, res) {
    try {
        const { title, entryBody, isPublic } = req.body;

        const createdEntry = await Entry.create({
            title,
            entryBody,
            isPublic,
            owner: req.user._id,
        });

        res.status(201).json(createdEntry)
    } catch (err) {
        console.log(err);
    }
}


async function getAllPublicEntries(req, res) {
    try {
        const publicEntry = await Entry.find({ isPublic: true })
        res.status(200).json(publicEntry)
    }
    catch (err) {
        console.log(err);
    }
}

async function myEntries(req, res) {
    try {
        const myEntry = await Entry.find({ owner: req.user._id })
        res.status(200).json(myEntry)
    } catch (err) {
        console.log(err);
    }
}

async function editEntry(req, res) {
    try {
        let foundEntry = await Entry.findById(req.params.entryId)
        if (foundEntry.owner != req.user._id) {
            return res.status(403).json({ message: 'Cannot Edit this Entry' })
        }
        if (!foundEntry) {
            return res.status(404).json({ message: 'this entry does not exist' })
        }
        const { title, entryBody, isPublic } = req.body;
        foundEntry = await Entry.findByIdAndUpdate(foundEntry._id, {
            title,
            entryBody,
            isPublic,
            owner: req.user._id,
        });
        res.status(200).json(foundEntry)
    } catch (err) {
        console.log(err);
    }
}


async function deleteEntry(req, res) {
    try {
        const foundEntry = await Entry.findById(req.params.entryId)
        if (foundEntry.owner != req.user._id) {
            return res.status(403).json({ message: 'Cannot delete this Entry' })
        }
        if (!foundEntry) {
            return res.status(404).json({ message: 'this entry does not exist' })
        }
        await Entry.findByIdAndDelete(foundEntry._id)
        res.sendStatus(204)
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    createEntry,
    getAllPublicEntries,
    myEntries,
    editEntry,
    deleteEntry
}