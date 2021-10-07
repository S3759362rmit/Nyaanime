import axios from "axios";
import { useEffect, useState } from "react";

export function useFetch(url) {
    const [data, setData] = useState(null);
    const [status, setStatus] = useState("idle");

    useEffect(() => {
        if (!url) return;

        setStatus("fetching");


        axios(url)
            .then((res) => {
                setData(res.data);
                setStatus("succeeded");
            })
            .catch(function (err) {
                console.error(err);
                setStatus(JSON.stringify(err, undefined, 2));
            });
    }, [url]);

    return { data, status };
}
