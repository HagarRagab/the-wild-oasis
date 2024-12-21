import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
    const queryClient = useQueryClient();

    const { isPending: isUpdating, mutate: updateSettings } = useMutation({
        mutationFn: updateSetting,
        onMutate: () => toast.loading("Updating..."),
        onSuccess: () => {
            toast.dismiss();
            toast.success("Settings successfully updated");
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: () => {
            toast.dismiss();
            toast.error("Settings could not be updated");
        },
    });

    return { isUpdating, updateSettings };
}
