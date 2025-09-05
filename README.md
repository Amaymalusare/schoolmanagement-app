# School Management App

A modern web application built with Next.js, React, and MySQL for managing school information. This project allows users to add new schools and view them in an ecommerce-style layout.

## 🚀 Features

- **Add School Form**: Complete form with validation using react-hook-form
- **View Schools**: Ecommerce-style grid layout to display schools
- **Image Upload**: Upload and store school images
- **Responsive Design**: Works perfectly on both mobile and desktop
- **Search & Filter**: Search schools by name, city, or address
- **State Filtering**: Filter schools by state
- **Contact Integration**: Direct call and email links

## 🛠️ Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Database**: MySQL
- **Image Upload**: Multer, Formidable
- **Validation**: Built-in form validation with custom rules

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v18 or higher)
- npm or yarn
- MySQL database server
- Git

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd school-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   - Copy `env.example` to `.env.local`
   - Update the database configuration:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=school_management
   DB_PORT=3306
   ```

4. **Set up MySQL database**
   - Create a MySQL database named `school_management`
   - Run the SQL script in `database.sql` to create the required table:
   ```bash
   mysql -u root -p school_management < database.sql
   ```

5. **Create the schoolImages directory**
   ```bash
   mkdir schoolImages
   ```

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
school-management-app/
├── src/
│   ├── app/
│   │   ├── addSchool/          # Add school page
│   │   ├── showSchools/        # View schools page
│   │   ├── api/
│   │   │   ├── schools/        # School CRUD API
│   │   │   └── upload/         # Image upload API
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # Reusable components
│   └── lib/
│       └── db.ts              # Database connection
├── schoolImages/              # Uploaded school images
├── database.sql               # Database schema
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎯 Pages

### 1. Home Page (`/`)
- Welcome page with navigation
- Overview of the application
- Quick access to main features

### 2. Add School (`/addSchool`)
- Form to add new school information
- Fields: name, address, city, state, contact, email, image
- Client-side validation with react-hook-form
- Image upload functionality
- Responsive design

### 3. View Schools (`/showSchools`)
- Ecommerce-style grid layout
- Search functionality
- State-based filtering
- School cards with image, name, address, city
- Direct contact buttons (call/email)

## 🔧 API Endpoints

### Schools API (`/api/schools`)
- `GET`: Fetch all schools
- `POST`: Create a new school

### Upload API (`/api/upload`)
- `POST`: Upload school images

## 🎨 Design Features

- **Modern UI**: Clean, professional design with Tailwind CSS
- **Responsive**: Mobile-first approach with responsive grid layouts
- **Interactive**: Hover effects, smooth transitions
- **Accessible**: Proper form labels, semantic HTML
- **User-friendly**: Clear navigation, loading states, error handling

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Connect your GitHub repository to Vercel
   - Set environment variables in Vercel dashboard
   - Deploy automatically

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `out` folder to Netlify**

## 🗄️ Database Schema

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    contact VARCHAR(15) NOT NULL,
    image TEXT,
    email_id VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🧪 Testing

The application includes:
- Form validation testing
- API endpoint testing
- Responsive design testing
- Image upload testing

## 📝 Assignment Requirements Met

✅ **Next.js Framework**: Used Next.js 14 with App Router  
✅ **React Hook Form**: Implemented for form validation  
✅ **MySQL Database**: Connected with proper schema  
✅ **Two Pages**: addSchool.jsx and showSchools.jsx  
✅ **Form Validation**: Email, contact number, required fields  
✅ **Image Upload**: Stores images in schoolImages folder  
✅ **Responsive Design**: Works on mobile and desktop  
✅ **Ecommerce Layout**: Grid-based school display  
✅ **Database Fields**: All required fields implemented  

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is created for educational purposes as part of a web development assignment.

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Verify database connection
3. Ensure all environment variables are set
4. Check file permissions for image uploads

---

**Happy Coding! 🎉**
