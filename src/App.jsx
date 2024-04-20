import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import PageLayout from './layouts/PageLayout';
import AddProduct from './pages/AddProduct';
import AllProducts from './pages/AllProducts';
import Messages from './pages/Messages';
import Auth from './pages/Auth';
import EditProduct from './pages/EditProduct';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<PageLayout />}>
        <Route index element={<AddProduct />} />
        <Route path="/all" element={<AllProducts />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/product/edit/:id" element={<EditProduct />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
