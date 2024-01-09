<div align="center">
  <h1>React Native Booking App</h1>
  <p>A beautifully styled React Native booking template with Google Login integration.</p>
</div>

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)

## Installation
1. Clone the repository: `git clone https://github.com/auronvila/rn-booking-app.git`
2. Navigate to the project directory: `cd rn-booking-app`
3. Install dependencies: `npm install`

## Usage
The project uses **hygraph** as a backend and **clerk** for Google login.
I provided an example of a `.env` file at the root of the project; the file is named just `env`. To run the project successfully, follow these steps:

- First, go to [Hygraph](https://app.hygraph.com) and create a backend project. If you want the same setup as mine, please open an issue, and I will guide you through the process. After creating the project, obtain the **High Performance Content API** from Project Settings / API Access. Specify the link in your `.env` file as **MASTER_URL**.
  
- Second, go to [Clerk](https://clerk.com) and create an application. Once created, you will receive a key that you need to specify in your `.env` file as **CLERK_KEY**.

## Contributing
Everyone is welcome to contribute! Here's how you can get involved:

1. Fork the project.
2. Create a new branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request.

Your contributions are greatly appreciated!
