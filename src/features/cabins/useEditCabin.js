import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useEditCabin() {
    const queryClient = useQueryClient();

    const { isPending: isEditing, mutate: editCabin } = useMutation({
        mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
        onMutate: () => toast.loading("Editing..."),
        onSuccess: () => {
            toast.dismiss();
            toast.success("Cabin was successfully edited");
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
        },
        onError: (error) => {
            toast.dismiss();
            toast.error(error?.message);
        },
    });

    return { isEditing, editCabin };
}
