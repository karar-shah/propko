"use client";

import { Spinner } from "@/components/ui/spinner";
import serverActions from "@/server/actions";
import { IUser } from "@/server/lib/db/schemas/users";
import { useState } from "react";

export default function ResendEmailButton({ user }: { user: IUser }) {
  const [sending, setSending] = useState(false);
  const handleResendEmail = async () => {
    setSending(true);
    await serverActions.auth.sendeVerificationEmail({
      email: user.email,
      emailVerified: user.emailVerified,
      id: user.id,
    });
    setSending(false)
  };
  return (
    <button className="link" onClick={handleResendEmail} disabled={sending}>
      {sending ? (
        <Spinner className="border-primary w-4 h-4" />
      ) : (
        "Resend Email"
      )}
    </button>
  );
}
