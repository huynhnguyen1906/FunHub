# Funhub

<p align="center">
  <img src="client/public/images/readme1.png" width="100%"/>
</p>

####

<p align="center">
  <img src="client/public/images/readme2.png" width="100%"/>
</p>

## Introduction

    This project is a full-stack application using JavaScript, utilizing various technologies.

- `Node.js`
- `Express.js`
- `React.js`
- `MySQL`

## Implemented Features

- User account creation 
- Login functionality 
- Authentication functionality 
- Profile information update
- Password change functionality 
- Posting functionality 
- Like functionality for posts 
- Comment functionality 

## Prerequisites

    Please make sure that `Node.js` and `npm` are installed on your machine. Please use version `18` of `Node.js`. To check the version, run `node -v`.

Installation

1. Clone the repository:
   `git clone <https://github.com/huynhnguyen1906/FunHub.git>`

2. Install dependencies in the root, server, and client directories:

####

    cd <Funhub>

####

    npm install

####

    cd server

####

    npm install

####

    cd ../client

####

    npm install

3. Configuration

   Configuration Copy `.env.example` in the server directory to `.env` and enter the environment variables. Copy `funhub-keyfile.example.json` in the server directory to `funhub-keyfile.json` and enter the environment variables.

## How to Start

    To start the application, return to the root directory and run the following command:

    npm start

## Project Structure

    The project has the following structure:

- `client/`： Contains the React client application
  - `src/`：Contains the source code of the React application.
  - `src/components/`：Contains reusable React components.
  - `src/pages/`：Contains different pages of the React application.
- `server/`：Contains the server source code
  - `src/`：Contains the source code of the server.
  - `src/controllers/`： Contains controller functions to handle HTTP requests.
  - `src/models/`：Contains data models.
  - `src/routes/`: Contains the routes of the application.
  - `src/config/database`：Contains the configuration of the database.
