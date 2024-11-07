import { Edit, Trash } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const OrderTable = () => {
    const [orders, setOrders] = useState([
        { id: 'ORD001', date: '2023-11-05', customer: 'John Doe', items: [{ name: 'Item 1', price: 10 }, { name: 'Item 2', price: 15 }], totalPrice: 25, status: 'Pending' },
        { id: 'ORD002', date: '2023-11-06', customer: 'Jane Smith', items: [{ name: 'Item 3', price: 20 }], totalPrice: 20, status: 'Delivered' },
        // Add more orders as needed
    ]);
    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState(''); // New state for status filter
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 1;

    const openOrderModal = (order) => {
        setSelectedOrder(order);
        setIsOrderModalOpen(true);
    };

    const openEditModal = (order) => {
        setSelectedOrder(order);
        setIsEditModalOpen(true);
    };

    const getStatusBadge = (status) => {
        const badgeColor = status === 'Pending' ? 'btn-solid-warning' : status === 'Delivered' ? 'btn-solid-success' : 'btn-solid-error';
        return <span className={`btn btn-sm ${badgeColor}`}>{status}</span>;
    };

    // Pagination calculation
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handleDateFilterChange = (e) => {
        const selectedDate = e.target.value;
        setFilterDate(selectedDate);
    };

    const handleStatusFilterChange = (e) => {
        const selectedStatus = e.target.value;
        setFilterStatus(selectedStatus);
    };

    useEffect(() => {
        let filtered = orders;

        if (filterDate) {
            filtered = filtered.filter((order) => order.date === filterDate);
        }

        if (filterStatus) {
            filtered = filtered.filter((order) => order.status === filterStatus);
        }

        setFilteredOrders(filtered);
    }, [filterDate, filterStatus, orders]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="p-4 bg-white rounded shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <input
                    type="date"
                    className="input input-bordered max-w-xs"
                    value={filterDate}
                    onChange={handleDateFilterChange}
                />
                <select
                    className="input input-bordered max-w-xs"
                    value={filterStatus}
                    onChange={handleStatusFilterChange}
                >
                    <option value="">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                </select>
                <button className="px-4 py-2 btn btn-outline-primary" onClick={() => setIsEditModalOpen(true)}>Add Order</button>
            </div>

            <table className="table-auto w-full text-left border rounded-lg">
                <thead>
                    <tr className="bg-gray-100 text-gray-600">
                        <th className="p-3">Date</th>
                        <th className="p-3">Order ID</th>
                        <th className="p-3">Customer Name</th>
                        <th className="p-3">Products</th>
                        <th className="p-3">Total Price</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentOrders.map((order) => (
                        <tr key={order.id} className="border-b">
                            <td className="p-3">{order.date}</td>
                            <td className="p-3">{order.id}</td>
                            <td className="p-3">{order.customer}</td>
                            <td className="p-3">
                                <span className="badge badge-flat-primary badge-md" onClick={() => openOrderModal(order)}>
                                    View ({order.items.length})
                                </span>
                            </td>
                            <td className="p-3 font-bold">${order.totalPrice.toFixed(2)}</td>
                            <td className="p-3">{getStatusBadge(order.status)}</td>
                            <td className="p-3 flex gap-2">
                                <button className="p-2 btn btn-solid-warning" onClick={() => openEditModal(order)}><Edit /></button>
                                <button className="p-2 btn btn-solid-error"><Trash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 bg-gray-200 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 bg-gray-200 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Next
                </button>
            </div>

            {/* Order Modal */}
            {isOrderModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-lg font-semibold mb-4">Order Details</h2>
                        {selectedOrder && (
                            <div className="space-y-4">
                                <h3 className="text-md font-semibold">Customer: {selectedOrder.customer}</h3>
                                <ul className="space-y-2">
                                    {selectedOrder.items.map((item, index) => (
                                        <li key={index} className="flex justify-between">
                                            <span>{item.name}</span>
                                            <span>${item.price.toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>
                                <h4 className="text-md font-semibold">Total: ${selectedOrder.totalPrice.toFixed(2)}</h4>
                            </div>
                        )}
                        <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded" onClick={() => setIsOrderModalOpen(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Edit Order Modal */}
            {isEditModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded w-96">
                        <h2 className="text-lg font-semibold mb-4">{selectedOrder ? "Edit Order" : "Add Order"}</h2>
                        <form className="space-y-4">
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Customer Name"
                                defaultValue={selectedOrder?.customer || ''}
                            />
                            <input
                                type="date"
                                className="input input-bordered w-full"
                                defaultValue={selectedOrder?.date || ''}
                            />
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                                    onClick={() => setIsEditModalOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
                                    {selectedOrder ? "Update" : "Add"} Order
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderTable;
