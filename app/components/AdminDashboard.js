'use client'

import { useEffect, useState } from 'react';
import { db } from '../firebase-config';
import {
    collection,
    getDocs,
    doc,
    updateDoc
} from 'firebase/firestore';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'orders'));
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            const pending = data.filter(order => order.status !== 'completed');
            const completed = data.filter(order => order.status === 'completed');

            setOrders(pending);
            setCompletedOrders(completed);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const markAsCompleted = async (orderId) => {
        try {
            const orderRef = doc(db, 'orders', orderId);
            await updateDoc(orderRef, {
                status: 'completed'
            });
            fetchOrders();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const renderTable = (ordersList, showAction) => (
        <div className="overflow-x-auto mb-10">
            <table className="min-w-full border border-gray-300 text-left">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Phone</th>
                        <th className="p-2 border">Address</th>
                        <th className="p-2 border">City</th>
                        <th className="p-2 border">State</th>
                        <th className="p-2 border">Bedrooms</th>
                        <th className="p-2 border">Scheduled Date</th>
                        <th className="p-2 border">Scheduled Time</th>
                        <th className="p-2 border">Frequency</th>
                        <th className="p-2 border">Addons</th>
                        <th className="p-2 border">Price</th>
                        {showAction && <th className="p-2 border">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {ordersList.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50 border-b">
                            <td className="p-2 border">{order.firstName} {order.lastName}</td>
                            <td className="p-2 border">{order.email}</td>
                            <td className="p-2 border">{order.phone}</td>
                            <td className="p-2 border">{order.address}</td>
                            <td className="p-2 border">{order.city}</td>
                            <td className="p-2 border">{order.state}</td>
                            <td className="p-2 border">{order.bedrooms}</td>
                            <td className="p-2 border">{order.scheduledDate}</td>
                            <td className="p-2 border">{order.scheduledTime}</td>
                            <td className="p-2 border">{order.frequencyLabel}</td>
                            {/* <td className="p-2 border">
                                {order.addons?.length > 0 ? order.addons.map((a, i) => (
                                    <div key={i}>{a.name}</div>
                                )) : 'None'}
                            </td> */}
                            <td className="p-2 border">
                                {order.addons?.length > 0
                                    ? order.addons.map((a, i) => (
                                        <div key={i}>
                                            {a.id} (${a.price})
                                        </div>
                                    ))
                                    : 'None'}
                            </td>

                            <td className="p-2 border">${order.pricing?.finalPrice?.toFixed(2) || '—'}</td>
                            {showAction && (
                                <td className="p-2 border">
                                    <button
                                        onClick={() => markAsCompleted(order.id)}
                                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                                    >
                                        Mark Completed
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Pending Orders</h1>
            {renderTable(orders, true)}

            <h2 className="text-xl font-semibold mb-4">Completed Orders</h2>
            {renderTable(completedOrders, false)}
        </div>
    );
};

export default AdminDashboard;
