'use client'
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

const ProfilePage = () => {
    const router = useRouter()
    const [data, setData] = useState('nothing');

    const logout = async () => {
        try {
            await axios.get(('/api/users/logout'))
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)
        }
    }
    const getUSerDetails = async () => {
        const res = await axios.get('/api/users/me');
        console.log(res.data)
        setData(res.data.data._id);
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <h2 className="p-2 roundedbg-green-500">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4">LogOUt</button>

            <button onClick={getUSerDetails} className="bg-green-900 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4">Get USeer Details</button>
        </div>
    )
}

export default ProfilePage