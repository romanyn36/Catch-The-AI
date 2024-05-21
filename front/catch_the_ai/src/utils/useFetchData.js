import { useState, useEffect } from "react";

const useFetchData = (url, options = []) => {
    // console.log("my parms", options);
    const [ method = 'GET', body = null, headers = {} ] = options;
    console.log("my splited parms", method, body, headers);

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            await fetch(url, { method: method,  headers: headers,
                 body: body})

                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((data) => {
                    setData(data);
                    console.log("data", data);
                    setLoading(false);
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                }
                );
        }
        fetchData();
        // return ()=>{}
    }
        , [url]);

    return { data, loading, error };
};

export default useFetchData;