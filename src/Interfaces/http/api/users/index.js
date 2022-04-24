const app = require("express")();
const router = require("express").Router();
const UsersHandler = require("./handler");

const users = (container) => {
	const userHandler = new UsersHandler(container);

	router.get("/", userHandler.handleGetUsers);

	router.get("/testing-bot", userHandler.handleTestingBot);

	app.use("/users", router);
	return app;
};

module.exports = users;
