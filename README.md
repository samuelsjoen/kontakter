# Kontakter

Kontakter is a simple application that let's you create, update and remove contacts from your contacts list. You start by creating a user at the register page. Once you've done that and logged in, you have free access to start adding your contacts!

The application is comprised of a reactjs run frontend and a .NET run backend. It stores users contacts in a sqlite database.

## Prerequisites
* Install [.NET 9 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
* Install [Node.js v20](https://nodejs.org/en/download)

## How to run

Create a file called `docker-compose.override.yml` with the following contents:

```yml
services:
  kontakter:
    ports:
      - "49979:8080"
```

Then run `docker compose up` in the terminal.
The application will now be accessible from
http://localhost:49979.