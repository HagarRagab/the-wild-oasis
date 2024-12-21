import supabase from "./supabase";

export async function createGuest(newGuest) {
    const { data, error } = await supabase
        .from("guests")
        .insert([newGuest])
        .select();

    if (error) {
        console.error(error.message);
        throw new Error(error.message);
    }

    return data;
}

export async function findGuest({ fullName }) {
    const result = await supabase
        .from("guests")
        .select()
        .textSearch("fullName", fullName, {
            config: "english",
        });

    return result;
}

export async function getCountryCode(country) {
    try {
        const res = await fetch(
            `https://restcountries.com/v3.1/name/${country}`
        );
        const data = await res.json();
        if (!res.ok) throw new Error("Cannot get country code");
        return data;
    } catch (error) {
        console.error(error.message);
        throw new Error(error.message);
    }
}
