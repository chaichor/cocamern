import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Search, X } from 'lucide-react';

const BranchesPage = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    telephone: '',
    schedule: ''
  });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBranches = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      };
      const { data } = await axios.get('http://localhost:4000/api/branches', config);
      setBranches(data);
    } catch (error) {
      console.error('Error fetching branches:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
        await axios.put(`http://localhost:4000/api/branches/${editId}`, formData, config);
      } else {
        await axios.post('http://localhost:4000/api/branches', formData, config);
      }

      resetForm();
      fetchBranches();
    } catch (error) {
      console.error('Error saving branch:', error);
      alert('Error al guardar la sucursal: ' + error.response?.data?.message || error.message);
    }
  };

  const handleEdit = (branch) => {
    setEditId(branch._id);
    setFormData({
      name: branch.name || '',
      address: branch.address || '',
      telephone: branch.telephone || '',
      schedule: branch.schedule || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta sucursal?')) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        };
        await axios.delete(`http://localhost:4000/api/branches/${id}`, config);
        fetchBranches();
      } catch (error) {
        console.error('Error deleting branch:', error);
        alert('Error al eliminar la sucursal');
      }
    }
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      name: '',
      address: '',
      telephone: '',
      schedule: ''
    });
    setShowModal(false);
  };

  // Asegurarse de que branches sea un array antes de aplicar filter
  const filteredBranches = Array.isArray(branches)
    ? branches.filter(
        branch => 
          branch.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          branch.address?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          branch.telephone?.includes(searchTerm)
      )
    : [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Sucursales</h1>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" /> Nueva Sucursal
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-4 border rounded-md px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-purple-500">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar sucursales..."
            className="w-full ml-2 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
          </div>
        ) : filteredBranches.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            No se encontraron sucursales
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dirección</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teléfono</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Horario</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBranches.map((branch) => (
                  <tr key={branch._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{branch.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-500 max-w-xs truncate">{branch.address}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">{branch.telephone}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-500">{branch.schedule}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEdit(branch)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(branch._id)}
                          className="text-red-600 hover:text-red-900"
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

      {/* Modal para agregar/editar sucursal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800">
                {editId ? 'Editar Sucursal' : 'Nueva Sucursal'}
              </h2>
              <button 
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    rows="2"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.address}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div>
                  <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono (8 dígitos)</label>
                  <input
                    type="text"
                    id="telephone"
                    name="telephone"
                    required
                    pattern="[0-9]{8}"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.telephone}
                    onChange={handleInputChange}
                    placeholder="12345678"
                  />
                  <p className="text-xs text-gray-500 mt-1">Formato: 12345678</p>
                </div>
                <div>
                  <label htmlFor="schedule" className="block text-sm font-medium text-gray-700 mb-1">Horario</label>
                  <input
                    type="text"
                    id="schedule"
                    name="schedule"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={formData.schedule}
                    onChange={handleInputChange}
                    placeholder="Lun-Vie: 9:00-18:00, Sáb: 9:00-13:00"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
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

export default BranchesPage;
