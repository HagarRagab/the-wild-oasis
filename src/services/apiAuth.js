import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                fullName,
                avatar: "",
            },
        },
    });

    if (error) throw new Error(error.message);
    return data;
}

export async function login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);

    return data;
}

export async function getCurrentUser() {
    const { data, error } = await supabase.auth.getSession();

    if (!data.session) return null;
    if (error) throw new Error(error.message);

    // We can get user's data from the session but it's more secured to download it again from supabase
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return user;
}

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

export async function updateUser({ fullName, password, avatar }) {
    // 1) Update fullName OR Password
    let updateData;
    if (fullName) updateData = { data: { fullName } };
    if (password) updateData = { password };

    const { data, error } = await supabase.auth.updateUser(updateData);
    if (error) throw new Error(error.message);
    if (!avatar) return data;

    // 2) Uplodad image to supabase storage
    const fileName = `avatar-${data.user.id}-${Math.random()}`;

    const { error: storageError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);
    if (storageError) throw new Error(error);

    // 3) Update user's data
    const { updatedUser, error: updateError } = await supabase.auth.updateUser({
        data: {
            avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
        },
    });
    if (updateError) throw new Error(error.message);
    return updatedUser;
}
