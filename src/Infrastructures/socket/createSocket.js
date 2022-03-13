const { Server } = require("socket.io");

const createSocket = async (httpServer) => {
	const io = new Server(httpServer, {
		cors: {
			origin: [process.env.APP_URL, "http://localhost:8000"],
		},
	});

	io.use(async (socket, next) => {
		const usersSocket = await io.fetchSockets();
		const users = usersSocket.map((socket) => socket.handshake.query.username);
		console.log("user saat ini adalah ", users);

		if (socket.handshake.query.username !== undefined) {
			const clients = await io.fetchSockets();
			const usernameExists = clients.filter(
				(client) =>
					client.handshake.query.username === socket.handshake.query.username,
			);

			if (usernameExists.length > 0) {
				return next(new Error("Username already exists"));
			}
		}
		next();
	});

	io.on("connection", async (socket) => {
		socket.on("disconnect", (reason) => {
			console.log("user disconnect due " + reason);
		});
	});
};

module.exports = createSocket;
