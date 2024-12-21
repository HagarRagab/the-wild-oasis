import { useMutation } from "@tanstack/react-query";
import { findGuest as findGuestApi } from "../../services/apiGuests";

export function useFindGuest() {
    const { mutate: findGuest, isPending } = useMutation({
        mutationFn: ({ fullName }) => findGuestApi({ fullName }),
    });

    return { findGuest, isPending };
}
