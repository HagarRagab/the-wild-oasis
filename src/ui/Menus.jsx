import { createContext, useContext, useState } from "react";
import { HiEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { createPortal } from "react-dom";

const StyledMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StyledToggle = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-grey-700);
    }
`;

const StyledList = styled.ul`
    position: fixed;
    /* position: absolute; */

    background-color: var(--color-grey-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);

    right: ${(props) => props.$position.x}px;
    top: ${(props) => props.$position.y}px;
`;

const StyledButton = styled.button`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
        background-color: var(--color-grey-50);
    }

    & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-grey-400);
        transition: all 0.3s;
    }
`;

const MenusContext = createContext();

function Menus({ children }) {
    const [openId, setOpenId] = useState("");
    const [position, setPosition] = useState({});
    const close = () => setOpenId("");
    const open = setOpenId;

    return (
        <MenusContext.Provider
            value={{ openId, close, open, position, setPosition }}
        >
            {children}
        </MenusContext.Provider>
    );
}

Menus.Menu = function MenusMenu({ children }) {
    return <StyledMenu id="menu">{children}</StyledMenu>;
};

Menus.Toggle = function MenusToggle({ id }) {
    const { openId, open, close, setPosition } = useContext(MenusContext);

    function handleToggle(e) {
        e.stopPropagation();
        const toggledEle = e.target.closest("button");
        const rect = toggledEle.getBoundingClientRect();

        setPosition({
            x: window.innerWidth - rect.x - rect.width,
            y: rect.y + rect.height + 8,
        });

        openId === "" || openId !== id ? open(id) : close();
    }

    return (
        <StyledToggle onClick={handleToggle}>
            <HiEllipsisVertical />
        </StyledToggle>
    );
};

Menus.List = function MenusList({ children, name }) {
    const { openId, close, position } = useContext(MenusContext);
    const ref = useOutsideClick(close, false);

    if (openId !== name || !openId) return null;

    return createPortal(
        <StyledList $position={position} ref={ref}>
            {children}
        </StyledList>,
        document.body
    );
};

Menus.Button = function MenusButton({ children, icon, onClick, disabled }) {
    const { close } = useContext(MenusContext);

    return (
        <li>
            <StyledButton
                disabled={disabled}
                onClick={() => {
                    onClick?.();
                    close();
                }}
            >
                {icon}
                <span>{children}</span>
            </StyledButton>
        </li>
    );
};

export default Menus;
