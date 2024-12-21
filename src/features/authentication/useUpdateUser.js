import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser as updateUserApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useUpdateUser() {
    const queryClient = useQueryClient();
    const { mutate: updateUser, isPending: isUpdating } = useMutation({
        mutationFn: ({ fullName, password, avatar }) =>
            updateUserApi({ fullName, password, avatar }),

        onSuccess: () => {
            toast.success("Your account updated successfuly");
            queryClient.invalidateQueries({ queryKey: ["user"] });
        },

        onError: (error) => {
            console.error(error);
            toast.error("Something went wrong while updating your data");
        },
    });

    return { updateUser, isUpdating };
}
