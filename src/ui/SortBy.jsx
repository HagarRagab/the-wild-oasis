import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options, type }) {
    const [searchParams, setSearchParamsn] = useSearchParams();

    const sortedBy = searchParams.get("sortBy") || "";

    function handleChange(e) {
        searchParams.set("sortBy", e.target.value);
        setSearchParamsn(searchParams);
    }

    return (
        <Select
            value={sortedBy}
            onChange={handleChange}
            options={options}
            type={type}
        />
    );
}

export default SortBy;
