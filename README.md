# Laravel React standalone frontend.

> WORK IN PROGRESS

As this is in heavy development, a lot is expected to change!

This repository contains a standalone React / Shadecn frontend for Laravel.
It works without Inertia and it decoupled from its backend.

It is tailored to work with the Laravel Tractor CRUD generator, which alows you to generate testable CRUD application in no time.
[TODO]

## Laravel requirements
The packages should use with any backend, but it tested with Laravel and the following packages.
The authentication is cookie based.

- Sanctum
- Fortify

## Required endpoints.

This frontend application expects the following Laravel endpoints

- GET ~/api/cookie
- GET ~/api/user
- POST ~/api/login
- POST ~/api/logout
- POST ~/api/register
- POST ~/api/forgot-password
- POST ~/api/reset-password

## Setting up Laravel

### Set up the frontend url

This part asumes the base url of this frontend application to be:

`http://localhost:5173`

Add the base url of this frontend application to your `~/config/app.php`:
```php
'frontend_url' => env('APP_FRONTEND_URL', 'http://localhost:5173'),
```

Set the following environment variables:

```dotenv
APP_FRONTEND_URL=http://localhost:5173
SANCTUM_STATEFUL_DOMAINS=localhost
SESSION_DOMAIN=.localhost
SESSION_SECURE_COOKIE=false
SESSION_SAME_SITE=lax
SESSION_DRIVER=cookie
```

> In production you can leave SESSION_SECURE_COOKIE to be true!