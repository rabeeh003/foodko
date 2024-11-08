import { Edit, Trash } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ApiURL } from '../../assets/constData';

const OrderTable = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [filterDate, setFilterDate] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    // Open edit modal
    const openEditModal = (order) => {
        setSelectedOrder(order);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setSelectedOrder(null);
        setIsEditModalOpen(false);
    };

    const handleDateFilterChange = (e) => {
        setFilterDate(e.target.value);
    };

    const handleStatusFilterChange = (e) => {
        setFilterStatus(e.target.value);
    };

    useEffect(() => {
        let filtered = [...orders];

        if (filterDate) {
            filtered = filtered.filter((order) => order.date === filterDate);
        }

        if (filterStatus) {
            filtered = filtered.filter((order) => order.status === filterStatus);
        }

        setFilteredOrders(filtered);
        setCurrentPage(1);
    }, [filterDate, filterStatus, orders]);

    // Handle page change
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= Math.ceil(filteredOrders.length / ordersPerPage)) {
            setCurrentPage(newPage);
        }
    };

    // Fetch orders
    useEffect(() => {
        axios.get(`${ApiURL}orders`)
            .then((res) => {
                setOrders(res.data);
                setFilteredOrders(res.data);
            })
            .catch((err) => {
                console.error("Error fetching orders: ", err);
            });
    }, []);

    // Add order
    const addOrder = async (orderData) => {
        try {
            const res = await axios.post(`${ApiURL}orders`, orderData);
            setOrders([...orders, res.data]);
            setFilteredOrders([...filteredOrders, res.data]);
            closeEditModal();
        } catch (err) {
            console.error("Error adding order: ", err);
        }
    };

    // Edit order
    const editOrder = async (orderId, orderData) => {
        try {
            const res = await axios.put(`${ApiURL}orders/${orderId}`, orderData);
            setOrders(orders.map((order) => (order._id === orderId ? res.data : order)));
            setFilteredOrders(filteredOrders.map((order) => (order._id === orderId ? res.data : order)));
            closeEditModal();
        } catch (err) {
            console.error("Error editing order: ", err);
        }
    };

    // Delete order
    const deleteOrder = async (orderId) => {
        try {
            await axios.delete(`${ApiURL}orders/${orderId}`);
            setOrders(orders.filter((order) => order._id !== orderId));
            setFilteredOrders(filteredOrders.filter((order) => order._id !== orderId));
        } catch (err) {
            console.error("Error deleting order: ", err);
        }
    };

    // Pagination calculation
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    return (
        <div className="p-4 rounded shadow-lg">
            <h2 className='text-lg font-semibold py-2'>Order Table</h2>
            <div className="sm:flex justify-between items-center mb-4">
                <div className="flex items-center gap-1 mt-1">
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
                </div>
                <button className="w-full sm:w-fit px-4 py-2 mt-1 btn btn-outline-primary" onClick={() => setIsEditModalOpen(true)}>Add Order</button>
            </div>
            <div className='overflow-x-auto'>
                <table className="table-auto w-full min-w-[500px] text-left border">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600">
                            <th className="p-3">Date</th>
                            <th className="p-3">Order ID</th>
                            <th className="p-3">Customer Name</th>
                            <th className="p-3">Products</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentOrders.map((order) => (
                            <tr key={order.id} className="border-b">
                                <td className="p-3">{new Date(order.date).toLocaleDateString()}</td>
                                <td className="p-3">{order.orderId}</td>
                                <td className="p-3">{order.name}</td>
                                <td className="p-3">{order.product}</td>
                                <td className="p-3 font-bold">${order.price.toFixed(2)}</td>
                                <td className="p-3">
                                    <button className={`btn btn-sm ${order.status == "Pending" ? 'btn-solid-primary' : order.status == "Delivered" ? 'btn-solid-success' : 'btn-solid-error'}`} >{order.status}</button>
                                </td>
                                <td className="p-3 flex gap-2">
                                    <button className="p-2 btn btn-solid-warning" onClick={() => openEditModal(order)}>
                                        <Edit />
                                    </button>
                                    <button className="p-2 btn btn-solid-error" onClick={() => deleteOrder(order._id)}>
                                        <Trash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`px-3 py-1 bg-gray-200 text-gray-500 rounded ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`px-3 py-1 bg-gray-200 text-gray-500 rounded ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Next
                </button>
            </div>

            {/* Edit Order Modal */}
            {isEditModalOpen && (
                <div className="sm:ms-[18rem] fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-backgroundPrimary rounded-lg p-6 w-96">
                        <h2 className="text-lg font-semibold mb-4">{selectedOrder ? "Edit Order" : "Add Order"}</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target);
                                const orderData = {
                                    name: formData.get('customer'),
                                    product: formData.get('product'),
                                    price: formData.get('price'),
                                    status: formData.get('status') || 'Pending'
                                };
                                if (selectedOrder) {
                                    editOrder(selectedOrder._id, orderData);
                                } else {
                                    addOrder(orderData);
                                }
                            }}
                            className="space-y-4"
                        >
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Customer Name"
                                name="customer"
                                defaultValue={selectedOrder?.name || ''}
                                required
                            />
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Product Name"
                                name="product"
                                defaultValue={selectedOrder?.product || ''}
                                required
                            />
                            <input
                                type="number"
                                className="input input-bordered w-full"
                                placeholder="Price"
                                name="price"
                                defaultValue={selectedOrder?.price || ''}
                                required
                            />
                            {selectedOrder && (
                                <select
                                    className="select w-full"
                                    name="status"
                                    defaultValue={selectedOrder.status}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            )}
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    className="btn btn-solid-error"
                                    onClick={closeEditModal}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-solid-primary">
                                    {selectedOrder ? "Update Order" : "Add Order"}
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
