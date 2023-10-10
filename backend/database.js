const mongoose = require('mongoose')
require('dotenv').config(); 
// Define an asynchronous function for connecting to MongoDB and fetching data
const mongoDB = async () => {
  try {
    // Connect to MongoDB using the provided connection string
    await mongoose.connect(process.env.REACT_APP_MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to MongoDB");

    // Get a reference to the "food_items" and "food_category"  collection
    const fetchDB = mongoose.connection.db.collection("food_items");
    const foodCategory = mongoose.connection.db.collection("food_category");

    // Fetch all documents from the "food_items" and "food_category" collection and convert them to an array
    const data = await fetchDB.find({}).toArray();
    const categoryData = await foodCategory.find({}).toArray();

    // Store the fetched data in global variables
    global.food_items = data;
    global.food_category = categoryData;
    
    // console.log(global.food_category);

  } catch (err) {
    // If an error occurs during connection or data retrieval, log the error
    console.error("Error:", err);
  }
};

module.exports = mongoDB;
