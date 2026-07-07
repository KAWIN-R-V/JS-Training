# Common HTTP Status Codes

## 200 OK

The request was successful.

Example:
GET /users

Response:
User data returned successfully.

---

## 201 Created

A new resource was successfully created.

Example:
POST /users

Response:
New user added.

---

## 400 Bad Request

The client sent an invalid request.

Example:
Missing required fields.

---

## 401 Unauthorized

Authentication is required.

Example:
Login required.

---

## 403 Forbidden

The user is authenticated but does not have permission.

Example:
Access denied.

---

## 404 Not Found

The requested resource does not exist.

Example:
GET /users/999

---

## 500 Internal Server Error

An unexpected error occurred on the server.

Example:
Database connection failed.

---

# Why Status Codes Matter

Status codes help clients understand whether
their request succeeded or failed.

Examples:

200 → Everything worked.

404 → Resource does not exist.

500 → Something went wrong on the server.

Using correct status codes makes APIs easier to debug
and easier for frontend applications to handle.