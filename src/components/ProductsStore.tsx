import { useState } from 'react';

interface Product {
  id: number;
  name: string;
  nameEn: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  inStock: boolean;
  description: string;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  { id: 1, name: 'MEGA PROTEIN', nameEn: 'بروتين عالي الجودة', price: 450, oldPrice: 550, image: '🥤', category: 'مكملات غذائية', inStock: true, description: 'بروتين واي عالي الجودة لبناء العضلات' },
  { id: 2, name: 'شنطة رياضية', nameEn: 'Sports Bag', price: 250, image: '🎒', category: 'معدات', inStock: true, description: 'شنطة رياضية واسعة بجيوب متعددة' },
  { id: 3, name: 'زي تدريبي', nameEn: 'Training Kit', price: 350, image: '👕', category: 'ملابس', inStock: true, description: 'زي تدريبي كامل بشعار الأكاديمية' },
  { id: 4, name: 'حذاء رياضي', nameEn: 'Sports Shoes', price: 650, oldPrice: 800, image: '👟', category: 'معدات', inStock: true, description: 'حذاء رياضي مريح لجميع الرياضات' },
  { id: 5, name: 'زجاجة مياه', nameEn: 'Water Bottle', price: 80, image: '💧', category: 'إكسسوارات', inStock: true, description: 'زجاجة مياه عازلة 750 مل' },
  { id: 6, name: 'قفازات حراسة', nameEn: 'Goalkeeper Gloves', price: 280, image: '🧤', category: 'معدات', inStock: false, description: 'قفازات حراسة م احترافية' },
];

export default function ProductsStore() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [filter, setFilter] = useState('all');

  const categories = ['all', ...new Set(products.map(p => p.category))];
  const filteredProducts = filter === 'all' ? products : products.filter(p => p.category === filter);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <section id="products" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 glass-card px-4 py-2 mb-4">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-purple-300 text-xs font-semibold">متجر الأكاديمية</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            🛒 متجر <span className="gradient-text">المنتجات</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            مكملات غذائية، معدات رياضية، ملابس، وإكسسوارات
          </p>
        </div>

        {/* Cart Button (Floating) */}
        <button
          onClick={() => setShowCart(!showCart)}
          className="fixed bottom-6 left-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 text-white flex items-center justify-center shadow-2xl shadow-purple-500/50 hover:scale-110 transition-transform"
        >
          <span className="text-xl">🛒</span>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === cat
                  ? 'bg-gradient-to-l from-purple-500 to-violet-600 text-white'
                  : 'glass-card text-gray-400 hover:text-white'
              }`}
            >
              {cat === 'all' ? 'الكل' : cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="glass-card overflow-hidden group hover:scale-105 transition-all">
              {/* Image */}
              <div className="aspect-square bg-gradient-to-br from-purple-500/10 to-violet-500/10 flex items-center justify-center text-6xl relative">
                {product.image}
                {product.oldPrice && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-[10px] font-bold rounded-full">
                    خصم {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                  </div>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">نفذت الكمية</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="text-purple-300 text-[10px] mb-1">{product.category}</div>
                <h3 className="text-white font-bold text-sm mb-1">{product.name}</h3>
                <p className="text-gray-400 text-xs mb-3 leading-relaxed">{product.description}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold text-lg">{product.price}</span>
                    <span className="text-gray-400 text-xs mr-1">ج.م</span>
                    {product.oldPrice && (
                      <span className="text-gray-500 text-xs line-through mr-2">{product.oldPrice}</span>
                    )}
                  </div>
                  <button
                    onClick={() => product.inStock && addToCart(product)}
                    disabled={!product.inStock}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      product.inStock
                        ? 'bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30'
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {product.inStock ? '+ أضف' : 'غير متاح'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-0 z-50 flex items-center justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowCart(false)} />
            <div className="relative w-full max-w-md h-full bg-slate-900 border-l border-white/10 p-6 overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-xl flex items-center gap-2">
                  <span>🛒</span> سلة المشتريات
                </h3>
                <button
                  onClick={() => setShowCart(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-5xl mb-4">🛒</div>
                  <p className="text-gray-400">السلة فارغة</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    {cart.map((item) => (
                      <div key={item.id} className="glass-card-light p-3 flex items-center gap-3">
                        <div className="text-2xl">{item.image}</div>
                        <div className="flex-1">
                          <div className="text-white text-sm font-semibold">{item.name}</div>
                          <div className="text-purple-300 text-xs">{item.price} ج.م</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white text-xs"
                          >
                            -
                          </button>
                          <span className="text-white text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 rounded bg-white/10 hover:bg-white/20 text-white text-xs"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="glass-card p-4 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-sm">المجموع</span>
                      <span className="text-white font-bold text-xl">{cartTotal} ج.م</span>
                    </div>
                    <button className="w-full py-3 bg-gradient-to-l from-purple-500 to-violet-600 text-white text-sm font-bold rounded-lg shadow-lg">
                      إتمام الشراء
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
