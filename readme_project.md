# Project Name

תיאור קצר של הפרויקט ומה הוא עושה.

## Features
- אימות משתמשים עם JWT
- חיבור ל־MongoDB
- ניהול לוגים עם Morgan
- סביבת Node.js עם Express

## Installation
```bash
# Clone the repository
git clone https://github.com/username/repository-name.git

# Install dependencies
npm install
```

## Configuration
צור קובץ `.env` עם המשתנים האלו:

```env
NODE_ENV=production
PORT=8181
TOKEN_GENERATOR=jwt
DB_NAME=your_db_name
DB_PASSWORD=your_db_password
LOGGER=morgan
DB=MONGODB
JWT_KEY=x-auth-token
```

## Usage
```bash
# Run in development
npm run dev

# Run in production
npm start
```

## API Endpoints
- `POST /api/auth/login` – התחברות וקבלת JWT
- `POST /api/auth/register` – יצירת משתמש חדש

## License
MIT