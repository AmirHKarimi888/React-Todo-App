import axios from "axios";

const url = "";



class Actions {
    constructor() {

    }

    async post(url) {
        await axios.post(url)
    }

    async delete(url, id) {
        await axios.delete(url, id)
    }
}

const Action = new Actions();

export { url, Action }