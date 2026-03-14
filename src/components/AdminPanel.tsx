import React from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, 
  TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight,
  Plus, Search, Edit, Trash, MoreVertical
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
  const [activeTab, setActiveTab] = React.useState<'dashboard' | 'products' | 'orders'>('dashboard');

  return (
    <div className="fixed inset-0 z-[200] bg-slate-50 flex overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-brand-dark text-white flex flex-col">
        <div className="p-8 border-b border-white/10">
          <h2 className="text-2xl font-serif font-bold text-brand-gold">Admin Console</h2>
          <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">RoziRoti by Ratna</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'products', icon: Package, label: 'Products' },
            { id: 'orders', icon: ShoppingCart, label: 'Orders' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-brand-gold text-brand-dark font-bold shadow-lg' : 'hover:bg-white/5 text-white/60'}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={onClose}
            className="w-full py-3 rounded-xl border border-white/20 text-white/60 hover:bg-white/5 transition-all text-sm font-bold uppercase tracking-widest"
          >
            Exit Admin
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-8 py-6 flex justify-between items-center sticky top-0 z-10">
          <h1 className="text-2xl font-bold text-slate-800 capitalize">{activeTab}</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-brand-maroon transition-all w-64" />
            </div>
            <div className="w-10 h-10 rounded-full bg-brand-maroon flex items-center justify-center text-white font-bold">A</div>
          </div>
        </header>

        <main className="p-8">
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
                    className="bg-white p-6 rounded-[24px] shadow-sm border border-slate-100"
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
                  <h4 className="text-lg font-bold text-slate-800 mb-8">Revenue Performance</h4>
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
                      {orders.map((order, i) => (
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
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                              order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' : 
                              order.status === 'Processing' ? 'bg-blue-100 text-blue-600' : 'bg-amber-100 text-amber-600'
                            }`}>
                              {order.status}
                            </span>
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
            <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-8 border-b border-slate-100 flex justify-between items-center">
                <h4 className="text-lg font-bold text-slate-800">Product Inventory</h4>
                <button className="maroon-gradient text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center space-x-2">
                  <Plus size={18} />
                  <span>Add Product</span>
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
                    {products.map((product, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-4">
                          <div className="flex items-center space-x-4">
                            <img src={product.image} alt="" className="w-12 h-16 object-cover rounded-lg" />
                            <span className="font-bold text-slate-700">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-4 text-slate-500 font-medium">{product.category}</td>
                        <td className="px-8 py-4 font-bold text-slate-800">₹{product.price}</td>
                        <td className="px-8 py-4">
                          <span className={`font-bold ${product.stock < 5 ? 'text-rose-500' : 'text-emerald-500'}`}>
                            {product.stock} units
                          </span>
                        </td>
                        <td className="px-8 py-4">
                          <div className="flex space-x-2">
                            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors"><Edit size={16} /></button>
                            <button className="p-2 text-slate-400 hover:text-red-600 transition-colors"><Trash size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
