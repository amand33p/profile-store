# Profile Store MERN

A MERN stack app for storing profile links of people you admire, at one place.

## Demo

[Deployed on Netlify (front-end) & Heroku (back-end)](https://profile-store.netlify.app)

## Built using

#### Front-end

- [ReactJS](https://reactjs.org/) - Frontend framework
- [useState hook & props](https://reactjs.org/docs/hooks-state.html) - For state management
- [React Router](https://reactrouter.com/) - For general routing & navigation
- [Semantic-UI w/ normal CSS for customisations](https://react.semantic-ui.com/) - UI library
- [React toast notifications](https://jossmac.github.io/react-toast-notifications/) - For toast notifications (duh :P)

#### Back-end

- [Node.js](https://nodejs.org/en/) - Runtime environment for JS
- [Express.js](https://expressjs.com/) - Node.js framework, makes process of building APIs easier & faster
- [MongoDB](https://www.mongodb.com/) - Database to store document-based data
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js
- [Cloudinary](https://cloudinary.com/) - For image uploading & related API
- [JSON Web Token](https://jwt.io/) - A standard to secure/authenticate HTTP requests
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - For hashing passwords
- [Validator.js](https://www.npmjs.com/package/validator) - For validation of JSON data
- [Mongoose Unique Validator](https://www.npmjs.com/package/mongoose-unique-validator) - Plugin for better error handling of unique fields within Mongoose schema
- [Dotenv](https://www.npmjs.com/package/dotenv) - To load environment variables from a .env file

## Features

- Authentication (login/register with email)
- Image upload for Display Picture of contacts
- Add/update/delete contacts & change display picture
- Add/update/delete profile links of individual contacts
- Click on circular profile image to open preview
- Search contacts by name or profile links
- Toast notifications for actions - adding/updating/deleting contact, or welcome message etc.
- Dark mode toggle w/ local storage save
- Responsive UI for all screens

## Screenshots

#### Desktop/Tablet Home

![Home](https://github.com/amand33p/profile-store-mern/blob/master/screenshots/desktop-tablet.png)

#### Auth Forms

![Auth Forms](https://github.com/amand33p/profile-store-mern/blob/master/screenshots/auth-forms.png)

#### Pop-up windows (modals)

![Pop-up windows](https://github.com/amand33p/profile-store-mern/blob/master/screenshots/modals.png)

#### Mobile UI

![Mobile UI - 1](https://github.com/amand33p/profile-store-mern/blob/master/screenshots/mobile-ui-1.png)

![Mobile UI - 2](https://github.com/amand33p/profile-store-mern/blob/master/screenshots/mobile-ui-2.png)
