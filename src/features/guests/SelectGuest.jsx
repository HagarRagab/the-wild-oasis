import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFindGuest } from "./useFindGuest";
import styled from "styled-components";

import { Flag } from "../../ui/Flag";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Spinner from "../../ui/Spinner";

const P = styled.p`
    margin-top: 2rem;
`;

const Radio = styled.div`
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-top: 2rem;

    & input {
        width: 2rem;
        height: 2rem;
    }
`;

const Label = styled.label`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--color-grey-500);

    & p:first-of-type {
        font-weight: 500;
        color: var(--color-grey-700);
    }
`;

const Div = styled.div`
    width: fit-content;
    margin-left: auto;
`;

const Error = styled.p`
    font-size: 1.4rem;
    color: var(--color-red-700);
    margin-top: 2rem;
`;

function SelectGuest({ setGuestId }) {
    const { findGuest, isPending } = useFindGuest();
    const [guests, setGuests] = useState([]);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    function handleChange(e) {
        findGuest(
            { fullName: e.target.value },
            {
                onSuccess: (data) => setGuests(data.data),
            }
        );
    }

    function onSubmit(data) {
        setGuestId(data.guestId);
    }

    return (
        <>
            <FormRow label="fullName">
                <Input onChange={handleChange} />
            </FormRow>

            {!guests.length && !isPending && <P>No guests found </P>}

            {isPending && <Spinner />}

            {!isPending && (
                <form onSubmit={handleSubmit(onSubmit)}>
                    {guests.map((guest) => (
                        <Radio key={guest.id}>
                            <input
                                type="radio"
                                id={guest.id}
                                name="guestId"
                                value={guest.id}
                                {...register("guestId", {
                                    required:
                                        "Select a guest or create new one",
                                })}
                            />
                            <Label htmlFor={guest.id}>
                                {guest.countryFlag && (
                                    <Flag
                                        src={guest.countryFlag}
                                        alt={`Flag of ${guest.country}`}
                                    />
                                )}
                                <p>{guest.fullName}</p>
                                <span>&bull;</span>
                                <p>{guest.email}</p>
                                <span>&bull;</span>
                                <p>National ID {guest.nationalID}</p>
                            </Label>
                        </Radio>
                    ))}
                    <Error>{errors?.guestId?.message}</Error>
                    <Div>
                        <Button>Select Guest</Button>
                    </Div>
                </form>
            )}
        </>
    );
}

export default SelectGuest;
