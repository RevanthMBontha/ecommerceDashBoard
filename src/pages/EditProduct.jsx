import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const baseURL = 'https://ecommercebackend-rt0y.onrender.com/api/v1/products';

const EditProduct = () => {
  const { id } = useParams();
  const thisURL = `${baseURL}/${id}`;

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [editedData, setEditedData] = useState({});

  const { isPending, isError, data } = useQuery({
    queryKey: ['editSingleProduct'],
    queryFn: async () => {
      const response = await axios.get(thisURL, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.data.product;
    },
  });

  const editProductMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axios.patch(thisURL, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('editSingleProduct');
    },
  });

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Error occurred</div>;

  return (
    <div className="bg-gray-200 p-4 w-full h-full">
      <div className="p-4 bg-white rounded-md">
        <div>
          <h1 className="text-3xl font-semibold">Edit Product</h1>
          <hr className="border-b border-solid border-gray-200  my-4" />
        </div>
        <div className="px-4 flex flex-col gap-y-8">
          {/* Name */}
          <div>
            <label className="block" htmlFor="name">
              Name:
            </label>
            <input
              className="bg-gray-200 h-8 pl-1 rounded-md w-full lg:w-1/2"
              type="text"
              name="name"
              id="id"
              value={
                editedData?.name === undefined ? data.name : editedData.name
              }
              onChange={(e) => handleEdit(e)}
            />
          </div>

          {/* Quote */}
          <div>
            <label className="block" htmlFor="quote">
              Quote:
            </label>
            <input
              className="bg-gray-200 h-8 pl-1 rounded-md w-full lg:w-1/2"
              type="text"
              name="quote"
              id="quote"
              value={
                editedData?.quote === undefined ? data.quote : editedData.quote
              }
              onChange={(e) => handleEdit(e)}
            />
          </div>

          {/* inStock */}
          <div>
            <label className="block" htmlFor="inStock">
              Stock Amount:
            </label>
            <input
              className="bg-gray-200 h-8 pl-1 rounded-md w-full lg:w-1/2"
              type="text"
              name="inStock"
              id="inStock"
              value={
                editedData?.inStock === undefined
                  ? data.inStock
                  : editedData.inStock
              }
              onChange={(e) => handleEdit(e)}
            />
          </div>

          {/* Price */}
          <div>
            <label className="block" htmlFor="price">
              Price in USD:
            </label>
            <input
              className="bg-gray-200 h-8 pl-1 rounded-md w-full lg:w-1/2"
              type="text"
              name="price"
              id="price"
              value={
                editedData?.price === undefined ? data.price : editedData.price
              }
              onChange={(e) => handleEdit(e)}
            />
          </div>

          {/* Is Featured */}
          <div>
            <label className="block" htmlFor="price">
              Is Featured:
            </label>
            <select
              className="bg-gray-200 w-full lg:w-1/2 h-8 rounded-md"
              name="isFeatured"
              id="isFeatured"
              value={
                editedData?.isFeatured === undefined
                  ? data.isFeatured
                  : editedData.isFeatured
              }
              onChange={(e) => handleEdit(e)}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div>
          <hr className="border-b border-solid border-gray-200  my-4" />
          <div className="w-full flex justify-between">
            <button
              className="disabled:bg-gray-400 disabled:hover:bg-gray-400 py-1 px-4 bg-gray-600 text-lg hover:bg-gray-900 text-white rounded-md cursor-pointer"
              onClick={() => navigate('/all')}
            >
              Back to all products
            </button>
            <button
              disabled={Object.keys(editedData).length === 0}
              className="disabled:bg-gray-400 disabled:hover:bg-gray-400 py-1 px-4 bg-gray-600 text-lg hover:bg-gray-900 text-white rounded-md cursor-pointer"
              onClick={() => {
                editProductMutation.mutate(editedData);
                setEditedData({});
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
