import { useState } from "react";
import CreateBookingForm from "./CreateBookingForm";
import CreateGuestForm from "../guests/CreateGuestForm";
import SelectGuest from "../guests/SelectGuest";
import ButtonText from "../../ui/ButtonText";
import styled from "styled-components";

const Tabs = styled.div`
    width: fit-content;
    display: flex;
    gap: 2rem;
    align-items: center;
    margin: 1rem auto 2rem;
    color: var(--color-grey-900) !important;
`;

function CreateBooking() {
    const [guestId, setGuestId] = useState(null);
    const [isSelectingGuest, setIsSelectingGuest] = useState(true);
    console.log(guestId);

    return (
        <>
            {guestId && <CreateBookingForm guestId={guestId} />}
            {!guestId && (
                <Tabs>
                    <ButtonText
                        onClick={() => setIsSelectingGuest(true)}
                        className={isSelectingGuest ? "active" : ""}
                    >
                        Select guest
                    </ButtonText>
                    <ButtonText
                        onClick={() => setIsSelectingGuest(false)}
                        className={!isSelectingGuest ? "active" : ""}
                    >
                        Create new guest
                    </ButtonText>
                </Tabs>
            )}

            {!guestId && isSelectingGuest && (
                <SelectGuest setGuestId={setGuestId} />
            )}

            {!guestId && !isSelectingGuest && (
                <CreateGuestForm setGuestId={setGuestId} />
            )}
        </>
    );
}

export default CreateBooking;
