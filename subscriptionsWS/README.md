# subscriptionsWS - Subscriptions Web Service

- cinemaWS communicates with this server.
- This server is managing movies (from source: tvmaze), and subscriptions, and members (from source jsonplaceholder).
- This server is providing these objects to the front server "[cinemaWS](../cinemaWS/README.md)".

## How to setup

1. Install prerequisits
   - mongodb
2. Clone the repo
   - `git clone ...`
3. Install required packages
   - `npm install`
4. Start node server
   - `node index.js`

On the first time run the server will fetch all data from external source (jsonplaceholder and tvmaze) and populate collections inside mongodb. 2 flag files (`members-loaded.flag.txt` and `movies-loaded.flag.txt`) will be created to prevent refetching same data again.
