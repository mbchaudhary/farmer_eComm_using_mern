import React, { useEffect, useState } from "react";

export default function AllBuyerList() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const emailID = localStorage.getItem('useremail');  // Retrieving the admin's email from localStorage

    console.log("Email ID from localStorage:", emailID);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError(null);
                console.log("Admin email for API request:", emailID);

                const response = await fetch(`https://farmer-backend-api.onrender.com/AdminOrders/${emailID}`);  // API call to fetch orders for the given admin email
                
                if (!response.ok) {
                    throw new Error(`Failed to fetch order data, status: ${response.status}`);
                }

                const data = await response.json();  // Parse the response to JSON
                console.log("Fetched order data:", data);

                setOrders(data);  // Update the state with fetched data
            } catch (error) {
                console.error("Error fetching order data:", error);
                setError(error.message);  // Set the error message in case of failure
            } finally {
                setLoading(false);  // Set loading to false after the request is completed
            }
        };

        fetchOrders();
    }, [emailID]);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary">All Buyer List</h2>

            {loading && (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {!loading && !error && orders.length === 0 && (
                <div className="alert alert-info text-center" role="alert">
                    No orders found.
                </div>
            )}

            {!loading && !error && orders.length > 0 && (
                <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered table-sm table-lg">
                        <thead className="thead-dark">
                            <tr>
                                <th>S.No</th>
                                <th>Email</th>
                                <th>PName</th>
                                <th>Quantity</th>
                                <th>Total Price</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order._id}>
                                    <td>{index + 1}</td>
                                    <td>{order.clientemail}</td>
                                    <td>{order.pname}</td>
                                    <td>{order.qty}</td>
                                    <td>
                                        {/* Ensure totalprice is a number before formatting */}
                                        ₹{parseFloat(order.totalprice).toFixed(2)}
                                    </td>
                                    <td>
                                        <span
                                            className={`badge ${ 
                                                order.status === "Completed"
                                                    ? "bg-success"
                                                    : order.status === "Pending"
                                                    ? "bg-warning"
                                                    : "bg-danger"
                                            }`}
                                        >
                                            {order.status}
                                        </span>
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
