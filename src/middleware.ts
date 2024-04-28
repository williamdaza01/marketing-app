export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/participants/:path*", "/transactions", "/api/comissions", "/api/transactions","/api/participants/:path*"],
};
