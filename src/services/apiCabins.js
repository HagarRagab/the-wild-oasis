import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
        .from("cabins")
        .select("*")
        .order("created_at", { ascending: true });
    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }

    return data;
}

export async function createEditCabin(newCabin, id) {
    // Check if image is FileList (incase adding new image) or path(incase keeping the old image)
    const hasImagePath = typeof newCabin.image === "string";

    const imageName = `${crypto.randomUUID()}-${
        newCabin.image.name
    }`.replaceAll("/", "");

    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    // Create / edit cabin
    let query = supabase.from("cabins");

    // Inserting new row (new cabin)
    if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

    // Editing cabin
    if (id)
        query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

    const { data, error } = await query.select().single();

    if (error) {
        console.error(error.message);
        throw new Error("Cabin could not be created");
    }

    // Return data directly without uploading data incase there is an img path
    if (hasImagePath) return data;

    // Uploading image to supabase storage
    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    // Deleting cabin incase the image cannot be uploaded
    if (storageError) {
        query.delete().eq("id", data.id);
        console.error(storageError);
        throw new Error(
            "Cabin image cannot be uploaded and the new cabin was deleted"
        );
    }

    return data;
}

export async function deleteCabin(id) {
    const { error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted");
    }
}
