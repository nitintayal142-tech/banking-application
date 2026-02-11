# FinEdge Banking System

A **Full Stack Banking Management System** built using **React (Frontend)**, **Spring Boot (Backend)**, and **MongoDB (Database)**. The project simulates real-world banking operations such as customer onboarding, account management, and secure transactions.

This system is designed as an **academic + placement-ready project**, focusing on clean architecture, REST APIs, and database integration.

---

## 🧠 System Architecture

```
React (Frontend)
      |
      |  HTTP Requests (JSON)
      v
Spring Boot (REST APIs)
      |
      |  Data Persistence
      v
MongoDB (Database)
```

> All services run on **localhost** during development.

---

## 🔐 Security Design

Security in FinEdge Banking System is handled primarily at the **Spring Boot backend layer**.

### Authentication

* Users log in using **Customer ID and Password**
* Credentials are validated at backend before allowing access
* Invalid credentials return proper HTTP error responses

### Authorization

* APIs are logically separated for **Admin** and **Customer** roles
* Admin endpoints are restricted to administrative operations
* Customer endpoints allow only self-account operations

### Data Validation

* All request payloads are validated at controller/service level
* Invalid or incomplete data is rejected before database interaction

### API Security (Basic)

* REST APIs are exposed only on `localhost`
* Cross-layer validation prevents unauthorized access
* No direct database access from frontend

> ⚠️ This security model is implemented for **academic/demo purposes** and can be extended with JWT/OAuth in production.

---

## 🔄 Application Flow

### Overall Flow

```
User (Browser)
   ↓
React Frontend (UI)
   ↓  HTTP Requests (JSON)
Spring Boot REST APIs
   ↓  Business Logic
Service Layer
   ↓  Persistence
MongoDB Database
```

### User Flow

1. User registers or logs in via React UI
2. React sends request to Spring Boot backend
3. Backend validates user and processes request
4. Data is fetched/stored in MongoDB
5. Response is sent back to React UI

### Admin Flow

1. Admin logs in
2. Admin accesses customer/account/loan APIs
3. Backend processes admin actions
4. MongoDB is updated accordingly

---

## 🗄️ MongoDB Data Flow

### Collections Used

* `customer`
* `account`
* `transaction`
* `loan`

### Data Flow Example: Fund Transfer

```
React UI
  ↓
POST /customer/{id}/transaction
  ↓
TransactionService
  ↓
AccountRepository + TransactionRepository
  ↓
MongoDB (Update balances & insert transaction record)
```

### Data Consistency

* Account balance updates and transaction inserts are handled together
* Backend ensures data integrity before committing changes

### MongoDB Role

* Stores persistent banking data
* Acts as single source of truth
* No direct access from frontend

---

## 🚀 Features

### 👤 Customer Module

* Customer registration
* View customer details
* Secure customer identification using Customer ID

### 🏦 Account Module

* Savings account creation
* Account status management (Active/Inactive)
* Balance tracking

### 💸 Transaction Module

* Fund transfer between accounts
* Debit / Credit transactions
* Transaction history support

### 🔐 Security (Basic)

* Login using Customer ID & password
* Backend validation through Spring Boot

---

## 🛠️ Tech Stack

### Frontend

* **React.js**
* HTML5, CSS3, JavaScript
* REST API integration

### Backend

* **Java Spring Boot**
* Spring Web (REST APIs)
* Layered Architecture (Controller, Service, Repository)

### Database

* **MongoDB**
* Collections: `customer`, `account`, `transaction`

### Development Environment

* **Localhost only**

  * Frontend: `http://localhost:3000`
  * Backend: `http://localhost:8080`
  * MongoDB: `mongodb://localhost:27017`

---

## 📂 Project Structure (Logical)

```
FinEdge-Banking/
│
├── frontend/                # React application
│   ├── components/
│   ├── services/            # API calls
│   └── pages/
│
├── backend/                 # Spring Boot application
│   ├── controller/
│   ├── service/
│   ├── repository/
│   └── model/
│
├── database/                # MongoDB collections
│
└── utils-scripts/           # Testing & validation scripts
```

