import * as axios from "axios"

const instance = axios.create({
    baseURL: "https://react-todolist-heroku.herokuapp.com/"
})

export const API = {
    async getData(urls) {
        return await Promise.all(urls.map(url => {
            return axios.get(url)
                .then(res => res = [...res.data])
                .catch(error => {
                    if (error.response.status === 404) {
                        alert("Часть данных на сайт не загружено")
                    }
                    // возвращаем error, присвоив null, чтобы в then сработал setData
                    // тем самым отрисуются все компоненты с данными и без
                    return error = null
                })
        }))

    },
    async addList(title, activeColor) {
        return await instance.post('lists', {
            title: title,
            colorId: activeColor
        })
    },
    async updateList(id, title) {
        return await instance.patch('lists/' + id, {
            title: title
        })
    },
    async deleteList(id) {
        return await instance.delete('lists/' + id)
    },
    async addTask(listId, text) {
        return instance.post('tasks', {
            listId: listId,
            text: text,
            isCompleted: false
        })
    },
    async updateTask(id, text, isCompleted) {
        return instance.patch('tasks/' + id, {
            text: text,
            isCompleted: isCompleted
        })
    },
    async deleteTask(id) {
        return instance.delete('tasks/' + id)
    }
}

