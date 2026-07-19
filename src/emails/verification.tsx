import { Html, Head, Body, Button } from "react-email";

interface VerificationEmailProps {
  url: string;
}

export default function VerificationEmail({ url }: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Body>
        Thanks for signing up for Intent. Click{" "}
        <Button href={url}>this link</Button> to verify your email address. If
        you didn't create an account, you can safely ignore this email.
      </Body>
    </Html>
  );
}
