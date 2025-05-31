'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [sortField, setSortField] = useState('booking_date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [editingStatus, setEditingStatus] = useState({}); // Track status changes per booking
  const [updateStatus, setUpdateStatus] = useState({}); // Track update feedback
  const [isUpdating, setIsUpdating] = useState(false); // Track update in progress

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/booking', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error(`Failed to fetch bookings: ${response.statusText}`);
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder(sortField === field && sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleStatusChange = (bookingId, newStatus) => {
    setEditingStatus(prev => ({
      ...prev,
      [bookingId]: newStatus,
    }));
  };

  const updateBookingStatus = async (bookingId) => {
    const newStatus = editingStatus[bookingId];
    if (!newStatus || newStatus === bookings.find(b => b.id === bookingId).status) {
      setUpdateStatus(prev => ({ ...prev, [bookingId]: 'No changes to save' }));
      setTimeout(() => setUpdateStatus(prev => ({ ...prev, [bookingId]: null })), 3000);
      return;
    }

    try {
      setIsUpdating(true);
      setUpdateStatus(prev => ({ ...prev, [bookingId]: null })); // Clear previous message
      const response = await fetch(`/api/booking/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      // Log response for debugging
      console.log('Response status:', response.status);
      console.log('Response headers:', [...response.headers]);

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      let errorData = {};
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json().catch(() => ({})); // Fallback to empty object if JSON parsing fails
      } else {
        const text = await response.text();
        console.log('Non-JSON response:', text);
        errorData = { error: text || 'Invalid response from server' };
      }

      if (!response.ok) {
        throw new Error(errorData.error || `Failed to update status: ${response.statusText}`);
      }

      // Refetch bookings to reload the table
      await fetchBookings();
      setEditingStatus(prev => ({ ...prev, [bookingId]: null })); // Clear editing state
      setUpdateStatus(prev => ({ ...prev, [bookingId]: 'Status updated successfully' }));
      setTimeout(() => setUpdateStatus(prev => ({ ...prev, [bookingId]: null })), 3000); // Clear message after 3s
    } catch (err) {
      console.error('Update error:', err);
      setUpdateStatus(prev => ({ ...prev, [bookingId]: `Error: ${err.message}` }));
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredBookings = bookings
    .filter(booking => 
      (!filterType || booking.type === filterType) &&
      (!filterStatus || booking.status === filterStatus)
    )
    .sort((a, b) => {
      const multiplier = sortOrder === 'asc' ? 1 : -1;
      if (sortField === 'booking_date') {
        return multiplier * (new Date(a.booking_date) - new Date(b.booking_date));
      }
      if (sortField === 'total_price') {
        return multiplier * (parseFloat(a.total_price) - parseFloat(b.total_price));
      }
      return multiplier * (a[sortField] - b[sortField]);
    });

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">Lịch sử đặt hàng</h1>

      {/* Filters */}
      <div className="mb-6 flex gap-4">
        <select 
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <option value="">Loại</option>
          <option value="tour">Tour</option>
          <option value="flight">Vé máy bay</option>
        </select>

        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        >
          <option value="">Trạng thái</option>
          <option value="pending">Chờ </option>
          <option value="confirmed">Xác nhận</option>
          <option value="cancelled">Hủy</option>
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center text-gray-600">Đang tải ...</div>
      ) : error ? (
        <div className="text-red-500 text-center font-medium">{error}</div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <tr>
                {['ID', 'User ID', 'Loại', 'Tour/Vé ID', 'Tổng giá', 'Trạng thái', 'Ngày đặt'].map((header, idx) => (
                  <th 
                    key={idx}
                    onClick={() => handleSort(header.toLowerCase().replace(' ', '_'))}
                    className="px-6 py-3 text-left text-sm font-medium cursor-pointer hover:bg-blue-700 transition duration-200"
                  >
                    {header} {sortField === header.toLowerCase().replace(' ', '_') && (
                      <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr 
                  key={booking.id} 
                  className={`border-b border-gray-200 transition duration-200 ${
                    index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } hover:bg-blue-50`}
                >
                  <td className="px-6 py-4 text-gray-800">{booking.id}</td>
                  <td className="px-6 py-4 text-gray-800">{booking.user_id}</td>
                  <td className="px-6 py-4 text-gray-800 capitalize">{booking.type}</td>
                  <td className="px-6 py-4 text-gray-800">
                    {booking.type === 'tour' ? booking.tour_id : booking.flight_ticket_id}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {parseFloat(booking.total_price) || '0.00'} VNĐ
                  </td>
                  <td className="px-6 py-4">
                    {booking.status === 'pending' ? (
                      <div className="flex items-center gap-3">
                        <select
                          value={editingStatus[booking.id] || booking.status}
                          onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                          className="w-32 py-2 px-3 border border-gray-200 rounded-md bg-white shadow-md text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:bg-gray-50 transition duration-150"
                          disabled={isUpdating}
                        >
                          <option value="pending">Chờ</option>
                          <option value="confirmed">Xác nhận</option>
                          <option value="cancelled">Hủy</option>
                        </select>
                        <button
                          onClick={() => updateBookingStatus(booking.id)}
                          disabled={isUpdating || !editingStatus[booking.id] || editingStatus[booking.id] === booking.status}
                          className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition duration-150"
                        >
                          {isUpdating ? 'Saving...' : 'Save'}
                        </button>
                        {updateStatus[booking.id] && (
                          <span className={`block mt-1 text-sm ${
                            updateStatus[booking.id].includes('Error') ? 'text-red-500' : 'text-green-500'
                          }`}>
                            {updateStatus[booking.id]}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-800">
                    {format(new Date(booking.booking_date), 'PPp')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}