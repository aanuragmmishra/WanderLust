require("dotenv").config();
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");

const geocodingClient = mbxGeocoding({
  accessToken: process.env.MAP_TOKEN
});

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");

async function fixGeometry() {
  const listings = await Listing.find({
    $or: [
      { geometry: { $exists: false } },
      { "geometry.coordinates": { $exists: false } }
    ]
  });

  console.log(`Fixing ${listings.length} listings...`);

  for (let listing of listings) {
    const response = await geocodingClient.forwardGeocode({
      query: `${listing.location}, ${listing.country}`,
      limit: 1
    }).send();

    if (!response.body.features.length) continue;

    listing.geometry = response.body.features[0].geometry;
    await listing.save();
  }

  console.log("✅ Old listings fixed");
  mongoose.connection.close();
}

fixGeometry();
