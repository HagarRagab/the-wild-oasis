import { Outlet } from "react-router-dom";
import styled from "styled-components";

import Header from "./Header";
import Sidebar from "./Sidebar";

const StyledAppLayout = styled.div`
    height: 100dvh;
    display: grid;
    grid-template-columns: 26rem 1fr;
    grid-template-rows: auto 1fr;

    @media (max-width: 768px) {
        & {
            grid-template-columns: auto 1fr;
        }
    }
`;

const Main = styled.main`
    background-color: var(--color-grey-50);
    padding: 4rem 4.8rem 6.4rem;
    overflow: auto;
`;

const Container = styled.div`
    max-width: 120rem;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
    margin: 0 auto;
`;

function AppLayout() {
    return (
        <StyledAppLayout>
            <Header />
            <Sidebar />
            <Main>
                <Container>
                    <Outlet />
                </Container>
            </Main>
        </StyledAppLayout>
    );
}

export default AppLayout;
