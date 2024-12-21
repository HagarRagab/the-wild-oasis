import { useMutation } from "@tanstack/react-query";
import { getCountryCode as getCountryCodeApi } from "../../services/apiGuests";

export function useFlag() {
    const { mutate: getCountryCode } = useMutation({
        mutationFn: (country) => getCountryCodeApi(country),
    });

    return { getCountryCode };
}
