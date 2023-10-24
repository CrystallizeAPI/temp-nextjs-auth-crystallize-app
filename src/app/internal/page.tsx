import header from '~/assets/header.jpeg'
import Image from 'next/image'
import Link from 'next/link'

export default function InternalPage() {
    return (
        <main className="flex min-h-screen flex-col items-center p-2">
            <Image
                src={header}
                alt="Crystallize"
            />
            <div className="font-mono text-sm lg:flex p-10 text-center">
                <p>
                    That page demo the navigation within the iFrame. Signature does not persist between pages. But cookie does.
                </p>
            </div>
            <Link className="rounded bg-red-400 p-3 m-3 hover:bg-red-600 hover:text-white" href="/">Let&apos;s go back to the home page</Link>

        </main>
    )
}
