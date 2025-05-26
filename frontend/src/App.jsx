import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/dashboard/DashboardPage';
import ProductsPage from './pages/products/ProductsPage';
import BranchesPage from './pages/branches/BranchesPage';
import CategoriesPage from './pages/categories/CategoriesPage';
import TransportPage from './pages/transport/TransportPage';
import BlogPage from './pages/blog/BlogPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="branches" element={<BranchesPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="transport" element={<TransportPage />} />
          <Route path="blog" element={<BlogPage />} />


        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
