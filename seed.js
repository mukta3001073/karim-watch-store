require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const fallback = [
  { name: 'Classic Chronograph', brand: 'Karim', description: 'Stainless steel chronograph with sapphire glass.', price: 249, image: 'https://placehold.co/400x400?text=Chronograph', category: 'mens-watches', stock: 12, rating: 4.6 },
  { name: 'Rose Gold Elegance', brand: 'Karim', description: 'Slim rose gold dress watch with leather strap.', price: 199, image: 'https://placehold.co/400x400?text=Rose+Gold', category: 'womens-watches', stock: 8, rating: 4.4 },
  { name: 'Diver Pro 300M', brand: 'Karim', description: 'Water resistant automatic diver watch.', price: 329, image: 'https://placehold.co/400x400?text=Diver+Pro', category: 'mens-watches', stock: 5, rating: 4.8 },
  { name: 'Minimalist Silver', brand: 'Karim', description: 'Clean dial, mesh strap, everyday luxury.', price: 149, image: 'https://placehold.co/400x400?text=Minimalist', category: 'womens-watches', stock: 20, rating: 4.2 },
];

async function fetchWatches() {
  try {
    const all = [];
    for (const cat of ['mens-watches', 'womens-watches']) {
      const res = await fetch(`https://dummyjson.com/products/category/${cat}`);
      if (!res.ok) throw new Error(`DummyJSON responded ${res.status}`);
      const data = await res.json();
      all.push(...data.products);
    }
    return all.map((p) => ({
      name: p.title,
      brand: p.brand || 'Karim',
      description: p.description,
      price: p.price,
      image: p.thumbnail,
      category: p.category,
      stock: p.stock,
      rating: p.rating,
    }));
  } catch (err) {
    console.warn('Mock API unavailable, using fallback data:', err.message);
    return fallback;
  }
}

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const watches = await fetchWatches();
    await Product.deleteMany({});
    await Product.insertMany(watches);
    console.log(`Seeded ${watches.length} watches`);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
