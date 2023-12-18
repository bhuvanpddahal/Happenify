import { useLocation } from "react-router-dom";

const useQuery = () => {
    const location = useLocation();
    const search = location.search;
    const params = new URLSearchParams(search);
    const tab = params.get("tab");
    const name = params.get("name");
    const searchedLocation = params.get("location");
    const query = {
        tab,
        name,
        location: searchedLocation
    };
    return query;
};

export default useQuery;