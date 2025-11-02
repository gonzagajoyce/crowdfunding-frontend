import { useState, useEffect } from "react";

export default function useFundraiser(id) {
    const [fundraiser, setFundraiser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return; // se não tiver id, não faz nada

        const fetchFundraiser = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/fundraisers/${id}`);
                if (!res.ok) {
                    throw new Error(`Fundraiser not found (id: ${id})`);
                }
                const data = await res.json();
                setFundraiser(data);
            } catch (err) {
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchFundraiser();
    }, [id]);

    return { fundraiser, isLoading, error };
}

