// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import KitchenDetails from './pages/KitchenDetails';
import RequestPage from './pages/RequestPage';
import About from './pages/About';
import Contact from './pages/Contact';
import GuaranteeDelivery from './pages/GuaranteeDelivery';
import AdminLogin from './pages/admin/AdminLogin';
import AdminRegister from './pages/admin/AdminRegister';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminKitchens from './pages/admin/AdminKitchens';
import AdminRequests from './pages/admin/AdminRequests';
import AdminCategories from './pages/admin/AdminCategories';
import AdminMaterials from './pages/admin/AdminMaterials';
import AdminFacades from './pages/admin/AdminFacades';

const RequireAdmin = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/kitchens" element={<Catalog />} />
          <Route path="/kitchens/:id" element={<KitchenDetails />} />
          <Route path="/request" element={<RequestPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/guarantee" element={<GuaranteeDelivery />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="kitchens" element={<AdminKitchens />} />
          <Route path="requests" element={<AdminRequests />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="materials" element={<AdminMaterials />} />
          <Route path="facades" element={<AdminFacades />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
