
export const initialCars = [
  {
    id: 1,
    name: "Toyota Fortuner",
    brand: "Toyota",
    category: "SUV",
    price: 4000,
    seats: 7,
    transmission: "Automatic",
    fuel: "Diesel",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1000",
    description: "A powerful and comfortable SUV for family trips and long journeys."
  },
  {
    id: 2,
    name: "BMW 5 Series",
    brand: "BMW",
    category: "Luxury",
    price: 6500,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1000",
    description: "Experience premium comfort and elegant performance."
  },
  {
    id: 3,
    name: "Hyundai Creta",
    brand: "Hyundai",
    category: "SUV",
    price: 2800,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=1000",
    description: "A stylish SUV with comfort and practical features."
  },
  {
    id: 4,
    name: "Mercedes Benz C-Class",
    brand: "Mercedes",
    category: "Luxury",
    price: 7500,
    seats: 5,
    transmission: "Automatic",
    fuel: "Petrol",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1000",
    description: "Enjoy an elegant luxury driving experience."
  },
  {
    id: 5,
    name: "Honda City",
    brand: "Honda",
    category: "Sedan",
    price: 2200,
    seats: 5,
    transmission: "Manual",
    fuel: "Petrol",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1000",
    description: "A comfortable sedan for everyday travel."
  },
  {
    id: 6,
    name: "Mahindra Thar",
    brand: "Mahindra",
    category: "SUV",
    price: 3500,
    seats: 4,
    transmission: "Manual",
    fuel: "Diesel",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1519245659620-e859806a8d3b?w=1000",
    description: "A bold SUV for exciting road adventures."
  }
];

export function getCars() {
  return [
    ...initialCars,
    ...JSON.parse(localStorage.getItem("extraCars") || "[]")
  ];
}
