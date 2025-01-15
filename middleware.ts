import { clerkMiddleware } from '@clerk/nextjs/server';

//サブドメインの Cookie 漏洩攻撃からアプリケーションを保護
export default clerkMiddleware({
    authorizedParties: [`${process.env.APP_URL}`],
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
