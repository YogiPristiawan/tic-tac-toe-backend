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
}

module.exports = UsersHandler;
