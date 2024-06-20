// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(['/', '/api/webhooks/stripe', '/api/webhooks/clerk']);

// export default clerkMiddleware((auth, request) => {
//   if(isProtectedRoute(request)){
//     auth().protect()
//   }
// })

export default clerkMiddleware()

// publicRoutes: ['/api/webhooks/clerk']
export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};