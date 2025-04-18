Food Delivery Web App
A full-stack food ordering system with a customer-facing website, backend API, and an admin panel for managing food items, orders, and payments.

Features:
Customer menu with add-to-cart functionality
Stripe (or other) payment integration
Order placement and confirmation
Admin dashboard for managing menu and orders
Secure backend API
Fully responsive UI

Tech used:
Frontend - React, Tailwind CSS, Axios
Backend - Node.js, Express, MongoDB (Mongoose)
Admin - React + Vite, Tailwind CSS
Payments - Stripe API (if integrated)

Folder Structure:
food-del/
├── frontend/    
├── backend/     
├── admin/        
├── .vscode/   
├── README.md    

Setup Frontend:
cd frontend
npm install
npm run dev
Runs on: http://localhost:5173

Setup Backend:
cd ../backend
npm install
npm run server
Runs on: http://localhost:4000

Setup Admin:
cd ../admin
npm install
npm run dev
Runs on: http://localhost:5174

Future Features that can be added:
Authentication system (users/admin)
Order history and tracking
Push notifications or emails
Admin analytics dashboard


