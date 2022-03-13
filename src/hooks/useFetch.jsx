import {useEffect, useState} from "react"
import axios from "axios"

export function useFetch(url){
    const [data, setData] = useState(null)
    
    useEffect(() => {
        axios.get(url)
            .then(response => {
                setData(response.data)
            })
    }, [])

    return { data }
}