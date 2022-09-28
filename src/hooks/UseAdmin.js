import { useEffect } from "react";
import { useState } from "react";
import fetcher from "../api/axios";


const UseAdmin = (user) => {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (user) {
            (async () => {
                try {
                    const res = await fetcher.get(`is-admin?email=${user.email}`)
                    // if(res.data.result)
                    if (res.data.result) {
                        setIsAdmin(res.data.result);
                    }
                } catch (error) {

                }
            })()
        }
    })

    return { isAdmin };
}

export default UseAdmin;