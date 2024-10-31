import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Transaction from "./pages/Transaction";
import Customer from "./pages/Customer";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin" element={<Home />} />
          <Route path="/admin/product" element={<Product />} />
          <Route path="/admin/transaction" element={<Transaction />} />
          <Route path="/admin/customer" element={<Customer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
