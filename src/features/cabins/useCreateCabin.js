import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
    const queryClient = useQueryClient();

    const { isPending: isCreating, mutate: createCabin } = useMutation({
        mutationFn: createEditCabin,
        onMutate: () => toast.loading("Creating..."),
        onSuccess: () => {
            toast.dismiss();
            toast.success("A new cabin is successfully created");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (error) => {
            toast.dismiss();
            toast.error(error?.message);
        },
    });

    return { isCreating, createCabin };
}
