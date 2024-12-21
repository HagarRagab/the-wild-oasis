import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";

export function useBooking() {
    const { bookingId } = useParams();

    const {
        data: booking,
        isLoading,
        error,
    } = useQuery({
        queryKey: ["booking", bookingId],
        queryFn: () => getBooking(bookingId),
        retry: false, // Stop the behaviour of React query to try 3 times to fetch data in case there is an error to fetch data.
    });

    return { booking, error, isLoading };
}
