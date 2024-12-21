import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCabins } from "../cabins/useCabins";
import { useCreateBooking } from "./useCreateBooking";
import { subtractDates } from "../../utils/helpers";

import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Textarea from "../../ui/Textarea";

function CreateBookingForm({ guestId }) {
    const navigate = useNavigate();
    const { createBooking, isCreatingBooking } = useCreateBooking();
    const { cabins } = useCabins();

    const {
        register,
        setValue,
        formState: { errors },
        watch,
        handleSubmit,
        reset,
    } = useForm();

    const [startDate, endDate, cabinPrice, extrasPrice] = watch([
        "startDate",
        "endDate",
        "cabinPrice",
        "extrasPrice",
    ]);

    useEffect(
        function () {
            if (!startDate || !endDate) return;
            setValue("numNights", subtractDates(endDate, startDate));
            const totalPrice = Number(cabinPrice) + Number(extrasPrice);
            setValue("totalPrice", totalPrice);
        },
        [startDate, endDate, cabinPrice, extrasPrice, setValue]
    );

    function onSubmit(data) {
        createBooking(data, {
            onSuccess: (data) => navigate(`/bookings/${data[0].id}`),
        });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="start date" error={errors?.startDate?.message}>
                <Input
                    type="date"
                    {...register("startDate", {
                        required: "This field is required",
                        validate: (value, formValues) =>
                            Number(subtractDates(formValues.endDate, value)) >
                                0 || "Start date is before end date",
                    })}
                    disabled={isCreatingBooking}
                />
            </FormRow>

            <FormRow label="end date" error={errors?.endDate?.message}>
                <Input
                    type="date"
                    {...register("endDate", {
                        required: "This field is required",
                    })}
                    disabled={isCreatingBooking}
                />
            </FormRow>

            <FormRow label="num nights" error={errors?.numNights?.message}>
                <Input
                    type="number"
                    readOnly
                    {...register("numNights")}
                    disabled={isCreatingBooking}
                />
            </FormRow>

            <FormRow label="cabin price" error={errors?.cabinPrice?.message}>
                <Input
                    type="number"
                    {...register("cabinPrice", {
                        required: "This field is required",
                    })}
                    disabled={isCreatingBooking}
                />
            </FormRow>

            <FormRow label="extras price" error={errors?.extrasPrice?.message}>
                <Input
                    type="number"
                    {...register("extrasPrice")}
                    disabled={isCreatingBooking}
                />
            </FormRow>

            <FormRow label="total price" error={errors?.totalPrice?.message}>
                <Input
                    type="number"
                    readOnly
                    {...register("totalPrice")}
                    disabled={isCreatingBooking}
                />
            </FormRow>

            <FormRow label="num guests" error={errors?.numGuests?.message}>
                <Input
                    type="number"
                    {...register("numGuests", {
                        validate: (value, formValues) => {
                            const cabinMaxCapacity = Number(
                                cabins.find(
                                    (cabin) =>
                                        cabin.id === Number(formValues.cabinId)
                                )?.maxCapacity
                            );
                            return (
                                (Number(value) <= cabinMaxCapacity &&
                                    Number(value) >= 1) ||
                                `capacity must be between 1 and ${cabinMaxCapacity}`
                            );
                        },
                    })}
                    disabled={isCreatingBooking}
                />
            </FormRow>

            <FormRow label="cabin" error={errors?.cabin?.message}>
                <Select
                    options={
                        cabins?.map((cabin) => {
                            return {
                                label: cabin.name,
                                value: cabin.id,
                                id: cabin.id,
                            };
                        }) || []
                    }
                    {...register("cabinId", {
                        required: "This field is required",
                    })}
                    disabled={isCreatingBooking}
                />
            </FormRow>

            <FormRow label="status" error={errors?.status?.message}>
                <Select
                    options={[
                        { value: "unconfirmed", label: "unconfirmed" },
                        { value: "checked-in", label: "checked in" },
                        { value: "checked-out", label: "checked out" },
                    ]}
                    {...register("status")}
                    disabled={isCreatingBooking}
                />
            </FormRow>

            <FormRow label="observations" error={errors?.observations?.message}>
                <Textarea
                    {...register("observations", {
                        required: "This field is required",
                    })}
                    disabled={isCreatingBooking}
                />
            </FormRow>

            <FormRow>
                <Checkbox
                    id="breakfast"
                    {...register("hasBreakfast")}
                    disabled={isCreatingBooking}
                >
                    has breakfast?
                </Checkbox>
            </FormRow>

            <FormRow>
                <Checkbox
                    id="paid"
                    {...register("isPaid")}
                    disabled={isCreatingBooking}
                >
                    is paid?
                </Checkbox>
            </FormRow>

            <Input
                type="hidden"
                name="guestId"
                value={guestId}
                {...register("guestId")}
            />

            <FormRow>
                <Button
                    $variation="secondary"
                    type="reset"
                    disabled={isCreatingBooking}
                    onClick={reset}
                >
                    cancel
                </Button>
                <Button disabled={isCreatingBooking}>create new booking</Button>
            </FormRow>
        </Form>
    );
}

export default CreateBookingForm;
