import { useSearchParams } from "react-router-dom";
import { useCabins } from "./useCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";

function CabinTable() {
    const { isLoading, cabins } = useCabins();
    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;
    if (!cabins.length) return <Empty resource="cabins" />;

    // 1) FILTER
    const filteredBy = searchParams.get("discount");
    const filteredCabins = cabins.filter((cabin) =>
        filteredBy === "no-discount"
            ? cabin.discount === 0
            : filteredBy === "with-discount"
            ? cabin.discount > 0
            : cabin
    );

    // 2) SORT
    const sortedBy = searchParams.get("sortBy") || "startDate-asc";
    const [field, direction] = sortedBy.split("-");
    const modifier = direction === "asc" ? 1 : -1;
    const sortedCabins = filteredCabins.sort(
        (a, b) => (a[field] - b[field]) * modifier
    );

    return (
        <Menus>
            <Table $columns={"0.6fr 1.8fr 2.2fr 1fr 1fr 1fr"}>
                <Table.Header>
                    <div></div>
                    <div>cabin </div>
                    <div>capacity</div>
                    <div>price</div>
                    <div>discount</div>
                </Table.Header>
                <Table.Body
                    data={sortedCabins}
                    render={(cabin) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
            </Table>
        </Menus>
    );
}

export default CabinTable;
