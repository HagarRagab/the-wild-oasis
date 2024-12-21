import { forwardRef } from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
    width: 100%;
    font-size: 1.4rem;
    padding: 0.8rem 1.2rem;
    border: 1px solid
        ${(props) =>
            props.type === "white"
                ? "var(--color-grey-100)"
                : "var(--color-grey-300)"};
    border-radius: var(--border-radius-sm);
    background-color: var(--color-grey-0);
    font-weight: 500;
    box-shadow: var(--shadow-sm);
`;

function Select({ value, onChange, options, ...props }, ref) {
    return (
        <StyledSelect onChange={onChange} value={value} {...props} ref={ref}>
            {options.map((option, i) => (
                <option value={option.value} key={`${i}-${option.value}`}>
                    {option.label}
                </option>
            ))}
        </StyledSelect>
    );
}

export default forwardRef(Select);
