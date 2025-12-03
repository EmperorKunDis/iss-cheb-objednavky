import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { OrderPage } from './pages/OrderPage';
import { ProductsPage } from './pages/ProductsPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produkty/:fieldId" element={<ProductsPage />} />
          <Route path="/objednavka/:fieldId" element={<OrderPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
