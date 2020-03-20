# Crud NodeJS / VueJS

## frontend

### install dependencies for the frontend

```
npm install
```

### Run vueCLI

```
npm run serve
```

## backend

### install dependencies for the backend

```
npm install
```

### Run the nodeJS server

```
node server.js
```

### Configuration + database

1. Create a mongoDB database with "items" and "users" collections

2. Link your database:
   backend/db.js is in .gitignore
   Create this file and export your mongoDB string connexion like that:

```
const db = 'mongodb+srv://username:password@cluster-b2shk.gcp.mongodb.net/database-name?retryWrites=true&w=majority'
module.exports = db
```

3. Create a user:
   With a request HTTP tool (postman), post this JSON array:

```
{
"email": "test@gmail.com",
"password": "password"
}
```

to this route:

```
localhost:3000/api/auth/signup
```
