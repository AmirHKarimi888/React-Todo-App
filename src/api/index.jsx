import axios from "axios";

const url = "http://localhost:3000";



class Actions {
    constructor() {

    }

    async get(url, data) {
        axios.get(url).then(data)
    }

    async post(url, data) {
        await axios.post(url, data)
    }

    async delete(url) {
        await axios.delete(url)
    }
}

const Action = new Actions();

export { url, Action }