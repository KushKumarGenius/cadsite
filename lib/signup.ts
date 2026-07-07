/** Sign-ups are closed unless SIGNUP_CLOSED is explicitly "false" or "0". */
export function isSignupClosed(): boolean {
  const v = process.env.SIGNUP_CLOSED;
  if (v === "false" || v === "0") return false;
  return true;
}

export const SIGNUP_CLOSED_MESSAGE =
  "Thanks for your interest — we've reached our capacity for this session and aren't accepting more sign-ups. We're sorry we can't take everyone this time.";
