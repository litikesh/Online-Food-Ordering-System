# Food Ordering System

## Overview

This is a full-stack Food Ordering System built with a Node.js backend and a React frontend. The application allows users to browse a menu, place orders, and manage their accounts. It leverages several modern technologies to ensure a smooth user experience.

## Features

### User Features

- **Authentication**: Users can securely log in and sign up, with the ability to update their profiles.
- **Shopping Cart**: Easily add products to the cart for convenient checkout.
- **Order Placement**: Seamlessly place orders for selected items.
- **Secure Payments**: Process payments through Stripe for a smooth transaction experience.

### Admin Features

- **Admin Dashboard**: A centralized interface for managing various aspects of the application.
- **Product Management**: Perform Create, Read, Update, and Delete (CRUD) operations on products.
- **Order Management**: View and manage customer orders efficiently.
- **User Management**: Oversee user accounts and their activities within the system.
- **Review Management**: Monitor and manage user reviews to maintain quality and feedback.

## Table of Contents

- [Technologies](#technologies)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Usage](#usage)
- [Contributing](#contributing)

## Technologies

### Backend

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- Nodemailer for email notifications
- Cloudinary for image uploads
- Stripe for payment processing

### Frontend

- React
- Tailwind CSS for styling
- Axios for API requests
- Redux for state management

## Setup

### Backend Setup

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `config.env` file**:

   Navigate to the `backend/config` directory and create a `config.env` file. Use the template provided below and fill in the required values.

   ```dotenv
   # MongoDB Connection
   MONGO_URL=<your_mongo_url>

   # Application Configuration
   PORT=5000
   FRONTEND_URL="http://localhost:3000"

   # JSON Web Token Configuration
   JW_SECRET=mykey
   JW_EXPIRE=5d
   COOKIE_EXPIRE=5

   # SMTP Configuration for Email
   SMTP_SERVICE=gmail
   SMTP_MAIL=<your_email@gmail.com>
   SMTP_PASSWORD=<your_email_password>
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465

   # Stripe Configuration
   STRIPE_API_KEY=<your_stripe_api_key>
   STRIPE_SECRET_KEY=<your_stripe_secret_key>

   # Cloudinary Credentials
   CLOUDINARY_NAME=<your_cloudinary_name>
   CLOUDINARY_API_KEY=<your_cloudinary_api_key>
   CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
   ```

4. **Start the server**:

   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to the frontend directory**:

   ```bash
   cd ../frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the frontend application**:

   ```bash
   npm start
   ```

## Scripts

### Server Scripts

- **Start the server**: `npm start`
- **Run in development mode**: `npm run dev`

### Frontend Scripts

- **Start the React app**: `npm start`
- **Build the React app**: `npm run build`
- **Run tests**: `npm test`

## Usage

Once both the server and frontend are running, access the application at [http://localhost:3000](http://localhost:3000). Users can register, log in, browse the menu, and place orders.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.
