import { useCallback, useState, useEffect } from "react";

export default function useFetch(url) {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const send = useCallback(
        (params = null) => {
            const _url = new URL(url);

            if (params) {
                _url.search = new URLSearchParams(params).toString();
            }

            setIsLoading(true);
            setError(null);
            fetch(_url)
                .then(async (response) => {
                    const data = await response.json();
                    setData(data);
                })
                .finally(() => {
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError(error.message);
                });
        },
        [url]
    );

    useEffect(() => {
        send();
    }, []);

    function refetch(options) {
        send(options?.params);
    }

    return { data, isLoading, error, refetch };
}
