# Appoint Me: frontend application

AppointMe is an appointment management and CRM application for businesses employing an appointment based business model. Businesses can define a suite of services to offer to clients and manage bookings for those services. The core of the system revolves around the calendar system which provides a graphical display of appointments. Clients can view the services offered by the business and book appointments via the app.

AppointMe is a PWA built using the Next.js architectural framework. The frontend application operates as a standalone static PWA running on Next.js and implements the backend web service API for data persistence and fetching dynamic data. Combined with the backend web service, this full-stack project represents a MERN stack PWA. The layout, styling and theming of the application has been implemented using the MUI layout framework for React. Client side form validation is implemented with react-hook-forms and Yup for the validation schema. Below is a list of the key packages and modules used in the project and the versions used:

- date-fns – version 2.28.0
- emotion/cache – version 11.7.1
- mui/material – version 5.4.4
- localforage – version 1.10.0
- next – version 12.1.0
- next-pwa – version 5.5.2
- react – version 17.0.2
- rect-hook-form – version 7.29.0
- sharp – version 0.30.4
- yup – 0.32.11

### date-fns

This package contains over 200 functions for working with date objects in JavaScript. It is a lightweight but powerful package for handling date and time conversions, formatting and timezone offsets. As an application focused on managing appointments, this package has been used in a number of places in the application. The appointments controller uses this package extensively for managing date and time format, timezone offsets and date arithmetic.

### emotion/cache

This package is a dependency for the MUI layout framework which is utilised in this project. Emotion is a CSS-in-JS module which allows developers to define CSS rules using JavaScript object syntax within application code. Emotion cache allows developers to customise how styles are inserted by emotion at a low level. While this package is not used directly, the capability to code CSS in JavaScript notation has been used throughout the React components in this application and is used primarily for style overrides and customising pre-defined components.

### mui/material

MUI is the layout framework used in this application. It provides a number of features which improve and streamline the development experience. It provides a library of prebuilt React components which can be imported and implemented quickly and simply. These components are conducive to rapid application development practices as they establish a baseline set of styles and layout tools and materials for constructing applications quickly. All of the MUI components conform with the latest Material Design guidelines published by Google and incorporate excellent accessibility features throughout all components. This framework has been used extensively throughout this application to use prebuilt components, compose custom components, implement light and dark themes and utilise CSS-in-JS functionality.

### localforage

Localforage is a wrapper for browser based storage methods. It creates a common interface for storing data in localstorage, sessionstorage, IndexedDB and WebSQL. The interface for this package is based on that for localstorage. This package therefore gives access to both synchronous and asynchronous storage methods. With it's ability to be used with async/await, promises and callbacks it is ideal for the asynchronous nature of JavaScript applications. This project has made use of localforage for storing user objects to localstorage. This data needed to be stored synchronously to ensure that the React useEffect functions in the _app.js file ran as expected. It was also used to store the authentication access and refresh JWT tokens in IndexedDB asynchronous storage. These tokens are then accessed via localforage when API requests are made if authentication is required. This method of authentication essentially removed the possibility of CSRF attacks.

### next

Next.js is a modern application framework for creating web based applications in JavaScript. It is build on React and is primarily implemented in identical fashion to React. Next, however, introduces a number of critical features which extend React into a powerful framework for optimised modern applications. Next provides a method for automatically building application routes from the directory structure of the application. It also provides a large number of optimisations as part of it's build process. Next resizes and optimises images and sets them to lazy load as they enter the viewport. It implements automatic code splitting to reduce the initial bundle size for any given page. It also precaches all site assets for fast loading and preloads linked pages for seamless transitions. Next is primarily a server side rendered framework which greatly improves site SEO. It also provides the capability for implementing middleware and serverless funtions for the backend web service. This application has been built in Next.js and takes advantages of the image optimisation features, automatic routing and code splitting to create a lightning fast and responsive modern progressive web application.

### next-pwa

This package is a plugin for Next.js. Built on Workbox it integrates with Next.js applications to automatically build application serviceworker files suitable for any Next.js application. It automatically assesses the Next application and generates the code necessary to cache and handle Next generated code 'chunks' to enable the best offline experience possible. This application implements next-pwa and uses it to generate the serviceworker file. Some customisations have been implemented to enable an offline error page to display when Next resources have not yet been cached.

### react

React is a modern web based application library used to build websites and web applications. It uses a component based architecture to divide applications into manageable and reusable all encompassing units. Each component can contain code to manage the state of the component and any children components, the JSX and web elements to provide structure and forms for the component and the styling for the component. In this way each component of a web page is completely defined in a single file and can be reused anywere in the application anywhere that component is needed. React is a dependency of Next.js and is required for any Next application to function. This application uses React functional components extensively and integrates React hooks for state management and lifecycle functionality.

### react-hook-form

This package is an externally defined React hook created to fully manage the state and validation of forms in React based applications. It has the ability to greatly simplify any React component which implements a form by handling state management behind the scenes. While it has it's own set of validation rules, it can integrate with external validation packages to build powerful validation systems for defining validation rules which a form must pass. This package also simplifies the process of providing user feedback on incorrect validation and prevents form submission if any form elements do not pass validation tests. This application uses react-hook-form to manage all forms in the application. The Yup resolver is used to integrate the Yup validation package for a powerful validation solution.

### sharp

Sharp is a package for resizing images on the server. While not a required dependency of Next.js including it allows Next to automatically resize images to an appropriate size in it's image optimisation stage of the build process. This package has not been included in the application and has only been installed to enable the additional features available in Next.

### yup

Yup is a validation schema package used to define validation rules and criteria for web forms. It is a comprehensive package with a wide variety of predefined validation functions and type checking. Yup also contains powerful tools for defining custom validators and conditional validation. This package integrates well with react-hook-form to provide a complete state management and validation framework for working with web forms. Yup has been used alongside react-hook-form throughout this application for defining validation schemas for all forms implemented in the application. It is the Yup validation schemas which allow immediate validation feedback and form validation on submit.

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