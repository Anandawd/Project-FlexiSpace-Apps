# Flexi Space Project

This repository contains the source code for the Flexi Space website, which is divided into two main folders:

- `office-rent-fe`: The frontend, built with React and TypeScript.
- `office-rent-be`: The backend, built with Laravel.

## Getting Started

Follow the steps below to run the project locally on your machine.

### Prerequisites

Ensure you have the following installed on your system:

1. [XAMPP](https://www.apachefriends.org/) - For Apache and MySQL.
2. [Node.js](https://nodejs.org/) - For running the frontend.
3. [Composer](https://getcomposer.org/) - For Laravel dependencies.
4. [Visual Studio Code (VS Code)](https://code.visualstudio.com/) - For editing and running the project.

---

### Installation Steps

1. **Download the Repository:**

   - Download the project files as a ZIP or clone the repository using:
     ```bash
     git clone <repository-url>
     ```

2. **Extract the Files:**

   - If you downloaded the ZIP file, extract the contents to a directory on your system.

3. **Move Backend Files to htdocs:**

   - Copy the `office-rent-be` folder to your `htdocs` directory (inside the XAMPP installation).

4. **Start XAMPP Control Panel:**

   - Open the XAMPP Control Panel.
   - Start the **Apache** and **MySQL** services.  
     If you don't have XAMPP, download and install it from [here](https://www.apachefriends.org/).

5. **Setup and Run the Backend:**

   - Open the `office-rent-be` folder in VS Code.
   - Install backend dependencies:
     ```bash
     composer install
     ```
   - Run the backend server:
     ```bash
     php artisan serve
     ```

6. **Setup and Run the Frontend:**

   - Open the `office-rent-fe` folder in VS Code.
   - Install frontend dependencies:
     ```bash
     npm install
     ```
   - Run the frontend server:
     ```bash
     npm run dev
     ```

7. **Access the Application:**
   - Open your browser and navigate to the URL provided by the frontend server (usually `http://localhost:5173`).

---

### Notes

- Ensure the backend and frontend servers are running simultaneously for proper functionality.
- If you encounter issues, make sure all dependencies are installed and the necessary ports are available.

Enjoy exploring the Flex Space Project!
