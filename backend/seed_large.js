import mongoose from "mongoose";
import hotelModel from "./models/hotelModel.js";
import foodModel from "./models/foodModel.js";

const MONGO_URI = 'mongodb+srv://Bhuhshan:12345@cluster0.7rtg0hk.mongodb.net/food-del?retryWrites=true&w=majority&appName=Cluster0';

// City coordinates
const cities = {
  Mumbai: { lat: 19.0760, lng: 72.8777 },
  Delhi: { lat: 28.6139, lng: 77.2090 },
  Pune: { lat: 18.5204, lng: 73.8567 },
  Bangalore: { lat: 12.9716, lng: 77.5946 },
  Hyderabad: { lat: 17.3850, lng: 78.4867 },
  Chennai: { lat: 13.0827, lng: 80.2707 }
};

// Base arrays to generate 20 items per category
const dishBases = {
  NorthIndian: ["Butter Chicken", "Garlic Naan", "Paneer Tikka Masala", "Dal Makhani", "Tandoori Chicken", "Chole Bhature", "Palak Paneer", "Malai Kofta", "Rajma Chawal", "Mutton Rogan Josh", "Kadhai Paneer", "Jeera Rice", "Aloo Paratha", "Bhindi Masala", "Chicken Korma", "Fish Curry", "Pulao", "Lassi", "Gulab Jamun", "Rasmalai", "Chicken Tikka", "Keema Naan"],
  SouthIndian: ["Masala Dosa", "Idli Sambar", "Medu Vada", "Filter Coffee", "Uttapam", "Rava Dosa", "Mysore Masala Dosa", "Upma", "Pongal", "Appam", "Pesarattu", "Bisi Bele Bath", "Curd Rice", "Lemon Rice", "Tamarind Rice", "Kerala Parotta", "Chettinad Chicken", "Fish Moolie", "Payasam", "Kesari Bath", "Coconut Chutney", "Onion Uthappam"],
  FastFood: ["Classic Cheeseburger", "French Fries", "Chicken Wings", "Veggie Burger", "Milkshake", "Chicken Nuggets", "Onion Rings", "Margherita Pizza", "Pepperoni Pizza", "Hot Dog", "Crispy Chicken Sandwich", "BBQ Ribs", "Nachos", "Tacos", "Burrito", "Loaded Fries", "Garlic Bread", "Mozzarella Sticks", "Brownie Sundae", "Cola", "Chicken Tenders", "Waffles"],
  Biryani: ["Hyderabadi Chicken Biryani", "Mutton Dum Biryani", "Veg Biryani", "Egg Biryani", "Paneer Biryani", "Prawns Biryani", "Kolkata Chicken Biryani", "Lucknowi Mutton Biryani", "Sindhi Biryani", "Malabar Fish Biryani", "Thalassery Biryani", "Ambur Biryani", "Dindigul Biryani", "Keema Biryani", "Kashmiri Pulao", "Chicken Tikka Biryani", "Afghani Biryani", "Mushroom Biryani", "Soya Chaap Biryani", "Bamboo Biryani", "Handi Biryani", "Matka Biryani"],
  Italian: ["Margherita Pizza", "Pasta Carbonara", "Lasagna", "Ravioli", "Tiramisu", "Garlic Bread", "Pesto Pasta", "Risotto", "Bruschetta", "Fettuccine Alfredo", "Gnocchi", "Caprese Salad", "Minestrone Soup", "Calzone", "Panna Cotta", "Gelato", "Cannoli", "Spaghetti Bolognese", "Macaroni", "Mushroom Pizza", "Cheese Burst Pizza"],
  Chinese: ["Hakka Noodles", "Fried Rice", "Manchurian", "Spring Rolls", "Momos", "Chop Suey", "Sweet and Sour Chicken", "Chilli Paneer", "Kung Pao Chicken", "Dim Sum", "Wonton Soup", "Szechuan Noodles", "Crispy Fried Corn", "Honey Chilli Potato", "Peking Duck", "Garlic Noodles", "Manchow Soup", "Hot and Sour Soup", "Baozi", "Chilli Garlic Rice"],
  Desserts: ["Chocolate Cake", "Ice Cream Sundae", "Brownie", "Cheesecake", "Gulab Jamun", "Rasgulla", "Jalebi", "Rasmalai", "Macarons", "Cupcakes", "Donut", "Waffles", "Pancakes", "Fruit Tart", "Mousse", "Pudding", "Truffle", "Red Velvet Cake", "Apple Pie", "Lava Cake"],
  Beverages: ["Cold Coffee", "Mojito", "Iced Tea", "Fresh Lime Soda", "Mango Lassi", "Strawberry Shake", "Chocolate Shake", "Vanilla Shake", "Espresso", "Cappuccino", "Latte", "Americano", "Green Tea", "Masala Chai", "Lemonade", "Orange Juice", "Watermelon Juice", "Pineapple Juice", "Smoothie", "Diet Coke"],
  Starters: ["Paneer Tikka", "Chicken Tikka", "Spring Rolls", "Garlic Bread", "French Fries", "Momos", "Nachos", "Bruschetta", "Crispy Corn", "Chilli Paneer", "Fish Fingers", "Chicken Wings", "Cheese Balls", "Samosa", "Onion Rings", "Veg Cutlet", "Seekh Kebab", "Mushroom Tikka", "Hara Bhara Kebab", "Chicken 65"]
};

