require("dotenv").config();
const { createApp, httpServer } = require("./Infrastructures/http/server");
const createSocket = require("./Infrastructures/socket/createSocket");
const container = require("./Infrastructures/container");

createApp(container);
createSocket(httpServer);

httpServer.listen(process.env.APP_PORT || 3000, () => {
	console.log(`server listen on port ${process.env.APP_PORT || 3000}`);
});
