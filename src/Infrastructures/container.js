const UserUseCase = require("../Applications/use_case/UserUseCase");
const UserRepository = require("../Domain/users/UserRepository");
const UserRepositoryJson = require("../Infrastructures/repository/json/UserRepositoryJson");

const { createContainer, asClass } = require("awilix");

const container = createContainer();

/**
 * register use case
 */
container.register({
	userUseCase: asClass(UserUseCase).scoped(),
});

/**
 * register repository
 */
container.register({
	userRepository: asClass(UserRepositoryJson).scoped(),
	// userRepositoryJson: asClass(UserRepositoryJson).scoped(),
});

module.exports = container;
