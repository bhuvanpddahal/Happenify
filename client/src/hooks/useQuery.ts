import { useLocation } from "react-router-dom";

const useQuery = () => {
    const location = useLocation();
    const search = location.search;
    const params = new URLSearchParams(search);
    const tab = params.get("tab");
    const query = { tab };
    return query;
};

export default useQuery;