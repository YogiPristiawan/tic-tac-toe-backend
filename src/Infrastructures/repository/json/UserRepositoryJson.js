const fs = require("fs");
const userJson = require("../../database/json/users.json");
const UserRepository = require("../../../Domain/users/UserRepository");

class UserRepositoryJson extends UserRepository {
	constructor() {
		super();
	}

	async getUsers() {
		return userJson;
	}
}

module.exports = UserRepositoryJson;
