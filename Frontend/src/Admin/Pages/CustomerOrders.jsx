import React, { useEffect, useState } from "react";
import "./CustomerOrders.css";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("http://127.0.0.1:8000/api/cart/", {
          headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
          }
        });
        if (!response.ok) throw new Error("Failed to fetch orders");
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div>Loading customer orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="customer-orders">
      <h2>Customer Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Cart ID</th>
              <th>User</th>
              <th>Name</th>  
               <th>quantity</th>           
              <th>total_price</th>
             
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user}</td>
                <td>{order.name}</td>
                <td>{order.quantity}</td>
                <td>{order.total_price}</td>
                
                {/* <td>
                  {order.items && Array.isArray(order.items)
                    ? order.items.map((item, idx) => (
                        <div key={idx}>{item.name} x {item.quantity}</div>
                      ))
                    : "-"}
                </td> */}
                {/* <td>{order.total_price}</td> */}
                <td>{order.created_at ? new Date(order.created_at).toLocaleString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CustomerOrders;
