import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Card from './../components/Card';

const AllProducts = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) navigate('/login');
  }, []);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await axios.get(
        'https://ecommercebackend-rt0y.onrender.com/api/v1/products'
      );
      return response.data.data.products;
    },
  });

  if (isPending) {
    return (
      <div className="relative flex items-center justify-center w-full h-full">
        <div className="absolute">
          <h1 className="text-2xl font-semibold">Loading...</h1>
        </div>
      </div>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="flex bg-gray-100">
      <div className="flex flex-wrap gap-4 p-4">
        {data.map((product) => (
          <Card
            key={product._id}
            id={product._id}
            name={product.name}
            quote={product.quote}
            coverImage={product.imageCover}
            featured={product.isFeatured}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
