import mongoose from "mongoose";
import hotelModel from "./models/hotelModel.js";
import foodModel from "./models/foodModel.js";

const MONGO_URI = 'mongodb+srv://Bhuhshan:12345@cluster0.7rtg0hk.mongodb.net/food-del?retryWrites=true&w=majority&appName=Cluster0';

const dummyHotels = [
  {
    name: "The Grand Taj",
    description: "Premium North Indian and Mughlai cuisine",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    address: "123 Main Street, City Center",
    location: { type: "Point", coordinates: [72.8777, 19.0760] }
  },
  {
    name: "Spice Route Cafe",
    description: "Authentic South Indian delights",
    image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2070&auto=format&fit=crop",
    rating: 4.5,
    address: "45 MG Road",
    location: { type: "Point", coordinates: [72.8800, 19.0800] }
  },
  {
    name: "Burger & Co.",
    description: "Best fast food in town",
    image: "https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=2070&auto=format&fit=crop",
    rating: 4.2,
    address: "Food Court, Mall Avenue",
    location: { type: "Point", coordinates: [72.8700, 19.0700] }
  },
  {
    name: "Sushi Master",
    description: "Fresh Japanese Sushi and Ramen",
    image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop",
    rating: 4.9,
    address: "88 Ocean Drive",
    location: { type: "Point", coordinates: [72.8900, 19.0900] }
  },
  {
    name: "Pizza Heaven",
    description: "Wood-fired authentic Italian pizza",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974&auto=format&fit=crop",
    rating: 4.6,
    address: "21 Baker Street",
    location: { type: "Point", coordinates: [72.8600, 19.0600] }
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to Database for seeding...");

    // Clear old data
    await hotelModel.deleteMany({});
    await foodModel.deleteMany({});
    console.log("Cleared old hotels and foods.");

    // Insert dummy hotels
    const insertedHotels = await hotelModel.insertMany(dummyHotels);
    console.log(`Inserted ${insertedHotels.length} new hotels.`);

    const foodsToInsert = [];

    // Grand Taj Foods
    foodsToInsert.push(
      { name: "Butter Chicken", description: "Creamy tomato-based gravy.", price: 350, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=2070&auto=format&fit=crop", category: "North Indian", hotel: insertedHotels[0]._id },
      { name: "Garlic Naan", description: "Soft Indian flatbread infused with garlic.", price: 60, image: "https://images.unsplash.com/photo-1626200419199-391ae4be7a41?q=80&w=2090&auto=format&fit=crop", category: "Bread", hotel: insertedHotels[0]._id },
      { name: "Paneer Tikka Masala", description: "Spiced paneer cubes in rich gravy.", price: 320, image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=1971&auto=format&fit=crop", category: "North Indian", hotel: insertedHotels[0]._id },
      { name: "Dal Makhani", description: "Slow-cooked black lentils.", price: 250, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=2070&auto=format&fit=crop", category: "North Indian", hotel: insertedHotels[0]._id },
      { name: "Tandoori Chicken", description: "Roasted chicken with yogurt and spices.", price: 400, image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=1974&auto=format&fit=crop", category: "Starters", hotel: insertedHotels[0]._id }
    );

    // Spice Route Cafe Foods
    foodsToInsert.push(
      { name: "Masala Dosa", description: "Crispy crepe filled with spiced potatoes.", price: 120, image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=2070&auto=format&fit=crop", category: "South Indian", hotel: insertedHotels[1]._id },
      { name: "Idli Sambar", description: "Steamed rice cakes with lentil soup.", price: 80, image: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?q=80&w=2070&auto=format&fit=crop", category: "South Indian", hotel: insertedHotels[1]._id },
      { name: "Medu Vada", description: "Crispy savory donut.", price: 90, image: "https://plus.unsplash.com/premium_photo-1694141253763-209b4c8f8ace?q=80&w=2069&auto=format&fit=crop", category: "South Indian", hotel: insertedHotels[1]._id },
      { name: "Filter Coffee", description: "Traditional South Indian coffee.", price: 50, image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=2037&auto=format&fit=crop", category: "Beverages", hotel: insertedHotels[1]._id },
      { name: "Uttapam", description: "Thick pancake with vegetables.", price: 110, image: "https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?q=80&w=1976&auto=format&fit=crop", category: "South Indian", hotel: insertedHotels[1]._id }
    );

    // Burger & Co.
    foodsToInsert.push(
      { name: "Classic Cheeseburger", description: "Beef patty with melted cheese.", price: 200, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop", category: "Fast Food", hotel: insertedHotels[2]._id },
      { name: "French Fries", description: "Crispy golden potato fries.", price: 100, image: "https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=2070&auto=format&fit=crop", category: "Fast Food", hotel: insertedHotels[2]._id },
      { name: "Chicken Wings", description: "Spicy buffalo wings.", price: 250, image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?q=80&w=2070&auto=format&fit=crop", category: "Starters", hotel: insertedHotels[2]._id },
      { name: "Veggie Burger", description: "Plant-based patty with fresh veggies.", price: 180, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1965&auto=format&fit=crop", category: "Fast Food", hotel: insertedHotels[2]._id },
      { name: "Milkshake", description: "Thick chocolate milkshake.", price: 150, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1974&auto=format&fit=crop", category: "Beverages", hotel: insertedHotels[2]._id }
    );

    // Sushi Master
    foodsToInsert.push(
      { name: "Salmon Nigiri", description: "Fresh salmon over rice.", price: 400, image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop", category: "Japanese", hotel: insertedHotels[3]._id },
      { name: "Spicy Tuna Roll", description: "Tuna with spicy mayo.", price: 450, image: "https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=1925&auto=format&fit=crop", category: "Japanese", hotel: insertedHotels[3]._id },
      { name: "Pork Ramen", description: "Rich broth with noodles and pork belly.", price: 500, image: "https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=2031&auto=format&fit=crop", category: "Japanese", hotel: insertedHotels[3]._id },
      { name: "Miso Soup", description: "Traditional Japanese soup.", price: 150, image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1913&auto=format&fit=crop", category: "Japanese", hotel: insertedHotels[3]._id },
      { name: "Matcha Ice Cream", description: "Green tea flavored ice cream.", price: 200, image: "https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?q=80&w=2006&auto=format&fit=crop", category: "Dessert", hotel: insertedHotels[3]._id }
    );

    // Pizza Heaven
    foodsToInsert.push(
      { name: "Margherita Pizza", description: "Classic tomato, mozzarella, and basil.", price: 300, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=2069&auto=format&fit=crop", category: "Italian", hotel: insertedHotels[4]._id },
      { name: "Pepperoni Pizza", description: "Loaded with pepperoni.", price: 450, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=2080&auto=format&fit=crop", category: "Italian", hotel: insertedHotels[4]._id },
      { name: "Garlic Bread", description: "Toasted bread with garlic butter.", price: 150, image: "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?q=80&w=2070&auto=format&fit=crop", category: "Italian", hotel: insertedHotels[4]._id },
      { name: "Pasta Carbonara", description: "Creamy pasta with bacon.", price: 350, image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=2071&auto=format&fit=crop", category: "Italian", hotel: insertedHotels[4]._id },
      { name: "Tiramisu", description: "Classic Italian coffee dessert.", price: 250, image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=1974&auto=format&fit=crop", category: "Dessert", hotel: insertedHotels[4]._id }
    );

    await foodModel.insertMany(foodsToInsert);
    console.log(`Inserted ${foodsToInsert.length} food items.`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
