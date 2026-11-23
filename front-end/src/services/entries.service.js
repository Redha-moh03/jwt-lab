import api from "./api";


async function getMyEntries() {
    const response = await api.get('/entries/my-entries')
    return response.data
}


async function getAllEntries() {
    const response = await api.get('/entries')
    return response.data
}

async function createAEntry(form) {
    await api.post('/entries', form)
}

export {
    getMyEntries,
    getAllEntries,
    createAEntry,
}
