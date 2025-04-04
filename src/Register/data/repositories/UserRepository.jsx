import UserAPI from "../datasources/UserAPI";

const UserRepository = {
  async createUser(user) {
    return await UserAPI.createUser(user);
  },
};

export default UserRepository;
