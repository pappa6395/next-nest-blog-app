"use server"

import { print } from "graphql";
import { fetchGraphQL } from "../fetchGraphQL";
import { SignUpFormState } from "../types/formState";
import { SignUpFormSchema } from "../zodSchemas/signUpFormSchema";
import { CREATE_USER_MUTATION, SIGN_IN_MUTATION } from "../gqlQueries";
import { redirect } from "next/navigation";
import { LoginFormSchema } from "../zodSchemas/loginFormSchema";
import { revalidatePath } from "next/cache";
import { createSession } from "../session";


export async function SignUp(
    state: SignUpFormState, 
    formData: FormData
): Promise<SignUpFormState> {

    const validatedFields = SignUpFormSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    if (!validatedFields.success) {
        return {
            data: {},
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    const data = await fetchGraphQL(print(CREATE_USER_MUTATION), {
        input: {
            ...validatedFields.data,
        }
    })

    if (data.errors) {
        return { 
            data: Object.fromEntries(formData.entries()), 
            errors: {}, 
            message: "Something went wrong" 
        };
    }
    redirect("/auth/signin");
        
}

export async function SignIn(state: SignUpFormState, formData: FormData): Promise<SignUpFormState> {

    const validateFields = LoginFormSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validateFields.success) {
        return {
            data: {},
            errors: validateFields.error.flatten().fieldErrors,
        };
    }

    const data = await fetchGraphQL(print(SIGN_IN_MUTATION), {
        input: {
            ...validateFields.data
        }
    })

    if (data.errors) {
        return { 
            data: Object.fromEntries(formData.entries()), 
            errors: {}, 
            message: "Invalid Credentials" 
        };
    }
    // Create a session
    const newSession =await createSession({ 
        user: {
            id: data.signIn.id,
            name: data.signIn.name,
            avatar: data.signIn.avatar  // Assuming avatar is a URL
        }, 
        accessToken: data.signIn.accessToken 
    });
    console.log(newSession);

    revalidatePath("/")
    redirect("/")
}