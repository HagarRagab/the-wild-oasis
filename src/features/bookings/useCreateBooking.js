import { useMutation } from "@tanstack/react-query";
import { createBooking as createBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCreateBooking() {
    const { mutate: createBooking, isPending: isCreatingBooking } = useMutation(
        {
            mutationFn: (newBooking) => createBookingApi(newBooking),
            onSuccess: () => toast.success("Booking successfully created"),
            onError: () => toast.error("Booking could not be created"),
        }
    );

    return { createBooking, isCreatingBooking };
}
