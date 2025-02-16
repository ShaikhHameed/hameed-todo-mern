'use client';
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";


export default function Navbar(){

    const { data: session } = useSession();

    return(
        <>
            <div className="container mx-auto">
                <nav className="flex p-3 justify-between rounded-xl">
                    <div>
                        <Link href={'/tasks'}><span className="font-bold text-blue-700 text-3xl">.MyTasks </span></Link>
                    </div>
                    <div>
                    {session?
                        <div className="flex gap-3">
                        <button onClick={()=>{signOut()}} className="bg-red-700 text-white px-3 font-normal py-2 rounded-lg hover:bg-red-800">Logout</button>
                        </div>
                    :
                        <Link href={'/auth/login'}><button className="bg-blue-700 text-white px-5 font-normal py-2 rounded-lg hover:bg-blue-800">Login</button></Link>
                    }
                    </div>
                </nav>
            </div>
        </>
    )

}