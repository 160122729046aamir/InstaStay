# **InstaStay - Hotel Booking Platform**

**InstaStay** is a hotel booking platform built using the **MERN stack** (MongoDB, Express.js, React, Node.js), offering users an easy and efficient way to browse, filter, and book accommodations. The application focuses on providing a seamless experience for both users and hotel owners. It does not include payment integration but ensures smooth management of hotel listings and bookings.

---

## **Features**

- **Browse Listings**: Users can explore a variety of hotel listings and accommodations.
- **Filter Options**: Users can search and filter hotels based on location, amenities, and more.
- **Secure User Authentication**: Implemented user registration and login with **Passport.js** for secure authentication.
- **Add and Manage Listings**: Only authenticated users (hotel owners) can add and manage their hotel listings.
- **Booking Management**: Users can book accommodations, view booking details, and check availability.
- **Image Hosting**: Integrated **Cloudinary** to enable dynamic image uploads for hotel listings.

---

## **Technologies Used**

- **Frontend**:
  - **React.js** for building the user interface.
  - **Tailwind CSS** for styling and responsive design.
- **Backend**:
  - **Node.js** and **Express.js** for the server-side logic.
  - **MongoDB** for database management and data persistence.
  - **Passport.js** for secure user authentication.
- **Image Hosting**:
  - **Cloudinary** for dynamic image uploads and hosting.
- **State Management**:
  - **Redux** (if applicable) for managing state across the application.

---

## **Installation**

### **Prerequisites**
- Node.js and npm installed
- MongoDB set up locally or using a cloud provider like **MongoDB Atlas**.

### **Steps to Set Up**

1. Clone the repository:
   ```bash
   git clone https://github.com/160122729046aamir/InstaStay.git
2. Navigate into the project directory:
   ```bash
   cd InstaStay
3. Install the dependencies :
   ```bash
   npm install
4. Set up environment variables:
   ```bash
   PORT=5000
   MONGO_URL=<Your_MongoDB_Connection_String>
   CLOUD_NAME=<Your_Cloudinary_Cloud_Name>
   API_KEY=<Your_Cloudinary_API_Key>
   API_SECRET=<Your_Cloudinary_API_Secret>
   SECRET=<Your_Secret_Password_Key>

5. Start:
   ```bash
   node app.js
