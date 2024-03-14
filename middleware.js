import { withAuth } from "next-auth/middleware";

// middleware is applied to all routes, use conditionals to select

export default withAuth(
  function middleware(req) {
    console.log(req.nextauth.token);
  },
  {
    callbacks: {
      // authorized: ({ token }) =>  (token ? true : false),
      // authorized: ({ token }) => !!token || token?.role === "admin",
      authorized: ({ req, token }) => {
        console.log("token In middleware0", token);
        if (req.nextUrl.pathname.startsWith("/customers") && token === null) {
          return false;
        }
        return true;
      },
    },
  }
);
// export const config = { matcher: ["/customer"] };
