
import { createClient } from '@crystallize/js-api-client';
import { cookies } from 'next/headers';
import Image from 'next/image'
import Link from 'next/link';
import { use } from 'react';
import header from '~/assets/header.jpeg'
import { AUTH_COOKIE_NAME, createAuthGuard } from '~/core/authentication.server';
import { fetchMeOn } from '~/core/fetch-me';


async function getMe() {
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
    return {
        isAuthenticated: true,
        auth,
        me: await fetchMeOn(auth.userId, auth.tenantId, { apiClient: client }),
        now: new Date().toISOString(),
    };
}

// cache for 10sec only
export const revalidate = 10

export default function MePage() {
    const me = use(getMe());
    return (
        <main className="flex min-h-screen flex-col items-center p-2 text-center">
            <Image
                src={header}
                alt="Crystallize"
            />
            <div className="font-mono text-sm lg:flex p-10 text-center">
                <p>
                    This is show a React Server Side Components
                </p>
            </div>
            <div className="border p-4 rounded-lg shadow-md bg-gray-50 text-gray-900 text-left">
                <pre className="whitespace-pre-wrap">
                    {JSON.stringify(me, null, 2)}
                </pre>
            </div>
            <Link className="rounded bg-red-400 p-3 m-3 hover:bg-red-600 hover:text-white" href="/">Let&apos;s go back to the home page</Link>

        </main>
    )
}
