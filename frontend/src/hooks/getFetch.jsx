import { useEffect, useState } from "react";

export const useGetFetch = (url) => {

    const [data, setData] = useState([])
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect( () => {
        setLoading(true)
        fetch(url,{
            method: 'GET',
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => setData(data))
        .catch(e => setError(toString(e)))
        .finally(() => setLoading(false))
    }, [url])

    //console.log(data)
    //console.log(error)

    return {data, error, loading}
}