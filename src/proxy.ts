import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const authPages = ["/signin", "/signup"];
const protectedPages = ["/", "/signout"];

function isInPages(request: NextRequest, pages: string[]): boolean {
  return pages.reduce(
    (accumulator, page) => accumulator || request.nextUrl.pathname === page,
    false,
  );
}

function isAuthPage(request: NextRequest): boolean {
  return isInPages(request, authPages);
}

function isProtectedPage(request: NextRequest): boolean {
  return isInPages(request, protectedPages);
}

async function isAuthenticated(): Promise<boolean> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return !!session;
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  if (await isAuthenticated()) {
    if (isAuthPage(request))
      return NextResponse.redirect(new URL("/", request.url));
  } else {
    if (isProtectedPage(request))
      return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
