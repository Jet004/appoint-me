# Appoint Me: frontend application

This project encompasses the Next.js frontend implementation for a progressive web application (PWA) called Appoint Me. The frontend application operates as a standalone static PWA running on Next.js and implements the backend web service API for data persistence and fetching dynamic data. Combined with the backend web service, this full-stack project represents a MERN stack PWA.

This project was prepared as part of the Web UX Cluster course at TAFE in 2022.

## Installation

Follow the steps below to install and configure this frontend application.

### Clone the Github repository

In a terminal on your local machine, cd to the location where you want to save the web service and clone this repository:

`git clone https://github.com/Jet004/appoint-me.git`

Once you have cloned the repository, cd into the root directory:

`cd appoint-me`

### Install dependencies

Install all of the project dependencies:

`npm install`


### Configure environment variables

This project implements the `dotenv` environment file package to ensure that key configurations remain private and secure. As such, this distribution omits the .env.local file necessary for the application to access the backend API web service.

You should always configure a unique `.env.local` file for the specific environment in which the application will operate. **Never commit your environment files to Github**.

The following environment variables are required for the web service to run and should be implemented in a fashion suitable to your environment.

- NEXT_PUBLIC_API_URL

##### NEXT_PUBLIC_API_URL

This is the host and port number of the web service this application will access for fetching dynamic data.
`eg. http://localhost:8200`

## Running the development server

With all of the dependencies installed and environment configuration completed, you can now run the development server and access the application. To run the development server navigate to the project root directory and enter the following command in the terminal:

`npm run dev`

This will instantiate a node http server and begin listening for requests to the localhost domain and port.
In a web browser navigate to the address given in the terminal after running the above command. 
Default Next.js development server address: *http://localhost:3000*

That's it! You now have the frontend web service up and running on your local machine! You can download the PWA to your device and use it like a native application.

To stop the development server press `control + c` (Mac).

## Deployment

### Building production version

To build the project into a production version run the following command in a terminal:

`npm run build`

This command causes Next.js to run a number of optimisations, implement code-splitting and a number of other performance enhancing processes. After successful completion the build project will be in the .next file in the application root directory.

### Running the production version

After successfully building the project the production server can be run using the following command:

`npm start`

This will begin a Node http server and will serve a highly optimised version of the application.
Running the application in the built production version loads significantly faster than the development version.