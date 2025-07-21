'use client'

import { useEffect, useState } from 'react'
import { db } from '../firebase-config'
import {
    collection,
    getDocs,
    doc,
    updateDoc,
    addDoc,
    serverTimestamp
} from 'firebase/firestore'

export default function AdminDashboard() {
    const [jobs, setJobs] = useState([])
    const [contractorForm, setContractorForm] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [creating, setCreating] = useState(false)

    const fetchJobs = async () => {
        const querySnapshot = await getDocs(collection(db, 'orders'))
        const allJobs = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
        setJobs(allJobs)
    }

    const changeStatus = async (jobId, newStatus) => {
        try {
            await updateDoc(doc(db, 'orders', jobId), {
                status: newStatus
            })
            fetchJobs()
        } catch (err) {
            console.error('Error updating status:', err)
        }
    }

    const handleCreateContractor = async (e) => {
        e.preventDefault()
        setCreating(true)

        try {
            await addDoc(collection(db, 'contractors'), {
                ...contractorForm,
                createdAt: serverTimestamp()
            })

            alert('Contractor created successfully')
            setContractorForm({ name: '', email: '', password: '' })
        } catch (err) {
            console.error('Error creating contractor:', err)
            alert('Error: ' + err.message)
        }

        setCreating(false)
    }

    const approveCompletion = async (job) => {
        try {
            await updateDoc(doc(db, 'orders', job.id), {
                status: 'completed',
                completionApproved: true,
                completionApprovedAt: serverTimestamp()
            })
            fetchJobs()
        } catch (err) {
            console.error('Error approving completion:', err)
        }
    }

    const rejectCompletion = async (job) => {
        try {
            await updateDoc(doc(db, 'orders', job.id), {
                completionRequested: false,
                completionRequestedBy: null,
                completionRequestedAt: null,
                completionApproved: false
            })
            fetchJobs()
        } catch (err) {
            console.error('Error rejecting completion:', err)
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [])

    const renderJobs = (statusLabel) => {
        const filtered = jobs.filter(job => job.status === statusLabel)

        return filtered.map(job => (
            <div key={job.id} className="border border-gray-300 rounded p-4 mb-6 bg-white shadow-sm">
                <h2 className="text-lg font-semibold mb-2">Job ID: {job.id}</h2>
                <p><strong>Customer:</strong> {job.firstName} {job.lastName}</p>
                <p><strong>Email:</strong> {job.email}</p>
                <p><strong>Phone:</strong> {job.phone}</p>
                <p><strong>Address:</strong> {job.address}, {job.city}, {job.state}, {job.zip}</p>
                <p><strong>Date & Time:</strong> {job.scheduledDate} at {job.scheduledTime}</p>
                <p><strong>Bedrooms:</strong> {job.bedrooms}</p>
                <p><strong>Bathrooms:</strong> {job.fullBathrooms} full, {job.halfBathrooms} half</p>
                <p><strong>Home Size:</strong> {job.homeSize}</p>
                <p><strong>Estimated Time:</strong> {job.estimatedTime} mins</p>
                <p><strong>Cleaners Needed:</strong> {job.cleanerCount}</p>
                <p><strong>Price:</strong> ${job.pricing?.finalPrice || '—'}</p>

                <div className="my-2">
                    <strong>Contractors:</strong>
                    {job.contractors?.length > 0 ? (
                        <ul className="list-disc list-inside">
                            {job.contractors.map((c, i) => (
                                <li key={i}>
                                    {c.name} ({c.phone}) - {c.availability}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>None assigned</p>
                    )}
                </div>

                <div className="mt-3">
                    <strong>Status:</strong> {job.status.toUpperCase()}
                </div>

                {job.status !== 'completed' && (
                    <button
                        className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        onClick={() => changeStatus(job.id, 'completed')}
                    >
                        Mark as Completed
                    </button>
                )}
            </div>
        ))
    }

    const renderCompletionRequests = () => {
        const requests = jobs.filter(j => j.completionRequested && !j.completionApproved)

        if (requests.length === 0) {
            return <p>No completion requests waiting.</p>
        }

        return requests.map(job => (
            <div key={job.id} className="border border-yellow-400 rounded p-4 mb-4 bg-yellow-50">
                <p><strong>Job ID:</strong> {job.id}</p>
                <p><strong>Requested by:</strong> {job.completionRequestedBy}</p>
                <p><strong>Customer:</strong> {job.firstName} {job.lastName}</p>
                <p><strong>Address:</strong> {job.address}, {job.city}</p>
                <div className="mt-2 flex gap-2">
                    <button
                        onClick={() => approveCompletion(job)}
                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                        Approve
                    </button>
                    <button
                        onClick={() => rejectCompletion(job)}
                        className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                        Reject
                    </button>
                </div>
            </div>
        ))
    }

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

            {/* create contractor */}
            <div className="mb-10 border p-4 rounded bg-gray-100">
                <h2 className="text-xl font-semibold mb-4">Create New Contractor</h2>
                <form onSubmit={handleCreateContractor} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={contractorForm.name}
                        onChange={(e) => setContractorForm({ ...contractorForm, name: e.target.value })}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={contractorForm.email}
                        onChange={(e) => setContractorForm({ ...contractorForm, email: e.target.value })}
                        className="p-2 border rounded"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Password"
                        value={contractorForm.password}
                        onChange={(e) => setContractorForm({ ...contractorForm, password: e.target.value })}
                        className="p-2 border rounded"
                        required
                    />
                    <button
                        type="submit"
                        disabled={creating}
                        className="col-span-1 md:col-span-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {creating ? 'Creating...' : 'Create Contractor'}
                    </button>
                </form>
            </div>

            {/* completion requests */}
            <div className="mb-10 border p-4 rounded bg-white">
                <h2 className="text-xl font-semibold mb-4">Completion Requests</h2>
                {renderCompletionRequests()}
            </div>

            <h2 className="text-2xl font-semibold mb-4">Open Jobs</h2>
            {renderJobs('open')}

            <h2 className="text-2xl font-semibold mt-8 mb-4">Full Jobs</h2>
            {renderJobs('full')}

            <h2 className="text-2xl font-semibold mt-8 mb-4">Completed Jobs</h2>
            {renderJobs('completed')}
        </div>
    )
}
