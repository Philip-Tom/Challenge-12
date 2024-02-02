# Employee Tracker Application

This command-line application allows business owners to efficiently manage their company's employee database. Built using Node.js, Inquirer, and MySQL, the application enables users to view and manage departments, roles, and employees, facilitating better organization and planning for the business.

## Table of Contents

- [Getting Started](#gettingstarted)
- [Usage](#usage)
- [Application Features](#applicationfeatures)
- [Dependencies](#dependencies)
- [Walkthrough Video](#walkthroughvideo)

## GettingStarted

To set up and run the application, follow these steps:

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/Philip-Tom/Challenge-12.git
   ```

2. **Navigate to the Project Directory:**
   ```bash
   cd Challenge-12
   ```
3. **Install Dependencies:**

   ```bash
   npm install
   ```

4. **Set Up MySQL Database Configs**:
   - Create a .env file in the project root and configure the database connection:
     ```env
     DB_HOST=your_database_host
     DB_USER=your_database_user
     DB_PASSWORD=your_database_password
     ```
   - Run the database seed script:
     ```bash
     npm run seeds
     ```

## Usage

### Running the Application

Start the application using the following command:

```bash
npm start
```

### Available Scripts

- `npm start`: Launches the application using node index.js.
- `npm run seeds`: Runs the seed script to populate the database with sample data.

## ApplicationFeatures

### View All Departments, Roles, Employees, view employees by manager and view employees by department

- When starting the application, users are presented with options to view all departments, roles, and employees etc.
- Each view displays relevant information in a formatted table.

### Add Department, Role, or Employee

- Users can add a new department, role, or employee by selecting the corresponding option and providing necessary details.

### Update Employee Role, Mangers

- Users can update an employee's role or mangers by choosing the relavent option.

### Delete departments, roles, and employees.

### View Department Budget

## Dependencies

- `ascii-table3`: Creates ASCII tables for better visualization.
- `cli-boxes`: Provides box-drawing characters for styling CLI interfaces.
- `dotenv`: Loads environment variables for configuring the database connection.
- `figlet`: Generates ASCII art from text for a decorative header.
- `inquirer`: Interactive command-line user interface for prompting users.
- `mysql2`: MySQL library for Node.js, used for connecting and interacting with the database.

## WalkthroughVideo

https://github.com/Philip-Tom/Challenge-12/assets/147503829/c8459d59-b8a3-4925-9589-b941d4dc5678


