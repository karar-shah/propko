"use client";

import { Spinner } from "@/components/ui/spinner";
import serverActions from "@/server/actions";
import { PublicUser } from "@/typing/auth";
import { useState } from "react";

export default function ResendEmailButton({ user }: { user: PublicUser }) {
  const [sending, setSending] = useState(false);
  const handleResendEmail = async () => {
    setSending(true);
    await serverActions.auth.sendeVerificationEmail(user);
    setSending(false);
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
