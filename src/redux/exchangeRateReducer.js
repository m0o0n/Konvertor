import { getCurencies } from './../API/api'

let initialState = {
    rates: [
        {ccy: 'UAH', base_ccy: 'UAH', buy: '1', sale: '1'}
    ],
    base: "USD",
    to: "EUR",
    fromBase: {
    },
    exRate: 1
}





export const excahngeReducer=(state = initialState, action)=>{
    switch(action.type){
        case "exrateUpdate":
            return{
                ...state,
                rates: [ ...action.data]
            }
        case "fillFromBase":
            return{
                ...state,
                fromBase: {...action.data}
            }
        case "setBase":
            return{
                ...state,
                base: action.string
            }
        case "setTo":
            return{
                ...state,
                to: action.string
            }
        case "setExRate":
            return{
                ...state,
                exRate: action.rate
            }
        default: return state
    }
}

export const exrateUpdateAC=(data)=>({type:"exrateUpdate", data})
export const fillFromBaseAC=(data)=>({type:"fillFromBase", data})
export const setBaseAC=(string)=>({type:"setBase", string})
export const setToAC=(string)=>({type:"setTo", string})
export const setExRateAC=(rate)=>({type:"setExRate", rate})
export const addRatesThunk =(baseCurency, toBase)=>{
    return (dispatch)=>{
        getCurencies().then(data=>{
            dispatch(exrateUpdateAC(data))
            dispatch(fillFromBaseAC(fillFromBase(data, baseCurency, toBase)))
            dispatch(setExRateAC(calcExRate(data, baseCurency, toBase)))
        })
    }
}

const calcExRate=(arr, base, toBase)=>{
    let find_base = arr.find(e=>{
        if(e.ccy === base){
            return e
        }
    })
  
    let find_Tobase = arr.find(e=>{
        if(e.ccy === toBase){
            return e
        }
    })
    if(find_Tobase == undefined){
        find_Tobase = 1
    }else{
        find_Tobase = find_Tobase.sale
    }

    if(find_base == undefined){
        find_base = 1
    }else{
        find_base = find_base.sale
    }
     return find_base/find_Tobase
}

const fillFromBase =(arr, base, toBase)=>{
   let key_val = arr.map(e=>{
        return [e.ccy, e.sale]
   })
    key_val.push(["UAH", "1"])
    
   return Object.fromEntries(key_val)
}
