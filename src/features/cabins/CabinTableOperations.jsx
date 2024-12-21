import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperation() {
    return (
        <TableOperations>
            <Filter
                filter="discount"
                options={[
                    { value: "all", label: "All" },
                    { value: "no-discount", label: "No discount" },
                    { value: "with-discount", label: "With discount" },
                ]}
            />
            <SortBy
                type="white"
                options={[
                    { value: "name-asc", label: "Select by name (A-Z)" },
                    { value: "name-desc", label: "Select by name (Z-A)" },
                    {
                        value: "regularPrice-asc",
                        label: "Select by price (low first)",
                    },
                    {
                        value: "regularPrice-desc",
                        label: "Select by price (high first)",
                    },
                    {
                        value: "maxCapacity-asc",
                        label: "Select by capacity (low first)",
                    },
                    {
                        value: "maxCapacity-desc",
                        label: "Select by capacity (high first)",
                    },
                ]}
            />
        </TableOperations>
    );
}

export default CabinTableOperation;
