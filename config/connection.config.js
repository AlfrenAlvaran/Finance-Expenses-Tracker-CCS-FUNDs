import mongoose from "mongoose";

class Connection {
  constructor() {
    if (!Connection.instance) {
      this.connection = null;
      Connection.instance = this;
    }
    return Connection.instance;
  }

  async connect() {
    if (this.connection) return this.connection; 

    try {
      this.connection = await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ MongoDB connected successfully.");
    } catch (error) {
      console.error("❌ MongoDB connection error:", error);
      throw error;
    }
  }

  async disconnect() {
    if (this.connection) {
      await mongoose.disconnect();
      console.log("🔌 MongoDB disconnected.");
      this.connection = null;
    }
  }
}

export default new Connection();
