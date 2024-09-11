import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth({
  pages: {
    signIn: "/",
    error: "/error",
  },
});




export const config = {
  matcher: ['/dashboard(.*)','/api(.*)'],  // Jalur yang dilindungi
}