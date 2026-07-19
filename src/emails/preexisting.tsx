import { Html, Head, Body } from "react-email";

export default function PreexistingAccountEmail() {
  return (
    <Html>
      <Head />
      <Body>
        Someone tried to create an account using your email address. If this was
        you, you already have an account. If this wasn't you, no action is
        needed. Your account is secure.
      </Body>
    </Html>
  );
}
