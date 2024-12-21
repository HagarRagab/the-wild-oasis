import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    const { mutate: login, isPending: isLoginingIn } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),
        onSuccess: (data) => {
            queryClient.setQueryData(["user"], data.user);
            toast.success("successfully loged in");
            navigate("/", { replace: true });
        },
        onError: (error) => {
            console.error(error);
            toast.error("Email or password are incorrect");
        },
    });

    return { login, isLoginingIn };
}
