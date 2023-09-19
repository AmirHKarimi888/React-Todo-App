import axios from "axios";

const url = "https://64c10bfafa35860bae9fd682.mockapi.io/amirhk888";

//"http://localhost:3000"
//"https://64b3e8910efb99d8626884f1.mockapi.io/TodoApp/v1/"

class Actions {
    constructor() {

    }

    async get(url, data) {
        axios.get(url).then(data)
    }

    async post(url, data) {
        await axios.post(url, data)
    }

    async put(url, data) {
        await axios.put(url, data);
    }

    async delete(url) {
        await axios.delete(url)
    }
}

const Action = new Actions();

export { url, Action }