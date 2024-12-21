import { useForm } from "react-hook-form";
import { useCreateGuest } from "./useCreateGuest";

import { useFlag } from "./useFlag";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

function CreateGuestForm({ setGuestId }) {
    const { createGuest, isCreatingGuest } = useCreateGuest();
    const { getCountryCode } = useFlag();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    function onSubmitGuest(data) {
        getCountryCode(data.nationality, {
            onSuccess: (countryData) => {
                const updatedData = {
                    ...data,
                    countryFlag: `https://flagcdn.com/${countryData[0].altSpellings[0].toLowerCase()}.svg`,
                };

                createGuest(updatedData, {
                    onSuccess: (data) => {
                        console.log(data);
                        setGuestId(data[0].id);
                    },
                });
            },
            onError: () => {
                createGuest(data, {
                    onSuccess: (data) => setGuestId(data[0].id),
                });
            },
        });
    }

    return (
        <Form onSubmit={handleSubmit(onSubmitGuest)}>
            <FormRow label="full name" error={errors?.fullName?.message}>
                <Input
                    type="text"
                    {...register("fullName", {
                        required: "This field is required",
                    })}
                    disabled={isCreatingGuest}
                />
            </FormRow>

            <FormRow label="email" error={errors?.email?.message}>
                <Input
                    type="email"
                    {...register("email", {
                        required: "This field is required",
                    })}
                    disabled={isCreatingGuest}
                />
            </FormRow>

            <FormRow label="national ID" error={errors?.nationalID?.message}>
                <Input
                    type="text"
                    {...register("nationalID", {
                        required: "This field is required",
                    })}
                    disabled={isCreatingGuest}
                />
            </FormRow>

            <FormRow label="nationality" error={errors?.nationality?.message}>
                <Input
                    type="text"
                    {...register("nationality", {
                        required: "This field is required",
                    })}
                    disabled={isCreatingGuest}
                />
            </FormRow>

            <FormRow>
                <Button
                    $variation="secondary"
                    type="reset"
                    disabled={isCreatingGuest}
                >
                    cancel
                </Button>
                <Button disabled={isCreatingGuest}>Add new guest</Button>
            </FormRow>
            <input type="hidden" />
        </Form>
    );
}

export default CreateGuestForm;
