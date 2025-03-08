import * as jose from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type Session = {
    user: SessionUser;
    accessToken: string;
}

export type SessionUser = {
    id?: string;
    name?: string;
    avatar?: string;
}

const secretKey = process.env.SESSION_SECRET_KEY!
const encodedKey = new TextEncoder().encode(secretKey)

export async function createSession(payload: Session) {
    const session =  await new jose.SignJWT(payload).setProtectedHeader({alg:"HS256",})
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
    
    const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    (await cookies()).set("session", session, {
        httpOnly: true,
        secure: true,
        expires: expiredAt,
        sameSite: "lax",
        path: "/",
    });
}

export async function getSession() {
    const cookie = (await cookies()).get("session")?.value;
    if (!cookie) return null;

    try {
        const { payload } = await jose.jwtVerify(cookie, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload as Session;

    } catch (err) {
        console.error("Failed to verify the session",err);
        redirect("/auth/signin");
    }
    
}

export async function deleteSession() {
    (await cookies()).delete("session");
}