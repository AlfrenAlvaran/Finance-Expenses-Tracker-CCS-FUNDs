import UserModel from "../models/user.model.js";

const deleteUnverifiedUsers = async () => {
  try {
    const cutoffDate = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const result = await UserModel({
      isVerified: false,
      createdAt: { $lt: cutoffDate },
    });

    if(result.deletedCount > 0) {
        console.log(`⏰ Deleted ${result.deletedCount} unverified users`);
    }
  } catch (error) {
    console.error("❌ Error in deleteUnverifiedUsers:", error.message);
  }
};
export default deleteUnverifiedUsers;