const mongoose = require("mongoose");
const UserInfoModelSchema = require("./book.repository.model");

class BookFlightsRepository {
  constructor(options) {
    const initialize = async () => {
      throw new Error("Database connection not implemented");
    };

    initialize().catch((error) => {
      console.error("Failed to connect to the database: ", error);
    });
  }

  async getUserInfo(username) {
    const UserInfoModel = await mongoose.model(
      "UserInfoModel",
      UserInfoModelSchema
    );
    const result = await UserInfoModel.findOne({ user: username })
      .lean()
      .exec();
    return result || { user: username, booked: null, purchased: [] };
  }

  async createOrUpdateUserInfo(userInfo) {
    const UserInfoModel = await mongoose.model(
      "UserInfoModel",
      UserInfoModelSchema
    );
    await UserInfoModel.findOneAndUpdate({ user: userInfo.user }, userInfo, {
      upsert: true,
    });
  }
}

module.exports = BookFlightsRepository;
