'use client'

import { useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import { db } from '@/app/firebase-config'

export default function ContractorLoginPage() {
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')

        try {
            const querySnapshot = await getDocs(collection(db, 'contractors'))
            const contractors = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

            const match = contractors.find(
                c => c.email === email.trim() && c.password === password.trim()
            )

            if (match) {
                localStorage.setItem('contractor', JSON.stringify(match))
                router.push('/contractor/jobs')
            } else {
                setError('Invalid email or password')
            }
        } catch (err) {
            console.error('Login error:', err)
            setError('Something went wrong')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Contractor Login</h2>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-4 p-2 border border-gray-300 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </div>
    )
}
