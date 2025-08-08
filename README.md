
# Charity Platform Starter

## Project Overview

Welcome to the **Charity Platform Starter**! This is a robust, full-stack web application designed to serve as a foundation for building a charity and donation management system. The platform allows organizations to create and manage donation campaigns while providing a seamless and user-friendly experience for donors. 

This project is built with modern web technologies, focusing on scalability, security, and ease of use.

Whether you are a developer looking for a comprehensive starting point for a new project or a non-profit organization aiming to build a custom donation platform, this starter kit provides all the essential features to get you up and running quickly.

---

## 🔗 Live Demo

You can try out the live version of the application here:  
👉 [https://charity-platform-starter.vercel.app/](https://charity-platform-starter.vercel.app/)

---

![Project Overview Screenshot](/screenshots/overview.png)

## Features

- **Campaign Management**  
  Administrators can easily create, edit, and archive donation campaigns with details such as goals, descriptions, and timelines.

- **User Authentication**  
  Secure user registration and login for both donors and administrators.

- **Role-Based Access Control**  
  Differentiate between user roles, providing administrators with the necessary permissions to manage campaigns and view donor data.

- **Donation Processing**  
  A framework for handling donations, tracking transactions, and recording donor information.

- **Dashboard**  
  A central dashboard for administrators to monitor donation progress, view donation history, and manage users.

- **Responsive Design**  
  A clean, modern, and fully responsive user interface that works seamlessly on desktop, tablet, and mobile devices.

---

## Technology Stack

### Frontend

- **Framework**: Nextjs  
- **Styling**: Tailwind CSS  
- **State Management**: (e.g., React Context)

### Backend

- **Framework**: Node.js with Express 
- **Database**: PostgreSQL, MongoDB, MySQL  
- **Authentication**: JWT 

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v18 or higher recommended)  
- npm or yarn  
- Git

### Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/vanheaven-ui/charity-platform-starter.git
    cd charity-platform-starter
    ```

2. **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Configure environment variables:**

    Create a `.env` file in the root of the project based on the `.env.example` file. You will need to fill in details such as API keys and database connection strings.

4. **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

    The application should now be running at: [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

The backend is built as a RESTful API to communicate with the frontend and a dedicated mobile application. The server exposes the following endpoints:

- `POST /api/users`: Handle user registration, login, and profile management.  
- `GET/POST /api/projects`: Manage donation campaigns and projects.  
- `POST /api/donations`: Process new donations and retrieve donation history.  
- `GET /api/dashboard`: Access dashboard data and analytics.  
- `GET/POST /api/events`: Manage and retrieve event-related information.  
- `GET/POST /api/proposals`: Handle project proposals and their statuses.  
- `GET/POST /api/notifications`: Manage user notifications.

---

## Contributing

We welcome contributions! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch:

    ```bash
    git checkout -b feature/your-feature-name
    ```

3. Make your changes and commit them:

    ```bash
    git commit -m 'feat: Add new feature'
    ```

4. Push to the branch:

    ```bash
    git push origin feature/your-feature-name
    ```

5. Create a Pull Request.

Please ensure your code follows the project's coding standards.

---

## License

This project is licensed under the **MIT License**.  
See the [LICENSE](./LICENSE) file for more details.
