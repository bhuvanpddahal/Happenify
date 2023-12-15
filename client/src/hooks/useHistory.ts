import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export interface History {
    from: string;
    current: string;
}

const useHistory = () => {
    let history: History = JSON.parse(localStorage.getItem('history') || 'null');
    const [from, setFrom] = useState(history?.from);
    const [current, setCurrent] = useState(history?.current);
    const location = useLocation();

    useEffect(() => {
        setFrom(current);
        setCurrent(location.pathname);
        history = { from, current };
        console.log(history);
        
        localStorage.setItem('history', JSON.stringify(history));
    }, [location]);

    return { from, current };
};

export default useHistory;