import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinAPI } from "../../services/apiCabins";

export function useDeleteCabin() {
    const queryClient = useQueryClient();

    const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
        mutationFn: deleteCabinAPI,
        onMutate: () => toast.loading("Deleting..."),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cabins"],
            });
            toast.dismiss();
            toast.success("cabin successfully deleted.");
        },
        onError: (error) => {
            toast.dismiss();
            toast.error(error.message);
        },
    });

    return { isDeleting, deleteCabin };
}
