✈️ XTechon Fly — Flight Booking System

A full-stack flight booking application built as part of the XTechon Internship Assignment.
The system supports flight listing, dynamic surge pricing, bookings with wallet deduction, PDF ticket generation, and booking history.

🚀 Features
🛫 Flight Discovery<br>

-View available flights with pagination (10 flights per page)<br>

-Clean and responsive UI<br>

-Stable sorting for predictable results<br>

💸 Dynamic Surge Pricing<br>

-Surge pricing is based on successful bookings

-If 3 bookings occur within 5 minutes for the same flight:

-Price increases by 10%

-Surge automatically expires 10 minutes after activation

-Users only see the final price (no internal surge indicators)

🧾 Booking Flow

-Check latest price before booking

-Wallet balance is validated atomically

-Booking fails gracefully if balance is insufficient

-Each successful booking generates:

-Unique PNR

-Booking record

-PDF ticket

📄 Ticket PDF Generation

-Ticket is generated using PDFKit

Contains:

-PNR

-Passenger name

-Flight ID

-Price paid

-Booking timestamp

-Ticket is sent via email

-Ticket can be downloaded again from booking history

📚 Booking History

-View all previous bookings

-Each booking shows:

-Flight details

-Amount paid

-Booking date

-PNR

-Download ticket option

🧠 Design Decisions

-Surge pricing is triggered by successful bookings, not clicks or price checks
→ reflects real demand and prevents abuse

-Backend handles all pricing logic to avoid client manipulation

-No authentication was added to stay within assignment scope

-MongoDB Atlas is used for persistence

-Clean separation of concerns (routes, services, models)<br>

🛠 Tech Stack
Frontend

React

React Router

Axios

Tailwind CSS

Backend

Node.js

Express.js

MongoDB (Atlas)

Mongoose

PDFKit

Nodemailer<br>

📂 Project Structure<br>
xtechon-flight/<br>
├── client/ # React frontend<br>
├── server/ # Node + Express backend<br>
├── .gitignore<br>
├── README.md<br>

⚙️ How to Run Locally

1️⃣ Clone the repository

git clone https://github.com/abhijtek/xtechon-flight-booking.git<br>
cd xtechon-flight-booking

2️⃣ Backend setup

cd server

npm install

Create a .env file inside server/:

PORT=4000<br>
MONGODB_URI= DB_URI<br>

# Initial wallet balance for user

DEFAULT_WALLET_BALANCE=50000<br>

# Email configuration (REQUIRED for booking)
EMAIL_USER= gmail_address<br>
EMAIL_PASS= gmail_app_password<br>

# Important Notes<br>

:-EMAIL_USER and EMAIL_PASS are used by Nodemailer for sending ticket emails

:-You must use a Gmail App Password, not your normal Gmail password

:-Email credentials used for evaluation are shared separately

:-The .env file must never be committed to GitHub

Start the server:

npm run dev


3️⃣ Seed flights (optional but recommended)

node seed/seedFlights.js


This clears and reseeds the flights collection for predictable data.


4️⃣ Frontend setup

cd ../client

npm install

npm run dev


Frontend runs on:

http://localhost:5173

Backend runs on:

http://localhost:4000

🧪 API Overview
Get flights

GET /api/flights?page=1


Check price

GET /api/flights/:flightId/price

Book flight

POST /api/book

Get booking history

GET /api/bookings

📌 Notes

node_modules and .env are intentionally not committed

Pagination is server-side using skip + limit

Surge logic automatically resets after expiry

Project focuses on correctness, clarity, and scope adherence

## Deployment

This project is intended to be run locally for evaluation.  
Cloud deployment was tested, but due to free-tier SMTP and filesystem limitations, local execution provides the most reliable experience.


👤 Author

Abhijeet Singh Rajput<br>
B.Tech Mechanical Engineering<br>
IIT (ISM) Dhanbad<br>
