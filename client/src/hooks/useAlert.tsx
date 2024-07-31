import { useEffect, useState } from "react"
import { useAxiosPrivate } from "./useAxiosPrivate"
import { useAppSelector } from "./reduxTypedHooks";



export const useAlert = () => {
    const { user } = useAppSelector((state) => state.auth);

    const [alert, setAlert] = useState<any>([]);

    console.log(user)
    const api = useAxiosPrivate()
    useEffect(() => {
        api.get(`/alerts/${user?.user_id}`).then((res) => {
        if(res.status === 200){ setAlert(res.data) }

        }).catch((error:any) => {
            console.log(error)
        })

    }

    , [])

    return {
        alert,setAlert
    }

}