import { Html, Head, Body, Button } from "react-email";

interface VerificationEmailProps {
  url: string;
}

export default function VerificationEmail({ url }: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Body>
        <Button href={url}>Verify</Button>
      </Body>
    </Html>
  );
}
