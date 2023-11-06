
# Social Media API

This project is a backend implementation for a social media application using Node.js, Express.js, and MongoDB. The API allows users to post thoughts, react to thoughts, and add friends.

Video link to Insomnia API demo. - https://drive.google.com/file/d/16kvyHL0w5e_VmB3UZ72fEX_ww8gBuci7/view

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Routes](#routes)
- [Models](#models)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install this project, clone the repo and install the required npm packages:

\```bash
git clone https://github.com/your-username/socialMediaAPI.git
cd socialMediaAPI
npm install
\```

## Usage

To start the server, run the following command:

\```bash
npm start
\```

For development, you can use:

\```bash
npm run dev
\```

This will start the server with nodemon, which will watch for any file changes and restart the server automatically.

## Routes

The API includes the following routes:

- `/api/users` - for user operations
- `/api/thoughts` - for thought operations
- `/api/thoughts/:thoughtId/reactions` - for reaction operations

## Models

The application uses two main models:

- `User` - for managing user information and their relations.
- `Thought` - for managing thoughts and reactions.

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

