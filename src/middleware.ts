import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIE_NAME, createAuthGuard } from './core/authentication.server';

const COOKIE_EXPIRES_IN = 5;

export async function middleware(request: NextRequest) {
    const requestedPath = request.nextUrl.pathname;
    if (requestedPath.endsWith('.ico')) {
        return;
    }
    if (requestedPath.startsWith('/_next/')) {
        return;
    }
    if (requestedPath.startsWith('/invalid')) {
        return;
    }

    try {
        const guard = createAuthGuard({
            jwtSecret: `${process.env.JWT_SECRET}`,
            crystallizeSignatureSecret: `${process.env.CRYSTALLIZE_SIGNATURE_SECRET}`
        });

        const cookie = request.cookies.get(AUTH_COOKIE_NAME) ?? '';
        if (!cookie) {
            const signature = request.nextUrl.searchParams.get("crystallizeSignature") || "";

            if (!signature) {
                throw new Error("No Signature has been found.")
            }
            const payload = await guard.decodeCrystallizeSignature(signature);
            const host = request.headers.get('host') || request.nextUrl.host;
            const token = await guard.createCookieToken({
                tenantId: payload.tenantId,
                tenantIdentifier: payload.tenantIdentifier,
                userId: payload.userId,
            }, {
                expiresIn: COOKIE_EXPIRES_IN + 'd',
                audience: host,
                issuer: 'nextjs-crystallize-app-with-auth',
                subject: 'crystallize-app',
            });

            const response = NextResponse.redirect(new URL('/', request.url))
            response.cookies.set(AUTH_COOKIE_NAME, token, {
                path: '/',
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                domain: host,
                expires: new Date(Date.now() + COOKIE_EXPIRES_IN * 3600 * 24),
            })
            return response;
        }
        await guard.getAuthFromCookieToken(cookie.value);
    } catch (e) {
        console.log('Middleware exception', e)
        return NextResponse.redirect(new URL('/invalid', request.url));
    }
}
