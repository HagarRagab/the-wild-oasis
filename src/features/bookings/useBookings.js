import { useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
    const queryClient = useQueryClient();
    const [searchParams] = useSearchParams();

    // 1) FILTER
    const filterValue = searchParams.get("status");
    const filter =
        !filterValue || filterValue === "all"
            ? null
            : { field: "status", value: filterValue };

    // 2) SORT
    const sortValue = searchParams.get("sortBy") || "startDate-desc";
    const [field, direction] = sortValue.split("-");
    const sort = { field, direction };

    // 3) PAGINATION
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    const {
        data: { bookings, count } = {},
        isLoading,
        error,
    } = useQuery({
        queryKey: ["bookings", filterValue, sortValue, page],
        queryFn: () => getBookings(filter, sort, page),
    });

    // 4) PREFETCHING
    const countPages = Math.ceil(count / PAGE_SIZE);
    if (page < countPages)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filterValue, sortValue, page + 1],
            queryFn: () => getBookings(filter, sort, page + 1),
        });

    if (page > 1)
        queryClient.prefetchQuery({
            queryKey: ["bookings", filterValue, sortValue, page - 1],
            queryFn: () => getBookings(filter, sort, page - 1),
        });

    return { bookings, isLoading, error, count };
}
