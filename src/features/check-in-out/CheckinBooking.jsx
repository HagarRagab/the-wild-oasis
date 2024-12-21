import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Checkbox from "../../ui/Checkbox";
import { formatCurrency } from "../../utils/helpers";
import { useEffect, useState } from "react";
import { useCheckin } from "./useCheckin";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
    /* Box */
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: var(--border-radius-md);
    padding: 2.4rem 4rem;
`;

function CheckinBooking() {
    const moveBack = useMoveBack();
    const { booking, isLoading } = useBooking();
    const [confirmPaid, setConfirmPaid] = useState(false);
    const [addBreakfast, setAddBreakfast] = useState(false);
    const { checkin, isCheckingin } = useCheckin();
    const { isLoading: isLoadingSettings, settings } = useSettings();

    useEffect(
        function () {
            setConfirmPaid(booking?.isPaid ?? false);
        },
        [booking?.isPaid]
    );

    if (isLoading || isLoadingSettings) return <Spinner />;

    const {
        id: bookingId,
        guests,
        totalPrice,
        numGuests,
        hasBreakfast,
        numNights,
        isPaid,
    } = booking;

    const breakfastPrice = settings.breakfastPrice * numGuests * numNights;

    function handleCheckin() {
        if (!confirmPaid) return;

        if (addBreakfast) {
            checkin({
                bookingId,
                breakfast: {
                    hasBreakfast: true,
                    extrasPrice: breakfastPrice,
                    totalPrice: totalPrice + breakfastPrice,
                },
            });
        } else {
            checkin({ bookingId, breakfast: {} });
        }
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">Check in booking #{bookingId}</Heading>
                <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
            </Row>

            <BookingDataBox booking={booking} />

            {!hasBreakfast && (
                <Box>
                    <Checkbox
                        checked={addBreakfast}
                        onChange={() => {
                            setAddBreakfast((add) => !add);
                            setConfirmPaid(false);
                        }}
                        id="breakfast"
                    >
                        Want to add breakfast for{" "}
                        {formatCurrency(breakfastPrice)}?
                    </Checkbox>
                </Box>
            )}
            <Box>
                <Checkbox
                    checked={confirmPaid || (isPaid && !addBreakfast)}
                    disabled={confirmPaid || (isPaid && !addBreakfast)}
                    onChange={() => setConfirmPaid((confirm) => !confirm)}
                    id="confirm"
                >
                    I confirm that {guests.fullName} has paid the total amount
                    of{" "}
                    {!addBreakfast
                        ? formatCurrency(totalPrice)
                        : `${formatCurrency(totalPrice + breakfastPrice)} (
                    ${formatCurrency(totalPrice)} + ${formatCurrency(
                              breakfastPrice
                          )})`}
                </Checkbox>
            </Box>

            <ButtonGroup>
                <Button
                    onClick={handleCheckin}
                    disabled={!confirmPaid || isCheckingin}
                >
                    Check in booking #{bookingId}
                </Button>
                <Button $variation="secondary" onClick={moveBack}>
                    Back
                </Button>
            </ButtonGroup>
        </>
    );
}

export default CheckinBooking;
