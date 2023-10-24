
import Image from 'next/image'
import invalid from '~/assets/invalid.png'

export default function InvalidPage() {
    return (
        <main className="flex min-h-screen flex-col items-center p-2 text-center">
            <Image
                src={invalid}
                width={400}
                alt="Crystallize Security"
            />
            <div className="font-mono text-sm lg:flex p-10 text-center">
                <p>
                    You are trying to access the page without authentication.
                </p>
            </div>
        </main>
    )
}
