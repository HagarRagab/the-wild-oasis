import { useMutation } from "@tanstack/react-query";
import { createGuest as createGuestApi } from "../../services/apiGuests";
import toast from "react-hot-toast";

export function useCreateGuest() {
    const { mutate: createGuest, isPending: isCreatingGuest } = useMutation({
        mutationFn: (newGuest) => createGuestApi(newGuest),
        onSuccess: () => {
            toast.success("Guest successfully created");
        },
        onError: () => {
            toast.error("Guest could not be created");
        },
    });

    return { createGuest, isCreatingGuest };
}
