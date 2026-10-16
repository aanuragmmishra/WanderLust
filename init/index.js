
require("dotenv").config();

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const categories = [
    "Trending",
    "Rooms",
    "Iconic Cities",
    "Mountains",
    "Castles",
    "Amazing Pools",
    "Camping",
    "Farms",
    "Arctic",
    "Domes",
];

async function main() {
    if (!process.env.ATLASDB_URL) {
        throw new Error("ATLASDB_URL is missing from the .env file");
    }

    await mongoose.connect(process.env.ATLASDB_URL);
    console.log("Connected to MongoDB Atlas");
}

async function initDB() {
    try {
        await main();

        // Prepare your existing sample listings.
        const listings = initData.data.map((obj, index) => ({
            ...obj,
            owner: "68c866bbbc1488b1a0541789",
            category: obj.category || categories[index % categories.length],
            geometry: obj.geometry || {
                type: "Point",
                coordinates: [0, 0],
            },
        }));

        // Replace existing listings with the sample data.
        await Listing.deleteMany({});
        await Listing.insertMany(listings);

        console.log(`Successfully initialized ${listings.length} listings`);
    } catch (err) {
        console.error("Initialization failed:", err);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
        console.log("Database connection closed");
    }
}

initDB();