const adjectives = ["Spicy", "Special", "Classic", "Premium", "Homestyle", "Crispy", "Creamy", "Authentic", "Royal", "Fiery"];

const restaurantPrefixes = ["The Grand", "Royal", "Spicy", "Golden", "Silver", "Urban", "Street", "Classic", "Vintage", "Modern", "Tasty", "Delicious", "Famous", "Hidden", "Local", "Premium", "Authentic", "Gourmet", "Fresh", "Daily"];
const restaurantSuffixes = ["Diner", "Cafe", "Bistro", "Restaurant", "Eatery", "Kitchen", "Grill", "Tavern", "House", "Lounge", "Hub", "Spot", "Corner", "Place", "Joint", "Express", "Oven", "Wok", "Bowl", "Plates"];
const menuTypes = ["NorthIndian", "SouthIndian", "FastFood", "Biryani", "Italian", "Chinese", "Desserts", "Beverages"];

const generateMenu = (categoryName) => {
    let menu = [];
    
    for (let i = 0; i < 20; i++) {
        let granularCategory = "Main Course";
        let sourceArray = dishBases[categoryName]; // Default to Main Course array
        
        if (i < 5) {
            granularCategory = "Starters";
            sourceArray = dishBases["Starters"];
        } else if (i >= 15 && i < 18) {
            granularCategory = "Desserts";
            sourceArray = dishBases["Desserts"];
        } else if (i >= 18) {
            granularCategory = "Beverages";
            sourceArray = dishBases["Beverages"];
        }

        let name = "";
        let indexInSource = (granularCategory === "Main Course") ? (i - 5) : 
                            (granularCategory === "Desserts") ? (i - 15) : 
                            (granularCategory === "Beverages") ? (i - 18) : i;

        if (indexInSource < sourceArray.length) {
            name = sourceArray[indexInSource];
        } else {
            let randomBase = sourceArray[Math.floor(Math.random() * sourceArray.length)];
            let randomAdj = adjectives[Math.floor(Math.random() * adjectives.length)];
            name = `${randomAdj} ${randomBase}`;
        }
        
        let lockId = Math.floor(Math.random() * 10000);
        
        // Extract a meaningful keyword from the name (usually the last word, e.g., "Butter Chicken" -> "chicken")
        let keyword = name.split(" ").pop().toLowerCase();
        let image = `https://loremflickr.com/400/300/${encodeURIComponent(keyword)},food?lock=${lockId}`;
        
        let price = Math.floor(Math.random() * 300) + 100;

        menu.push({
            name: name,
            description: `Delicious and freshly prepared ${name.toLowerCase()}.`,
            price: price,
            image: image,
            category: granularCategory
        });
    }
    return menu;
};

const generateHotels = () => {
    let hotels = [];
    
    for (const [cityName, coords] of Object.entries(cities)) {
        // Generate 20 restaurants per city
        for (let i = 0; i < 20; i++) {
            let prefix = restaurantPrefixes[Math.floor(Math.random() * restaurantPrefixes.length)];
            let suffix = restaurantSuffixes[Math.floor(Math.random() * restaurantSuffixes.length)];
            let type = menuTypes[Math.floor(Math.random() * menuTypes.length)];
            
            let latOffset = (Math.random() - 0.5) * 0.1;
            let lngOffset = (Math.random() - 0.5) * 0.1;

            let lockId = Math.floor(Math.random() * 10000);
            
            let restaurantKeyword = type.replace("Indian", ""); // "North", "South", "FastFood", "Biryani"
            if (type === "FastFood") restaurantKeyword = "burger";
            
            hotels.push({
                name: `${prefix} ${cityName} ${suffix}`,
                description: `The best ${type} you'll find in ${cityName}.`,
                image: `https://loremflickr.com/400/300/restaurant,${restaurantKeyword}?lock=${lockId}`,
                rating: (Math.random() * (5 - 3.5) + 3.5).toFixed(1),
                address: `Local Street, ${cityName}`,
                location: { 
                    type: "Point", 
                    coordinates: [coords.lng + lngOffset, coords.lat + latOffset] 
                },
                menuType: type
            });
        }
    }
    return hotels;
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to Database for generating massive nationwide database...");

    await hotelModel.deleteMany({});
    await foodModel.deleteMany({});
    console.log("Cleared old hotels and foods.");

    const generatedHotels = generateHotels();
    const foodsToInsert = [];

    for (const hotelData of generatedHotels) {
        const { menuType, ...hotelObj } = hotelData;
        const insertedHotel = await hotelModel.create(hotelObj);
        
        const menuItems = generateMenu(menuType);
        for (const item of menuItems) {
            foodsToInsert.push({
                ...item,
                hotel: insertedHotel._id
            });
        }
    }

    // Insert foods in batches to avoid overwhelming the memory/connection
    const batchSize = 500;
    for (let i = 0; i < foodsToInsert.length; i += batchSize) {
        const batch = foodsToInsert.slice(i, i + batchSize);
        await foodModel.insertMany(batch);
        console.log(`Inserted batch of ${batch.length} foods...`);
    }

    console.log(`Successfully inserted ${generatedHotels.length} restaurants (20 per city).`);
    console.log(`Successfully inserted ${foodsToInsert.length} food items (20 items per restaurant).`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
