import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    status: true
  });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await axios.get('http://localhost:4000/api/categories', config);
      setCategories(data);
    } catch (error) {
      console.error('Error al cargar categorías:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      if (editId) {
        await axios.put(`http://localhost:4000/api/categories/${editId}`, formData, config);
      } else {
        await axios.post('http://localhost:4000/api/categories', formData, config);
      }

      resetForm();
      fetchCategories();
    } catch (error) {
      console.error('Error al guardar categoría:', error);
      alert('Error al guardar la categoría: ' + error.response?.data?.message || error.message);
    }
  };

  const handleEdit = (category) => {
    setEditId(category._id);
    setFormData({
      name: category.name || '',
      description: category.description || '',
      status: category.status || false
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        };
        await axios.delete(`http://localhost:4000/api/categories/${id}`, config);
        fetchCategories();
      } catch (error) {
        console.error('Error al eliminar categoría:', error);
        alert('Error al eliminar la categoría');
      }
    }
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      name: '',
      description: '',
      status: true
    });
    setShowModal(false);
  };

  // Asegurarse de que categories sea un array antes de aplicar filter
  const filteredCategories = Array.isArray(categories)
    ? categories.filter(
        category => 
          category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="h-full w-full flex flex-col">
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 sm:gap-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Gestión de Categorías</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-3 sm:px-4 py-2 rounded-md flex items-center transition-colors text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
        >
          <Plus className="h-4 w-4 mr-2" /> Nueva Categoría
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 w-full overflow-hidden">
        <div className="flex items-center mb-4 border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-teal-500 focus-within:border-teal-500">
          <Search className="h-5 w-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Buscar categorías..."
            className="w-full ml-2 outline-none text-sm sm:text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
        
        {loading ? (
          <div className="text-center py-6 sm:py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent"></div>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">Cargando categorías...</p>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-center py-6 sm:py-8">
            <p className="text-gray-600 text-sm sm:text-base">No se encontraron categorías.</p>
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="hidden sm:table-cell px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descripción</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-3 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCategories.map((category) => (
                  <tr key={category._id}>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900 text-sm sm:text-base">{category.name}</div>
                    </td>
                    <td className="hidden sm:table-cell px-6 py-4">
                      <div className="text-gray-500 text-sm">
                        {category.description && category.description.length > 50 
                          ? `${category.description.substring(0, 50)}...` 
                          : category.description}
                      </div>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        category.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {category.status ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-blue-600 hover:text-blue-900"
                          aria-label="Editar categoría"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="text-red-600 hover:text-red-900"
                          aria-label="Eliminar categoría"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal para agregar/editar categoría */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 w-full max-w-xs sm:max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                {editId ? 'Editar Categoría' : 'Nueva Categoría'}
              </h2>
              <button 
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Cerrar"
              >
                <X className="h-5 sm:h-6 w-5 sm:w-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    maxLength={100}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
                  <textarea
                    id="description"
                    name="description"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="status"
                    name="status"
                    className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                    checked={formData.status}
                    onChange={handleCheckboxChange}
                  />
                  <label htmlFor="status" className="ml-2 block text-sm text-gray-700">Activo</label>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-black bg-white hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700"
                >
                  {editId ? 'Actualizar' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
