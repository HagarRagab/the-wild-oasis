import { useForm } from "react-hook-form";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {}, onClose }) {
    const { isCreating, createCabin } = useCreateCabin();
    const { isEditing, editCabin } = useEditCabin();
    const { id: editId, ...editValues } = cabinToEdit;
    const isEditSession = Boolean(editId);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: isEditSession ? editValues : {},
    });

    function onSubmit(data) {
        // data contains => image => FileList [0] = File (name, other properties)
        const image =
            typeof data.image === "string"
                ? data.image
                : !data.image.length
                ? editValues.image
                : data.image[0];

        if (isEditSession)
            editCabin(
                { newCabinData: { ...data, image }, id: editId },
                {
                    onSuccess: (data) => {
                        reset(data);
                        onClose();
                    },
                }
            );
        else
            createCabin(
                { ...data, image },
                {
                    onSuccess: () => {
                        reset();
                        onClose();
                    },
                }
            );
    }

    const isWorking = isCreating || isEditing;

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            type={onClose ? "modal" : "regular"}
        >
            <FormRow label="Cabin name" error={errors.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register("name", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors.maxCapacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isWorking}
                    {...register("maxCapacity", {
                        required: "This field is required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Regular price" error={errors.regularPrice?.message}>
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isWorking}
                    {...register("regularPrice", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="discount" error={errors.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    disabled={isWorking}
                    defaultValue={0}
                    {...register("discount", {
                        required: "This field is required",
                        validate: (value, formValues) =>
                            formValues.regularPrice >= Number(value) ||
                            "Discount should be less than regular price",
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    disabled={isWorking}
                    defaultValue=""
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Cabin photo">
                <FileInput
                    id="image"
                    disabled={isWorking}
                    accept="image/*"
                    {...register("image", {
                        required: isEditSession
                            ? false
                            : "This field is required",
                    })}
                />
            </FormRow>

            <FormRow>
                <Button $variation="secondary" type="reset" onClick={onClose}>
                    Cancel
                </Button>
                <Button disabled={isWorking}>
                    {isEditSession ? "Edit cabin" : "Create a cabin"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default CreateCabinForm;
