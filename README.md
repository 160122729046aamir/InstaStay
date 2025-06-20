# InstaStay

**InstaStay** is a hotel and short-stay booking platform inspired by Airbnb, built with Node.js, Express.js, and MongoDB. The application allows users to browse, filter, and book accommodations, while hotel owners can manage their listings. InstaStay is designed for ease of use, security, and scalability, with image hosting via Cloudinary and robust authentication. All pages are rendered server-side using EJS templates.

---

## Features

- **Browse Listings**: View a wide range of hotels and accommodations.
- **Advanced Filtering**: Search and filter hotels by location, amenities, and more.
- **User Authentication**: Secure registration, login, and session management.
- **Add & Manage Listings**: Hotel owners can add, edit, and delete their listings.
- **Booking Management**: Users can book accommodations and view their bookings.
- **Review System**: Users can leave reviews and ratings for listings.
- **Image Uploads**: Upload and manage listing images via Cloudinary.
- **Flash Messages**: User feedback for actions (success, error, etc.).
- **Error Handling**: Custom error pages and robust error management.

---

## Technologies Used

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: Passport.js (local strategy), express-session
- **Templating**: EJS, ejs-mate (for server-rendered views)
- **Validation**: Joi
- **File Uploads**: Multer, multer-storage-cloudinary
- **Session Store**: connect-mongo
- **Flash Messages**: connect-flash
- **Image Hosting**: Cloudinary
- **Frontend**: EJS templates, CSS, vanilla JavaScript

---

## Project Structure

```
├── app.js                 # Main server entry point
├── cloudinary.js          # Cloudinary configuration for image uploads
├── middlewares.js         # Custom middleware functions
├── package.json           # Project metadata and dependencies
├── SCHEMA.js              # (Legacy/alternate schema, clarify usage)
├── controllers/           # Route controllers (listing.js, reviews.js, users.js)
├── init/                  # Database seeding and initialization scripts
├── models/                # Mongoose models (review.js, schema.js, user.js)
├── public/                # Static assets (images, CSS, JS)
│   ├── css/               # Stylesheets
│   └── js/                # Client-side JavaScript
├── routers/               # Express routers (listing.js, reviews.js, users.js)
├── uploads/               # Uploaded files (if not using only Cloudinary)
├── utils/                 # Utility functions and custom error classes
├── views/                 # EJS templates
│   ├── error.ejs          # Error page
│   ├── includes/          # Partials (flash, footer, nav)
│   ├── layouts/           # Layout templates (boilerplate.ejs)
│   ├── listings/          # Listing pages (create, edit, index, show)
│   └── users/             # User pages (login, signup)
```

---

## Installation

### Prerequisites
- Node.js and npm installed
- MongoDB set up locally or using a cloud provider (e.g., MongoDB Atlas)
- Cloudinary account (for image uploads)

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/instastay.git
   cd instastay
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root directory with the following:
     ```env
     MONGO_URL=your_mongodb_connection_string
     SECRET=your_session_secret
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_KEY=your_cloudinary_key
     CLOUDINARY_SECRET=your_cloudinary_secret
     NODE_ENV=Development
     ```
4. (Optional) Seed the database using scripts in the `init/` folder if provided.
5. Start the server:
   ```bash
   npm start
   ```
6. Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Folder & File Descriptions

- **app.js**: Main application file; sets up Express, middleware, routes, error handling, and database connection.
- **cloudinary.js**: Configures Cloudinary for image uploads.
- **middlewares.js**: Custom middleware (e.g., authentication, validation).
- **controllers/**: Contains logic for handling requests for listings, reviews, and users.
- **init/**: Scripts for seeding or initializing the database.
- **models/**: Mongoose schemas/models for users, listings, and reviews.
- **public/**: Static files (CSS, JS, images).
- **routers/**: Modular route handlers for listings, reviews, and users.
- **uploads/**: Stores uploaded files (if not using only Cloudinary).
- **utils/**: Utility functions and custom error classes (e.g., ExpressError).
- **views/**: EJS templates for server-side rendering, including layouts, partials, and pages for listings and users.

---

## License

This project is licensed under the ISC License.

---

## Acknowledgements

- Inspired by Airbnb
- Built with Node.js, Express.js, and MongoDB
- Uses open-source packages and tools
