import { authOptions } from "@/lib/authConfig";
import { getServerSession } from "next-auth";

export default async function useProviderAuth() {
    const user = await getServerSession(authOptions);
    return {
        name: user?.user?.name,
        email: user?.user?.email,
        image: user?.user?.image,
    }
}