class UserUseCase {
	constructor({ userRepository }) {
		this._userRepository = userRepository;
	}

	getUsers = async () => {
		const result = await this._userRepository.getUsers();
		return result;
	};
}

module.exports = UserUseCase;
