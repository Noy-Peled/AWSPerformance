# AWS Performance

# Description:

AWS Performance is a full-stack application built with Node.js, Express,and React.
The app extract performance information for an AWS instance and display the CPU usage over time.

# Server:

Server is running on `http://localhost:8080`.

API Routes:

- "/performance" - This is the only router the application has, receives only GET requests.
  the information is sent from the client via the URL.

Service:

- Responsible for finding the instance ID from the IP address received from the client.
- Using cloudwatch, returns the CPU analysis based on the time period, period and IP address that received by the user.

Utils:

- Calculates the time period selected by the user.

Run:

Open the terminal and type the following command: node .\Index.js

# Client:

Components:

- Component for user's input.
- Component for display the CPU usage over time, using chart.
- App component, the main component that displays the rest.

Service:

- Responsible of sending the information from the client to the server and returning it after executing the logic on the server.

Run:

Open the terminal and type the following command: npm run dev
