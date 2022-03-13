const express = require("express");
const { createServer } = require("http");
const app = express();
const users = require("../../Interfaces/http/api/users");
const httpServer = createServer(app);

const createApp = (container) => {
	app.use(users(container));
};

module.exports = { createApp, httpServer };
