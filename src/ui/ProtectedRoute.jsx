import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "../ui/Spinner";
import styled from "styled-components";

const FullPage = styled.div`
    height: 100dvh;
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    align-items: center;
`;

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    // 1. Load the authenticated user
    const { isPending, isAuthenticated } = useUser();

    // 2. If there is no authenticated user redirect to /login
    // While loging in and loading the user's data the user is not authenticated yet need to wait until the end of loading everything
    useEffect(
        function () {
            if (!isAuthenticated && !isPending) navigate("/login");
        },
        [isAuthenticated, isPending, navigate]
    );

    // 3. Display a spinner while loading
    if (isPending)
        return (
            <FullPage>
                <Spinner />
            </FullPage>
        );

    // 4. If there is authenticated user render the app
    if (isAuthenticated) return children;
}

export default ProtectedRoute;
