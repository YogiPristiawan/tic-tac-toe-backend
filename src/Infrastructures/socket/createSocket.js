const { Server } = require("socket.io");

const createSocket = async (httpServer) => {
	const io = new Server(httpServer, {
		cors: {
			origin: process.env.SOCKET_ALLOW_ORIGIN
				? process.env.SOCKET_ALLOW_ORIGIN.split(" ")
				: false,
		},
	});

	io.use(async (socket, next) => {
		if (socket.handshake.query.username !== undefined) {
			const clients = await io.fetchSockets();
			const usernameExists = clients.filter(
				(client) =>
					client.handshake.query.username === socket.handshake.query.username,
			);

			if (usernameExists.length > 0) {
				next(new Error("Username already exists"));
				return socket.disconnect();
			}
		}
		next();
	});

	io.on("connection", async (socket) => {
		const usersSocket = await io.fetchSockets();
		const users = usersSocket.map((socket) => socket.handshake.query.username);

		socket.on("disconnect", (reason) => {
			if (socket.username) {
				io.emit("userDisconnected", {
					disconnectedUser: socket.handshake.query.username,
					currentUser: users,
				});
			}
		});

		io.emit("userConnected", {
			connectedUser: socket.handshake.query.username,
			currentUser: users,
		});
	});
};

module.exports = createSocket;
