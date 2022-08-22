import mongoose from "mongoose";
const { connect: mongooseConnect, connection } = mongoose;

export function connect() {
    if (!process.env.MONGO_URL) {
        throw new Error("Please add the MONGO_URL environment variable");
    }

    mongooseConnect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    connection.on(
        "error",
        () => {
            throw new Error("❌ mongodb connection error")
        }
    );
    connection.once("open", () => console.log("✅ mongodb connected successfully"));
}
