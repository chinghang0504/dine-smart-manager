import axios from "axios";

// Global constants
const SERVER_URL = import.meta.env.VITE_SERVER_URL;

// Get all the food types (Manager)
export async function getAllFoodTypes() {
    const res = await axios.get(`${SERVER_URL}/manager/menu/foodtypes`);
    return res.data;
}

// Create a new food type (Manager)
export async function createFoodType(type, image, priority) {
    const res = await axios.post(`${SERVER_URL}/manager/menu/foodtypes`, { type, image, priority });
    return res.data;
}

// Delete a food type (Manager)
export async function deleteFoodType(id) {
    const res = await axios.delete(`${SERVER_URL}/manager/menu/foodtypes`, { id });
    return res.data;
}

// Modify a food type (Manager)
export async function modifyFoodType(id, type, image, priority) {
    const res = await axios.put(`${SERVER_URL}/manager/menu/foodtypes`, { id, type, image, priority });
    return res.data;
}

// Get all the food items (Manager)
export async function getAllFoodItems(foodtype) {
    const res = await axios.get(`${SERVER_URL}/manager/menu/fooditems`, { foodtype });
    return res.data;
}

// Create a new food item (Manager)
export async function createFoodItem(name, description, price, image, priority, type) {
    const res = await axios.post(`${SERVER_URL}/manager/menu/fooditems`, { name, description, price, image, priority, type });
    return res.data;
}

// Delete a food item (Manager)
export async function deleteFoodItem(id) {
    const res = await axios.delete(`${SERVER_URL}/manager/menu/fooditems`, { id });
    return res.data;
}

// Modify a food item (Manager)
export async function modifyFoodItem(id, name, description, price, image, priority, type) {
    const res = await axios.put(`${SERVER_URL}/manager/menu/fooditems`, { id, name, description, price, image, priority, type });
    return res.data;
}
