"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignOut() {
  const router = useRouter();

  async function handleClick() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  }

  return <button onClick={handleClick}>Sign Out</button>;
}
