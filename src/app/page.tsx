'use client';
import Image from 'next/image'
import flow from '~/assets/nextjsauth.png'
import header from '~/assets/header.jpeg'
import Link from 'next/link'
import { useState } from 'react';


export default function Home() {
    const [auth, setAuth] = useState(false)
    const [loading, setLoading] = useState(false)
    return (
        <main className="flex min-h-screen flex-col items-center p-2">
            <Image
                src={header}
                alt="Crystallize"
            />
            <div className="font-mono text-sm lg:flex p-10 text-center">
                <p>
                    This is a Crystallize App using Next JS and Tailwind CSS <br />
                    If you see that page it means you have been authenticated.
                </p>
            </div>
            <div className="inline-flex rounded-md shadow-sm mb-4" role="group">
                <Link className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white" href="/internal">Let&apos;s try to go to another page</Link>
                <Link className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white" href="/me">Server Side Me (caching involved)</Link>

                <button
                    type="button"
                    disabled={loading}
                    onClick={async () => {
                        setLoading(true)
                        /* this is a pure example of a API Page, with RSC fetch are not that common */
                        const response = await fetch('/api/check-auth').then(res => res.json())
                        setAuth(response)
                        setLoading(false)
                    }}
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                >
                    Frontend Status with API Route
                </button>
            </div>
            {loading && (<p>Loading...</p>)}
            {auth && (
                <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                    <span className="font-medium">Success alert!</span>

                    <div className="border p-4 rounded-lg shadow-md bg-gray-50 text-gray-900">
                        <pre className="whitespace-pre-wrap">
                            {JSON.stringify(auth, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
            <Image
                src={flow}
                width={800}
                alt="Flow"
            />
        </main >
    )
}
