import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

import Spinner from "../../ui/Spinner";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

function UpdateSettingsForm() {
    const { isLoading, settings } = useSettings();
    const { isUpdating, updateSettings } = useUpdateSettings();

    if (isLoading) return <Spinner />;

    const {
        breakfastPrice,
        minBookingLength,
        maxBookingLength,
        maxGuestsPerBooking,
    } = settings;

    function handleUpdateField(e, filed) {
        const { value } = e.target;

        if (!value) return;
        updateSettings({ [filed]: value });
    }

    return (
        <Form>
            <FormRow label="Minimum nights/booking">
                <Input
                    type="number"
                    id="min-nights"
                    defaultValue={minBookingLength}
                    disabled={isUpdating}
                    onBlur={(e) => handleUpdateField(e, "minBookingLength")}
                />
            </FormRow>
            <FormRow label="Maximum nights/booking">
                <Input
                    type="number"
                    id="max-nights"
                    defaultValue={maxBookingLength}
                    disabled={isUpdating}
                    onBlur={(e) => handleUpdateField(e, "maxBookingLength")}
                />
            </FormRow>
            <FormRow label="Maximum guests/booking">
                <Input
                    type="number"
                    id="max-guests"
                    defaultValue={maxGuestsPerBooking}
                    disabled={isUpdating}
                    onBlur={(e) => handleUpdateField(e, "maxGuestsPerBooking")}
                />
            </FormRow>
            <FormRow label="Breakfast price">
                <Input
                    type="number"
                    id="breakfast-price"
                    defaultValue={breakfastPrice}
                    disabled={isUpdating}
                    onBlur={(e) => handleUpdateField(e, "breakfastPrice")}
                />
            </FormRow>
            <FormRow>
                <Button disabled={isUpdating}>Update</Button>
            </FormRow>
        </Form>
    );
}

export default UpdateSettingsForm;
