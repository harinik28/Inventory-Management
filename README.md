# Inventory Management 

Project Overview
This is a full-stack Inventory Management System built using HTML, Bootstrap, Vanilla JavaScript, Node.js, Express.js, and MySQL. It allows users to manage products, purchase and sales bills, and track current stock levels with a user-friendly interface and smooth navigation.

## Features

### 1. Product Master

Allows users to input product details such as product name, category, and brand.
Inputs are received through a form.
All products are stored in the Product Master table.

### 2. Bills

- **Purchase Bills:**
  - Captures purchase ID, product name, quantity, amount, and total.
The product names are fetched from the Product Master table and displayed as a dropdown.

- **Sales Bills:**
  - Captures sales ID, product name, quantity, amount, and total.
The product names are fetched from the Purchase Bills table and displayed as a dropdown.

- Inputs for both bills are received through forms.

### 3. Stock
   
Tracks current stock levels for each product.
The stock table retrieves information from both the Purchase Bills and Sales Bills tables.

### 4. Visually Appealing UI
   
The project features an intuitive UI with an active navigation menu bar or sidebar.
The active page is clearly indicated with a specific visual effect for ease of use.

## Technologies Used

- **Frontend**: HTML, Bootstrap, Vanilla JavaScript

- **Backend**: Node.js, Express.js

- **Database**: MySQL

## Setup Instructions:

To run this project locally, follow these steps:

### Copy code
      ```bash 
      npm install

### Set up your MySQL database:

Create the required database and tables for Product Master, Bills, and Stock.
Update the database configuration in the project.

### Run the project:
      ```bash
      npm start


## Screenshots
![Screenshot 2024-09-28 203329](https://github.com/user-attachments/assets/0428ba3e-7556-415e-9412-ac7bf6591741)

![Screenshot 2024-09-28 203524](https://github.com/user-attachments/assets/23f64691-e70c-4931-8155-71aaaa71e8e7)

![WhatsApp Image 2024-09-28 at 20 40 07 (1)](https://github.com/user-attachments/assets/7611736f-7bc8-4770-9c81-abdc64f3ea91)

![WhatsApp Image 2024-09-28 at 20 40 07](https://github.com/user-attachments/assets/d05bba52-0d61-417b-904c-83fc41a47372)


![Screenshot 2024-09-28 203543](https://github.com/user-attachments/assets/c746c557-0928-49a2-8d00-6e4d2476ed66)

![Screenshot 2024-09-28 203603](https://github.com/user-attachments/assets/a6254509-8765-459b-bb53-838b0544a4e9)



