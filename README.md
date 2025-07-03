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