// Dummy product dataset for /data-table. Replace `buildProducts()` with an API call later.
export const CATEGORIES = ['Elektronik', 'Fashion', 'Makanan', 'Aksesoris', 'Rumah Tangga', 'Olahraga'];
export const STATUSES = ['Active', 'Draft', 'Archived'];

const NAMES = {
  Elektronik: [
    'Wireless Headphone Pro',
    'Mechanical Keyboard RGB',
    'Monitor 27" 4K IPS',
    'Power Bank 20000mAh',
    'Webcam Full HD',
    'Speaker Bluetooth Mini',
    'SSD Portable 1TB',
    'Mouse Gaming Pro',
    'USB-C Hub 8-in-1',
    'Smart Plug WiFi',
  ],
  Fashion: [
    'Ransel Premium Urban',
    'Jaket Hoodie Limited',
    'Kaos Polos Cotton',
    'Celana Chino Slim',
    'Sepatu Sneakers Classic',
    'Topi Baseball',
    'Kemeja Flannel',
    'Dompet Kulit Pria',
  ],
  Makanan: [
    'Coffee Beans Arabica',
    'Teh Hijau Premium',
    'Madu Hutan Murni',
    'Keripik Singkong Pedas',
    'Granola Oat Mix',
    'Sambal Roa Botol',
    'Cokelat Dark 70%',
    'Kopi Sachet Gayo',
  ],
  Aksesoris: [
    'Smartwatch Series 5',
    'Kacamata Blue Light',
    'Gelang Kulit Anyaman',
    'Casing Ponsel Armor',
    'Tali Kamera Premium',
    'Tas Laptop 14"',
    'Earphone Kabel Bass',
    'Strap Jam Silikon',
  ],
  'Rumah Tangga': [
    'Lampu Meja LED',
    'Botol Minum Stainless',
    'Set Pisau Dapur',
    'Rak Sepatu Lipat',
    'Diffuser Aromaterapi',
    'Blender Portable',
    'Tempat Sampah Pedal',
    'Organizer Kabel',
  ],
  Olahraga: [
    'Matras Yoga Premium',
    'Dumbbell Set 10kg',
    'Resistance Band Set',
    'Sepeda Statis Lipat',
    'Sarung Tangan Gym',
    'Jump Rope Speed',
    'Botol Shaker Protein',
    'Foam Roller',
  ],
};

const ICONS = {
  Elektronik: 'fa-headphones',
  Fashion: 'fa-shirt',
  Makanan: 'fa-mug-hot',
  Aksesoris: 'fa-glasses',
  'Rumah Tangga': 'fa-lightbulb',
  Olahraga: 'fa-dumbbell',
};
export const categoryIcon = (c) => ICONS[c] || 'fa-box';

// small deterministic PRNG so SSR and client render the same data
function rng(seed) {
  let s = seed;
  return () => (s = (s * 1664525 + 1013904223) % 4294967296) / 4294967296;
}

export function buildProducts() {
  const rand = rng(2026);
  const out = [];
  let id = 1001;
  CATEGORIES.forEach((cat) => {
    NAMES[cat].forEach((name, i) => {
      const price = Math.round((15000 + rand() * 4500000) / 1000) * 1000;
      const r = rand();
      const stock = r < 0.1 ? 0 : r < 0.28 ? Math.floor(1 + rand() * 5) : Math.floor(10 + rand() * 190);
      const sr = rand();
      const month = 1 + Math.floor(rand() * 9);
      const day = 1 + Math.floor(rand() * 27);
      out.push({
        id: id++,
        name,
        sku: `${cat.slice(0, 3).toUpperCase()}-${String(i + 1).padStart(3, '0')}`,
        category: cat,
        price,
        stock,
        status: sr < 0.72 ? 'Active' : sr < 0.9 ? 'Draft' : 'Archived',
        main: rand() < 0.15,
        created: `2026-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      });
    });
  });
  return out;
}

export const idr = (n) => 'Rp ' + Number(n).toLocaleString('id-ID');
