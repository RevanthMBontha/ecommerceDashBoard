import PropTypes from 'prop-types';
import { MdEdit, MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const URL = 'https://ecommercebackend-rt0y.onrender.com/api/v1/products/<id>';

const Card = ({ id, name, quote, coverImage, featured }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const axiosInstance = axios.create({
    baseURL: URL.replace('<id>', id),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: () => {
      return axiosInstance.delete();
    },
  });

  const handleClick = (e, id) => {
    e.preventDefault();
    console.log(id);
    toast.info('Card clicked');
  };

  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/product/edit/${id}`);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    deleteProductMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Product deleted!');
        queryClient.invalidateQueries('products');
      },
      onError: (error) => {
        toast.error('Something went wrong. Could not delete Product!');
        console.log(error);
      },
    });
  };
  return (
    <div
      id={id}
      className="relative rounded-md flex flex-col w-fit bg-white custom-shadow-3 hover:scale-105 transition-all"
      onClick={(e) => handleClick(e, id)}
    >
      <div
        className={`absolute ${
          featured ? 'visible' : 'hidden'
        } top-0 right-0 w-fit bg-orange-400 text-white rounded-tr-md rounded-bl-md px-4 py-1`}
      >
        featured
      </div>
      {/* Card Image */}
      <img
        className="h-[280px] w-[280px] rounded-t-md"
        src={coverImage}
        alt={name}
      />
      {/* Card Details */}
      <div className="flex flex-col gap-y-2 p-1 flex-grow">
        <h1 className="text-xl font-semibold w-[272px] capitalize">{name}</h1>
        <p className="text-md font-thin text-gray-400 w-[272px] capitalize">
          {quote}
        </p>
      </div>
      {/* Action Buttons */}
      <div className="flex-grow-0">
        <hr className="border-t border-solid border-gray-200 mx-2" />
        <div className="flex gap-2 justify-end items-center p-2">
          <button
            className="bg-yellow-400 text-white rounded-md p-2 px-4"
            onClick={(e) => handleEdit(e, id)}
          >
            <MdEdit size={20} />
          </button>
          <button
            className="bg-red-400 text-white rounded-md p-2 px-4"
            onClick={(e) => handleDelete(e, id)}
          >
            <MdDelete size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  coverImage: PropTypes.string.isRequired,
  featured: PropTypes.bool.isRequired,
};

export default Card;
