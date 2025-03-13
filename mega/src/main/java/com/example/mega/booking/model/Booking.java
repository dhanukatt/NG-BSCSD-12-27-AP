import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Booking {
    bookingId: number;
    bookingNumber: string;
    customerId: number;
    vehicleId: number;
    driverId: number;
    pickupAddress: string;
    destinationAddress: string;
    pickupTime: string;
    dropoffTime: string;
    status: string;
    distance: number;
    amount: number;
    bookingDate: string;
}

const BookingList: React.FC = () => {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('/bookings'); // Fetch data from the backend
                setBookings(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch bookings');
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <div className="text-gray-300 p-4">Loading bookings...</div>;
    if (error) return <div className="text-red-400 p-4">{error}</div>;

    return (
        <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-indigo-500 mb-4">Booking List</h2>
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-gray-700">
                        <th className="py-2">Booking Number</th>
                        <th className="py-2">Pickup Address</th>
                        <th className="py-2">Destination Address</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking.bookingId} className="border-b border-gray-700 hover:bg-gray-800">
                            <td className="py-2">{booking.bookingNumber}</td>
                            <td className="py-2">{booking.pickupAddress}</td>
                            <td className="py-2">{booking.destinationAddress}</td>
                            <td className="py-2">{booking.status}</td>
                            <td className="py-2">{booking.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookingList;