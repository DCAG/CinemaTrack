# cinemaWS - Cinema Web Service

- Client communicates with this server.
- This server is managing users and user permissions.
- This server is managing access to back server "[subscriptionsWS](../subscriptionsWS/README.md)".

## How to setup

1. Install prerequisits
   - mongodb
2. Clone the repo
   - `git clone ...`
3. Install required packages
   - `npm install`
4. Start node server
   - `node index.js`

On the first time the server will create the 'admin' user. Its password will be printed in the terminal. later it can be retrieved from the DB (just for demonstration purposes... for realworld usage this behaviour should be changed).
2 files will be created: `permissions.json` and `users.json`
