## TO RUN API

- Make sure you have a local instance of mongoDB
- Run an `npm install` to install dependencies
- Create a `.env` file and copy the values of the `.env.default` into it

## TO CONNECT SOCKET

- While the server is up and running on loaclhost:3000, create a new terminal and run `npx wscat -c ws://localhost:3000` (Install it if you have to)
- It should say `connected (press CTRL+C to quit)`

- When an order status is updated, you will recieve a payload like below:
  `    {
    "event": "ORDER_STATUS_CHANGED",
    "data": {
        "id": "67a48585ae3d606d635037f2",
        "oldStatus": "DISPATCHED",
        "newStatus": "DISPATCHED",
        "timestamp": "2025-02-06T10:36:52.412Z"
    }
}
   `

## ORDER COLLECTION API

https://documenter.getpostman.com/view/40272685/2sAYX6qhfk
