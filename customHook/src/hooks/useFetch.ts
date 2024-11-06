import axios from "axios";
import { useEffect, useState } from "react";

interface FetchState<T> {
    data: T| null;
    loading:boolean;
    error: Error | null
}

export function useFetch<T>(url:string){
    const [state, setState] = useState<FetchState<T>>({
        data:null,
        loading:true,
        error:null
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(url)
                if(response.status !== 200){
                    throw new Error(`HTTP error status: ${response.status}`)
                }
                setState({data:response.data, error:null, loading:false})
                
            } catch (err) {
                setState({data:null, error: err as Error, loading:false})
            }
        }

        fetchData();
      }, [url]);

      return {state}
}