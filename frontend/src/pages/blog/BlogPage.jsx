import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit2, Trash2, Search, X, Image as ImageIcon } from 'lucide-react';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null
  });
  const [searchTerm, setSearchTerm] = useState('');

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/blog');
      setPosts(data);
    } catch (error) {
      console.error('Error al cargar posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('content', formData.content);
      if (formData.image) {
        form.append('image', formData.image);
      }

      if (editId) {
        await axios.put(`http://localhost:4000/api/blog/${editId}`, form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await axios.post('http://localhost:4000/api/blog', form, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      resetForm();
      fetchPosts();
    } catch (error) {
      console.error('Error al guardar post:', error);
      alert('Error al guardar post');
    }
  };

  const handleEdit = (post) => {
    setEditId(post._id);
    setFormData({
      title: post.title,
      content: post.content,
      image: null // No puedes precargar imagen
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Eliminar este post del blog?')) {
      try {
        await axios.delete(`http://localhost:4000/api/blog/${id}`);
        fetchPosts();
      } catch (error) {
        console.error('Error al eliminar post:', error);
        alert('Error al eliminar post');
      }
    }
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      title: '',
      content: '',
      image: null
    });
    setShowModal(false);
  };

  const filteredPosts = posts.filter(p =>
    p.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.content?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full w-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Blog</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="h-4 w-4 mr-2" /> Nuevo post
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4 border px-3 py-2 rounded-md focus-within:ring-2 focus-within:ring-teal-500">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="ml-2 w-full outline-none"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="text-gray-400 hover:text-gray-600">
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="h-8 w-8 border-4 border-teal-500 border-r-transparent animate-spin rounded-full mx-auto" />
            <p className="text-gray-600 mt-2">Cargando posts...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500">No se encontraron posts.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Título</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Contenido</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Imagen</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPosts.map(post => (
                  <tr key={post._id}>
                    <td className="px-4 py-2 font-medium">{post.title}</td>
                    <td className="px-4 py-2 text-gray-700">{post.content.substring(0, 50)}...</td>
                    <td className="px-4 py-2">
                      {post.image && (
                        <img src={post.image} alt="preview" className="h-10 w-16 object-cover rounded" />
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <button onClick={() => handleEdit(post)} className="text-blue-600 hover:text-blue-900">
                          <Edit2 className="h-5 w-5" />
                        </button>
                        <button onClick={() => handleDelete(post._id)} className="text-red-600 hover:text-red-900">
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{editId ? 'Editar Post' : 'Nuevo Post'}</h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700">Contenido</label>
                <textarea
                  id="content"
                  name="content"
                  rows="3"
                  required
                  value={formData.content}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full"
                />
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button type="button" onClick={resetForm} className="px-4 py-2 border rounded-md text-gray-700">
                  Cancelar
                </button>
                <button type="submit" className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">
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

export default BlogPage;

