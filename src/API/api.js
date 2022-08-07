import * as axios from 'axios'

const instance = axios.create({
    baseURL: "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
})
export const getCurencies =()=>{
    return instance.get().then(res=>{
        return res.data
    })
}