---

## ⚙️ Setup Instructions (Localhost)

### 1️⃣ Prerequisites

* Java 17+
* Node.js (only for running React frontend)
* MongoDB (local instance)
* Maven / npm

---

### 2️⃣ Backend Setup (Spring Boot)

```bash
cd backend
mvn spring-boot:run
```

Backend will start on:

```
http://localhost:8080
```

---

### 3️⃣ Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

Frontend will start on:

```
http://localhost:3000
```

---

### 4️⃣ Database Setup (MongoDB)

Ensure MongoDB is running locally:

```bash
mongodb://localhost:27017/banking_system_db
```

Collections are created automatically by Spring Boot.

---

## 🧪 Utility & Testing Scripts (Optional)

> These scripts are **only for testing and debugging** the Spring Boot APIs.
> ❗ **Node.js is NOT used as a backend** in this project.

* `seed_db.js` – Insert demo customer & account via REST APIs
* `check_db.js` – Verify customers from Spring Boot backend
* `check_accounts.js` – Validate account records
* `test_transaction.js` – Test fund transfer logic
* `debug_mongo.js` – Direct MongoDB inspection

⚠️ **Note:** Backend is strictly **Spring Boot**. Node.js is used **only to run React and helper scripts**.

---

## 🔗 API Base URLs (Localhost)

* Admin APIs:
  `http://localhost:8080/api/admin`

* Customer APIs:
  `http://localhost:8080/customer`

---

## 📌 Important Notes

* Backend is **Spring Boot only** (no Node.js backend)
* Frontend communicates strictly via REST APIs
* MongoDB operations are handled via repository layer
* Application runs fully on **localhost**
* Designed for understanding **full-stack flow and data handling**

---

* Project runs completely on **localhost**
* No cloud deployment is used
* Password handling is basic (demo purpose only)
* Suitable for:

  * College submission
  * Mini / Major project
  * Placement interviews

---

## 📜 License

This project is developed strictly for **academic and learning purposes** under the name **FinEdge Banking System**.

---

## 📸 Application Output (Screens)

> Below are sample outputs/screens of the FinEdge Banking System running on **localhost**.

### 🏠 Home Page

* User/Admin login options
* Navigation to registration and dashboard

### 👤 User Dashboard

* View account balance
* Quick actions: Transfer Funds, View Transactions, Apply for Loan

### 💸 Fund Transfer Output

```json
{
  "status": "SUCCESS",
  "message": "Transaction completed successfully",
  "amount": 5000,
  "fromAccount": "CUST_101",
  "toAccount": "CUST_102"
}
```

### 📄 Transaction History Output

```json
[
  {
    "transactionId": "TXN1001",
    "type": "DEBIT",
    "amount": 5000,
    "date": "2026-02-10",
    "status": "COMPLETED"
  },
  {
    "transactionId": "TXN1002",
    "type": "CREDIT",
    "amount": 2000,
    "date": "2026-02-11",
    "status": "COMPLETED"
  }
]
```

### 🏦 Admin Dashboard

* View all customers
* Manage accounts and status
* Review loan applications

### 🧾 Loan Processing Output

```json
{
  "loanId": "LN2001",
  "customerId": "CUST_101",
  "amount": 100000,
  "status": "APPROVED",
  "processedBy": "Scheduler Thread"
}
```

---o/p

<img width="690" height="447" alt="Screenshot 2026-02-10 172031" src="https://github.com/user-attachments/assets/5674c441-8726-456e-a649-c8b2e39c4b01" />

<img width="670" height="742" alt="Screenshot 2026-02-10 171819" src="https://github.com/user-attachments/assets/0de80cf3-3a3a-42c3-be1f-1c258a95de73" />

<img width="667" height="711" alt="Screenshot 2026-02-10 171844" src="https://github.com/user-attachments/assets/e2564c0e-9b26-4457-9664-4472361f6777" />

<img width="626" height="707" alt="Screenshot 2026-02-10 171914" src="https://github.com/user-attachments/assets/a47aadde-5926-48d1-b2eb-2dbee40fb9fa" />



