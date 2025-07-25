'use client'

import { useEffect, useState } from 'react'
import { db } from '@/app/firebase-config'
import {
    collection,
    getDocs,
    doc,
    updateDoc,
    serverTimestamp
} from 'firebase/firestore'
import { useRouter } from 'next/navigation'

export default function ContractorJobsPage() {
    const router = useRouter()
    const [contractor, setContractor] = useState(null)
    const [jobs, setJobs] = useState([])

    // load contractor from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('contractor')
        if (stored) {
            setContractor(JSON.parse(stored))
        } else {
            router.push('/contractor/login')
        }
    }, [])

    // fetch jobs visible to this contractor
    useEffect(() => {
        if (!contractor) return

        const fetchJobs = async () => {
            const snap = await getDocs(collection(db, 'orders'))
            const allJobs = snap.docs.map(d => ({ id: d.id, ...d.data() }))

            // show open jobs plus jobs already claimed by this contractor
            const myJobs = allJobs.filter(job => {
                const isMine = job.contractors?.some(c => c.email === contractor.email)
                return isMine || job.status === 'open'
            })

            setJobs(myJobs)
        }

        fetchJobs()
    }, [contractor])

    const handleClaim = async (job) => {
        const contractorEntry = {
            name: contractor.name,
            email: contractor.email,
            phone: contractor.phone || 'N/A',
            availability: contractor.availability || 'N/A'
        }

        const updatedContractors = [...(job.contractors || []), contractorEntry]
        const isFull = updatedContractors.length >= job.cleanerCount
        const jobRef = doc(db, 'orders', job.id)

        await updateDoc(jobRef, {
            contractors: updatedContractors,
            status: isFull ? 'full' : job.status
        })

        alert('Job claimed successfully')
        window.location.reload()
    }

    const requestCompletion = async (job) => {
        const jobRef = doc(db, 'orders', job.id)
        await updateDoc(jobRef, {
            completionRequested: true,
            completionRequestedBy: contractor.email,
            completionRequestedAt: serverTimestamp(),
            completionApproved: false
        })
        alert('Completion request sent to admin')
        window.location.reload()
    }

    if (!contractor) return null

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Welcome, {contractor.name}</h1>

            {jobs.length === 0 && <p>No jobs available.</p>}

            {jobs.map(job => {
                const isMine = job.contractors?.some(c => c.email === contractor.email)
                const isOpen = job.status === 'open'
                const alreadyRequested = job.completionRequested && !job.completionApproved
                const isCompleted = job.status === 'completed'

                return (
                    <div key={job.id} className="border p-4 mb-4 rounded shadow-sm bg-white">
                        <p><strong>Job ID:</strong> {job.id}</p>
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
                        <p><strong>Frequency:</strong> {job.frequencyLabel} ({job.frequencyDiscount}% off)</p>

                        {job.cleaningType === 'airbnb' && (
                            <>
                                <p><strong>Subscription Length:</strong> {job.subscriptionLength} months</p>
                                <p><strong>Calendar Link:</strong> {job.calendarLink}</p>
                            </>
                        )}

                        <p><strong>Status:</strong> {job.status}</p>

                        <div className="mt-2">
                            <strong>Pricing:</strong>
                            <ul className="list-disc list-inside ml-4">
                                <li>Base Price: ${job.pricing?.basePrice?.toFixed(2) || '—'}</li>
                                <li>Add-ons: ${job.pricing?.addonTotal?.toFixed(2) || '—'}</li>
                                <li>Subtotal: ${job.pricing?.subtotal?.toFixed(2) || '—'}</li>
                                <li>Discounts: -${job.pricing?.totalDiscount?.toFixed(2) || '—'}</li>
                                <li>Final Price: <strong>${job.pricing?.finalPrice?.toFixed(2) || '—'}</strong></li>
                            </ul>
                        </div>

                        {isMine && isCompleted && (
                            <p className="text-green-600 mt-2">Completed. Thank you.</p>
                        )}

                        {isMine && alreadyRequested && !isCompleted && (
                            <p className="text-yellow-600 mt-2">Completion review pending admin approval.</p>
                        )}

                        {isMine && !alreadyRequested && !isCompleted && (
                            <button
                                onClick={() => requestCompletion(job)}
                                className="mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                            >
                                Mark job completed
                            </button>
                        )}

                        {!isMine && isOpen && (
                            <button
                                onClick={() => handleClaim(job)}
                                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Claim this job
                            </button>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
