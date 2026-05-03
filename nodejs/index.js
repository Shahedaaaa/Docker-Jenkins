const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// In-memory storage (replace with DB in real production)
let bookings = [];

// HTML UI
const HTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Hotel Booking</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { font-family: Arial; background:#f4f6f9; margin:0; }
        .container { max-width: 500px; margin: 40px auto; background:white; padding:20px; border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,0.1); }
        h2 { text-align:center; }
        input, select { width:100%; padding:10px; margin:10px 0; border-radius:5px; border:1px solid #ccc; }
        button { width:100%; padding:10px; background:#28a745; color:white; border:none; border-radius:5px; cursor:pointer; }
        button:hover { background:#218838; }
        .booking { background:#eef; padding:10px; margin-top:10px; border-radius:5px; }
        .msg { color: green; text-align:center; }
    </style>
</head>
<body>
<div class="container">
    <h2>Hotel Booking</h2>
    <p class="msg">${process.env.MESSAGE || ""}</p>

    <form method="POST" action="/book">
        <input type="text" name="name" placeholder="Your Name" required>
        <input type="email" name="email" placeholder="Email" required>
        <input type="date" name="checkin" required>
        <input type="date" name="checkout" required>
        <select name="room">
            <option>Single</option>
            <option>Double</option>
            <option>Suite</option>
        </select>
        <button type="submit">Book Now</button>
    </form>

    <h3>Bookings</h3>
    ${bookings.map(b => `
        <div class="booking">
            <b>${b.name}</b> (${b.email})<br>
            ${b.room} Room<br>
            ${b.checkin} to ${b.checkout}
        </div>
    `).join("")}
</div>
</body>
</html>
`;

// Routes
app.get("/", (req, res) => {
    res.send(HTML);
});

app.post("/book", (req, res) => {
    const { name, email, checkin, checkout, room } = req.body;

    bookings.push({ name, email, checkin, checkout, room });

    process.env.MESSAGE = "Booking Successful!";
    res.redirect("/");
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});
