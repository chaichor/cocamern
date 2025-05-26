import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag, Package, Building2, CarFront } from 'lucide-react';
import axios from 'axios';

const DashboardPage = () => {
  const [stats, setStats] = useState({
    categories: 0,
    products: 0,
    branches: 0,
    transport:0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        };

        const [categoriesRes, productsRes, branchesRes, transportRes] = await Promise.all([
          axios.get('http://localhost:4000/api/categories', config),
          axios.get('http://localhost:4000/api/products', config),
          axios.get('http://localhost:4000/api/branches', config),
          axios.get('http://localhost:4000/api/transport', config)

        ]);

        setStats({
          categories: categoriesRes.data.length,
          products: productsRes.data.length,
          branches: branchesRes.data.length,
          transport: transportRes.data.length

        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">¡Bienvenido!</h1>
        <p className="text-gray-600 mt-2">Panel de administración de CocaMERN</p>
      </div>

      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-teal-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="bg-teal-100 p-3 rounded-full">
                <Tag className="h-6 w-6 text-teal-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-700">Categorías</h2>
                <p className="text-3xl font-bold text-gray-800">{stats.categories}</p>
                <Link to="/categories" className="text-teal-600 hover:underline text-sm">
                  Ver todas →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Package className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-700">Productos</h2>
                <p className="text-3xl font-bold text-gray-800">{stats.products}</p>
                <Link to="/products" className="text-green-600 hover:underline text-sm">
                  Ver todos →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Building2 className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-700">Sucursales</h2>
                <p className="text-3xl font-bold text-gray-800">{stats.branches}</p>
                <Link to="/branches" className="text-purple-600 hover:underline text-sm">
                  Ver todas →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <CarFront className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h2 className="text-lg font-semibold text-gray-700">Transporte</h2>
                <p className="text-3xl font-bold text-gray-800">{stats.transport}</p>
                <Link to="/transport" className="text-purple-600 hover:underline text-sm">
                  Ver todos →
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
