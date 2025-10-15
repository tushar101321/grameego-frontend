import React, { useEffect, useState } from "react";

function App() {
  const [requests, setRequests] = useState([]);
  const [form, setForm] = useState({
    customerName: "",
    villageName: "",
    itemDescription: "",
    contactNumber: "",
  });

  // Fetch all delivery requests
  const fetchRequests = async () => {
    const res = await fetch("https://grameego-backend.onrender.com/api/deliveries");
    const data = await res.json();
    setRequests(data);
  };

  // Add a new delivery request
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("https://grameego-backend.onrender.com/api/deliveries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ customerName: "", villageName: "", itemDescription: "", contactNumber: "" });
    fetchRequests();
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>GrameeGo – Delivery Requests</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Customer Name"
          value={form.customerName}
          onChange={(e) => setForm({ ...form, customerName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Village Name"
          value={form.villageName}
          onChange={(e) => setForm({ ...form, villageName: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Item Description"
          value={form.itemDescription}
          onChange={(e) => setForm({ ...form, itemDescription: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Contact Number"
          value={form.contactNumber}
          onChange={(e) => setForm({ ...form, contactNumber: e.target.value })}
          required
        />
        <button type="submit" style={{ padding: "10px", backgroundColor: "#1b5e20", color: "white", border: "none" }}>
          Add Request
        </button>
      </form>

      <h2>All Requests</h2>
      {requests.length === 0 ? (
        <p>No requests yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {requests.map((r) => (
            <li key={r._id} style={{ border: "1px solid #ccc", marginBottom: "10px", padding: "10px", borderRadius: "5px" }}>
              <strong>{r.customerName}</strong> ({r.villageName})<br />
              {r.itemDescription}<br />
              📞 {r.contactNumber}<br />
              Status: <b>{r.deliveryStatus}</b>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
