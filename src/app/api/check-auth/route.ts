import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { AUTH_COOKIE_NAME, createAuthGuard } from '~/core/authentication.server';
import { createClient } from '@crystallize/js-api-client';
import { fetchMeOn } from '~/core/fetch-me';

export async function GET() {
    try {
        const guard = createAuthGuard({
            jwtSecret: `${process.env.JWT_SECRET}`,
            crystallizeSignatureSecret: `${process.env.CRYSTALLIZE_SIGNATURE_SECRET}`
        });
        const token = cookies().get(AUTH_COOKIE_NAME);
        const auth = await guard.getAuthFromCookieToken(token?.value || '');
        const client = createClient({
            tenantId: auth.tenantId,
            tenantIdentifier: auth.tenantIdentifier,
            accessTokenId: `${process.env.CRYSTALLIZE_ACCESS_TOKEN_ID}`,
            accessTokenSecret: `${process.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET}`,
        });

        const me = await fetchMeOn(auth.userId, auth.tenantId, { apiClient: client });

        return NextResponse.json({
            isAuthenticated: true,
            auth,
            me,
            now: new Date().toISOString(),
        });
    } catch (e: any) {
        console.log(e)
        return NextResponse.json({
            isAuthenticated: false,
            errorMessage: e.message,
            now: new Date().toISOString()
        });
    }
}
