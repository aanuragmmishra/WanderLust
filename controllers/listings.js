const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const { category } = req.query;

  let listings;
  
  if (category) {
    listings = await Listing.find({ category });
  } else {
    listings = await Listing.find({});
  }

  res.render("listings/index", { listings, category });

};


module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path: "reviews", populate:{path: "author"},}).populate("owner");
    if(!listing){
        req.flash("error", "Listing you are requested for does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
};

module.exports.createListing = async (req, res, next) => {
    let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1,
    })
    .send();

    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename};

    newListing.geometry = {
    type: "Point",
    coordinates: response.body.features[0].geometry.coordinates, // [lng, lat]
  };

    let savedListing = await newListing.save();
    console.log(savedListing);
    req.flash("success", "New Listings Created!");
    res.redirect("/listings");
};

module.exports.editListing = async (req, res) => {
    let {id} = req.params;
    const listings = await Listing.findById(id);
    if(!listings){
        req.flash("error", "Listing you are requested for does not exist!");
        return res.redirect("/listings");
    }

    let originalImageUrl = listings.image.url;
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
    res.render("listings/edit.ejs", {listings, originalImageUrl});
};

module.exports.updateListing = async (req, res) =>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url, filename};
    await listing.save();
    }

    req.flash("success", "Listings Updated!");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    // if(!req.body.listing){
    //     throw new ExpressError(400, "Send valid data for listing");
    // }
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listings Deleted!");
    res.redirect("/listings");
};