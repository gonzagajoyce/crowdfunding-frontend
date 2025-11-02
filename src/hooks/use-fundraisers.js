import { useState, useEffect, use } from "react";
import getFundraisers from "../api/get-fundraisers";

export default function useFundraisers() {
    const [fundraisers, setFundraisers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        getFundraisers().then((fundraisers) => {
            setFundraisers(fundraisers);
            setIsLoading(false);
        }).catch((error) => {
            setError(error);
            setIsLoading(false);
        });
    }, []);


    const addFundraiser = (newFundraiser) => {
        setFundraisers((prev) => [...prev, newFundraiser]);
    };

    return { fundraisers, isLoading, error, addFundraiser };
}