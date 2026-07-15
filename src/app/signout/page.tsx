"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Button onClick={handleClick}>Sign Out</Button>
    </div>
  );
}
