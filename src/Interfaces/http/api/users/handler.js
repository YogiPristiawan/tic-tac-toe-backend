class UsersHandler {
	constructor(container) {
		this._container = container;
	}

	handleGetUsers = async (req, res, next) => {
		const userUseCase = this._container.resolve("userUseCase");
		const result = await userUseCase.getUsers();
		console.log(result);
		return res.json(result);
	};

	handleTestingBot = async (req, res, next) => {
		console.log(req);
		return res.json({ oke: "oke" });
	};
}

module.exports = UsersHandler;
