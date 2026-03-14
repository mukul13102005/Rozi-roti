import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, 
  TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight,
  Plus, Search, Edit, Trash, MoreVertical, X, Menu,
  Settings as SettingsIcon, LogOut, Globe
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area,
  PieChart, Pie, Cell
} from 'recharts';
import { Product, Order } from '../types';

interface AdminPanelProps {
  products: Product[];
  orders: Order[];
  onClose: () => void;
}

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const pieData = [
  { name: 'Sarees', value: 400 },
  { name: 'Suits', value: 300 },
];

const COLORS = ['#800000', '#D4AF37'];

export const AdminPanel: React.FC<AdminPanelProps> = ({ products, orders, onClose }) => {
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'products' | 'orders' | 'customers' | 'settings'>('dashboard');
  const [showAddProduct, setShowAddProduct] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [adminSearchQuery, setAdminSearchQuery] = React.useState('');
  const [newProduct, setNewProduct] = React.useState<Partial<Product>>({
    name: '',
    price: 0,
    originalPrice: 0,
    category: 'Sarees',
    subCategory: '',
    image: 'https://picsum.photos/seed/saree/800/1200',
    rating: 4.5,
    stock: 10,
    isBestSeller: false,
    isTrending: false
  });

  const handleAddProduct = () => {
    // In a real app, this would call an API
    console.log('Adding product:', newProduct);
    setShowAddProduct(false);
    alert('Product added successfully (Simulation)');
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(product);
  };

  const handleUpdateProduct = () => {
    console.log('Updating product:', newProduct);
    setEditingProduct(null);
    alert('Product updated successfully (Simulation)');
  };

  const filteredAdminProducts = products.filter(p => 
    p.name.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(adminSearchQuery.toLowerCase())
  );

  const filteredAdminOrders = orders.filter(o => 
    o.id.toLowerCase().includes(adminSearchQuery.toLowerCase()) ||
    o.customer.name.toLowerCase().includes(adminSearchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[200] bg-slate-50 flex overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-brand-dark/60 backdrop-blur-sm z-[210] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`
        fixed lg:relative z-[220] h-full w-64 bg-brand-dark text-white flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 border-b border-white/10 flex justify-between items-center">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-brand-gold rounded-lg flex items-center justify-center text-brand-dark font-bold">R</div>
              <h2 className="text-xl font-serif font-bold text-brand-gold">RoziRoti</h2>
            </div>
            <p className="text-[8px] uppercase tracking-widest text-white/40">Admin Console v1.0</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
            <X size={20} />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'products', icon: Package, label: 'Inventory' },
            { id: 'orders', icon: ShoppingCart, label: 'Orders' },
            { id: 'customers', icon: Users, label: 'Customers' },
            { id: 'settings', icon: SettingsIcon, label: 'Settings' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id as any);
                if (window.innerWidth < 1024) setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-brand-gold text-brand-dark font-bold shadow-lg' : 'hover:bg-white/5 text-white/60'}`}
            >
              <item.icon size={18} />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <button 
            onClick={onClose}
            className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest"
          >
            <Globe size={14} />
            <span>View Site</span>
          </button>
          <button 
            onClick={onClose}
            className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white transition-all text-xs font-bold uppercase tracking-widest"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col">
        <header className="bg-white border-b border-slate-200 px-4 lg:px-8 py-4 lg:py-6 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-lg text-slate-600"
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-slate-800 capitalize">{activeTab}</h1>
              <p className="hidden sm:block text-xs text-slate-400">Welcome back, Administrator</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 lg:space-x-6">
            <div className="hidden md:relative md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search data..." 
                value={adminSearchQuery}
                onChange={(e) => setAdminSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl focus:ring-2 focus:ring-brand-maroon transition-all w-48 lg:w-64 text-sm" 
              />
            </div>
            <div className="flex items-center space-x-3 lg:border-l lg:border-slate-200 lg:pl-6">
              <div className="hidden sm:text-right sm:block">
                <p className="text-sm font-bold text-slate-800">Mukul Gupta</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">Super Admin</p>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-brand-maroon flex items-center justify-center text-white font-bold shadow-lg text-sm lg:text-base">M</div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8 flex-1">
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Revenue', value: '₹4,25,000', icon: DollarSign, trend: '+12.5%', up: true },
                  { label: 'Total Orders', value: '1,240', icon: ShoppingCart, trend: '+8.2%', up: true },
                  { label: 'Active Products', value: '64', icon: Package, trend: '-2.4%', up: false },
                  { label: 'Total Customers', value: '892', icon: Users, trend: '+15.3%', up: true },
                ].map((stat, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-slate-50 rounded-xl">
                        <stat.icon className="text-brand-maroon" size={24} />
                      </div>
                      <div className={`flex items-center text-xs font-bold ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {stat.trend} {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      </div>
                    </div>
                    <p className="text-slate-400 text-sm font-medium">{stat.label}</p>
                    <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
                  </motion.div>
                ))}
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                  <div className="flex justify-between items-center mb-8">
                    <h4 className="text-lg font-bold text-slate-800">Revenue Performance</h4>
                    <select className="bg-slate-50 border-none rounded-lg text-xs font-bold px-4 py-2">
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                    </select>
                  </div>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data}>
                        <defs>
                          <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#800000" stopOpacity={0.1}/>
                            <stop offset="95%" stopColor="#800000" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip 
                          contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                        />
                        <Area type="monotone" dataKey="sales" stroke="#800000" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100">
                  <h4 className="text-lg font-bold text-slate-800 mb-8">Category Distribution</h4>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          innerRadius={80}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-center space-x-8 mt-4">
                    {pieData.map((item, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{backgroundColor: COLORS[i]}} />
                        <span className="text-xs font-bold text-slate-600">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                  <h4 className="text-lg font-bold text-slate-800">Recent Transactions</h4>
                  <button className="text-brand-maroon font-bold text-sm hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAdminOrders.map((order, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-4 font-bold text-slate-600">#{order.id}</td>
                          <td className="px-8 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-brand-beige flex items-center justify-center text-brand-maroon font-bold text-xs">
                                {order.customer.name.charAt(0)}
                              </div>
                              <span className="font-medium text-slate-700">{order.customer.name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-4">
                            <select 
                              defaultValue={order.status}
                              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border-none focus:ring-0 cursor-pointer ${
                                order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' : 
                                order.status === 'Processing' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                              }`}
                              onChange={(e) => alert(`Status updated to ${e.target.value} (Simulation)`)}
                            >
                              <option value="Pending">Pending</option>
                              <option value="Processing">Processing</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-8 py-4 font-bold text-slate-800">₹{order.total}</td>
                          <td className="px-8 py-4">
                            <button className="p-2 hover:bg-slate-200 rounded-lg transition-colors">
                              <MoreVertical size={16} className="text-slate-400" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="space-y-8">
              <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-bold text-slate-800">Product Inventory</h4>
                    <p className="text-xs text-slate-400">Manage your collection and stock levels</p>
                  </div>
                  <button 
                    onClick={() => setShowAddProduct(true)}
                    className="maroon-gradient text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center space-x-2 shadow-lg hover:shadow-brand-maroon/20 transition-all"
                  >
                    <Plus size={18} />
                    <span>Add New Product</span>
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Product</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Category</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Price</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Stock</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredAdminProducts.map((product, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-4">
                            <div className="flex items-center space-x-4">
                              <img src={product.image} alt="" className="w-12 h-16 object-cover rounded-lg shadow-sm" />
                              <div>
                                <span className="font-bold text-slate-700 block">{product.name}</span>
                                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">{product.subCategory}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-8 py-4">
                            <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-8 py-4 font-bold text-slate-800">₹{product.price.toLocaleString()}</td>
                          <td className="px-8 py-4">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${product.stock < 5 ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                              <span className={`font-bold text-sm ${product.stock < 5 ? 'text-rose-500' : 'text-slate-600'}`}>
                                {product.stock} units
                              </span>
                            </div>
                          </td>
                          <td className="px-8 py-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleEditProduct(product)}
                                className="p-2 text-slate-400 hover:text-brand-maroon hover:bg-slate-100 rounded-lg transition-all"
                              >
                                <Edit size={16} />
                              </button>
                              <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-slate-100 rounded-lg transition-all"><Trash size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="space-y-8">
              <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-8 border-b border-slate-100">
                  <h4 className="text-lg font-bold text-slate-800">Customer Directory</h4>
                  <p className="text-xs text-slate-400">Manage your growing community</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50">
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Email</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Orders</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Spent</th>
                        <th className="px-8 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { name: 'Priya Sharma', email: 'priya@example.com', orders: 12, spent: '₹45,000', status: 'VIP' },
                        { name: 'Rahul Verma', email: 'rahul@example.com', orders: 5, spent: '₹12,500', status: 'Regular' },
                        { name: 'Ananya Iyer', email: 'ananya@example.com', orders: 8, spent: '₹28,900', status: 'VIP' },
                        { name: 'Vikram Singh', email: 'vikram@example.com', orders: 2, spent: '₹4,200', status: 'New' },
                      ].map((customer, i) => (
                        <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-8 py-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-brand-beige flex items-center justify-center text-brand-maroon font-bold text-xs">
                                {customer.name.charAt(0)}
                              </div>
                              <span className="font-bold text-slate-700">{customer.name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-4 text-sm text-slate-500">{customer.email}</td>
                          <td className="px-8 py-4 text-sm font-medium text-slate-600">{customer.orders}</td>
                          <td className="px-8 py-4 font-bold text-slate-800">{customer.spent}</td>
                          <td className="px-8 py-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                              customer.status === 'VIP' ? 'bg-amber-100 text-amber-600' : 
                              customer.status === 'Regular' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'
                            }`}>
                              {customer.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-4xl space-y-8">
              <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8">
                <h4 className="text-lg font-bold text-slate-800 mb-6">General Settings</h4>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2">Store Name</label>
                      <input type="text" defaultValue="RoziRoti Ethnic Wear" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-maroon" />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2">Support Email</label>
                      <input type="email" defaultValue="support@roziroti.com" className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-maroon" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2">Currency</label>
                      <select className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-maroon">
                        <option>INR (₹)</option>
                        <option>USD ($)</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-2">Timezone</label>
                      <select className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-maroon">
                        <option>Asia/Kolkata (IST)</option>
                        <option>UTC</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 p-8">
                <h4 className="text-lg font-bold text-slate-800 mb-6">Security & Access</h4>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div>
                      <p className="font-bold text-slate-800">Two-Factor Authentication</p>
                      <p className="text-xs text-slate-400">Add an extra layer of security to your account</p>
                    </div>
                    <div className="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm" />
                    </div>
                  </div>
                  <button className="maroon-gradient text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add/Edit Product Modal */}
          <AnimatePresence>
            {(showAddProduct || editingProduct) && (
              <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }} 
                  onClick={() => { setShowAddProduct(false); setEditingProduct(null); }} 
                  className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
                />
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  exit={{ scale: 0.9, opacity: 0 }} 
                  className="relative bg-white rounded-[32px] p-6 lg:p-8 max-w-2xl w-full shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl lg:text-2xl font-serif text-brand-maroon">
                      {editingProduct ? 'Edit Collection Piece' : 'Add New Collection Piece'}
                    </h3>
                    <button onClick={() => { setShowAddProduct(false); setEditingProduct(null); }} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><X size={20} /></button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">Product Name</label>
                        <input 
                          type="text" 
                          value={newProduct.name}
                          onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                          className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-maroon" 
                          placeholder="e.g. Royal Banarasi Silk Saree" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">Price (₹)</label>
                          <input 
                            type="number" 
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({...newProduct, price: Number(e.target.value)})}
                            className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-maroon" 
                            placeholder="2999" 
                          />
                        </div>
                        <div>
                          <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">Original Price</label>
                          <input 
                            type="number" 
                            value={newProduct.originalPrice}
                            onChange={(e) => setNewProduct({...newProduct, originalPrice: Number(e.target.value)})}
                            className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-maroon" 
                            placeholder="4999" 
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">Category</label>
                        <select 
                          value={newProduct.category}
                          onChange={(e) => setNewProduct({...newProduct, category: e.target.value as any})}
                          className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-maroon"
                        >
                          <option>Sarees</option>
                          <option>Suits</option>
                          <option>Lehengas</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">Image URL</label>
                        <input 
                          type="text" 
                          value={newProduct.image}
                          onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                          className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-maroon" 
                          placeholder="https://..." 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase font-bold tracking-widest text-slate-400 block mb-1">Initial Stock</label>
                        <input 
                          type="number" 
                          value={newProduct.stock}
                          onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                          className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-maroon" 
                          placeholder="10" 
                        />
                      </div>
                      <div className="flex items-center space-x-6 pt-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={newProduct.isBestSeller}
                            onChange={(e) => setNewProduct({...newProduct, isBestSeller: e.target.checked})}
                            className="rounded text-brand-maroon focus:ring-brand-maroon" 
                          />
                          <span className="text-xs font-bold text-slate-600">Bestseller</span>
                        </label>
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input 
                            type="checkbox" 
                            checked={newProduct.isTrending}
                            onChange={(e) => setNewProduct({...newProduct, isTrending: e.target.checked})}
                            className="rounded text-brand-maroon focus:ring-brand-maroon" 
                          />
                          <span className="text-xs font-bold text-slate-600">Trending</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 flex space-x-4">
                    <button onClick={() => { setShowAddProduct(false); setEditingProduct(null); }} className="flex-1 py-4 rounded-xl border border-slate-200 text-slate-400 font-bold uppercase tracking-widest text-xs hover:bg-slate-50 transition-all">Cancel</button>
                    <button 
                      onClick={editingProduct ? handleUpdateProduct : handleAddProduct} 
                      className="flex-1 maroon-gradient text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs shadow-lg hover:shadow-brand-maroon/20 transition-all"
                    >
                      {editingProduct ? 'Update Product' : 'Publish Product'}
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
