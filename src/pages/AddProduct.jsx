import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

const URL = 'https://ecommercebackend-rt0y.onrender.com/api/v1/products/';

const AddProduct = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) navigate('/login');
  }, []);

  // const [productDetails, setProductDetails] = useState({
  //   name: '',
  //   quote: '',
  //   gender: '',
  //   category: '',
  //   coverImage: '',
  //   thisImage: '',
  //   images: [],
  //   stock: '',
  //   isFeatured: '',
  //   price: '',
  //   rating: '',
  //   reviews: '',
  //   thisPoint: '',
  //   keyPoints: [],
  // });

  const [name, setName] = useState('');
  const [quote, setQuote] = useState('');
  const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [thisImage, setThisImage] = useState('');
  const [images, setImages] = useState([]);
  const [stock, setStock] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [price, setPrice] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState(0);
  const [thisPoint, setThisPoint] = useState('');
  const [keyPoints, setKeyPoints] = useState([]);

  const handleAddMoreImages = (str) => {
    const temp = [...images];
    temp.push(str);
    setImages(temp);
    setThisImage('');
  };

  const handleAddKeyPoints = (str) => {
    const temp = [...keyPoints];
    temp.push(str);
    setKeyPoints(temp);
    setThisPoint('');
  };

  const clearInputs = () => {
    setName('');
    setQuote('');
    setGender('');
    setCategory('');
    setCoverImage('');
    setThisImage('');
    setImages([]);
    setStock('');
    setIsFeatured('');
    setPrice(0);
    setRating(0);
    setReviews(0);
    setThisPoint('');
    setKeyPoints([]);
  };

  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const newProductMutation = useMutation({
    mutationFn: async (newProduct) => {
      return await axiosInstance.post(URL, newProduct);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name: name,
      quote: quote,
      gender: gender,
      category: category,
      imageCover: coverImage,
      images: images,
      inStock: stock,
      isFeatured: isFeatured,
      price: price,
      rating: rating,
      reviews: reviews,
      keyPoints: keyPoints,
    };

    newProductMutation.mutate(productData, {
      onSuccess: () => {
        toast.success('Product added successfully!');
        clearInputs();
      },
      onError: (err) => {
        console.log(err);
        toast.error('Something went wrong. Could not add product!');
      },
    });
  };

  return (
    <>
      <div className="w-full h-fit flex-grow p-4 bg-gray-100">
        <div className="flex w-full rounded-2xl custom-shadow-2">
          <div className="w-1/2 p-8 bg-white rounded-l-2xl">
            <h1 className="text-center text-3xl font-semibold mb-8">
              Add Product Details
            </h1>
            <div className="text-left">
              {/* Name of Product */}
              <div className="w-full my-4">
                <label
                  className="mr-2 mb-1 text-md font-semibold"
                  htmlFor="name"
                >
                  Name:
                </label>
                <input
                  className="bg-white rounded-md w-full pl-1 custom-shadow"
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Quote for Product */}
              <div className="w-full my-4">
                <label
                  className="mr-2 mb-1 text-md font-semibold"
                  htmlFor="quote"
                >
                  Quote:
                </label>
                <input
                  className="bg-white rounded-md w-full pl-1 custom-shadow"
                  type="text"
                  name="quote"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                />
              </div>

              {/* Select Gender for Product */}
              <div className="w-full my-4">
                <label
                  className="mr-2 mb-1 text-md font-semibold"
                  htmlFor="gender"
                >
                  Select Gender:
                </label>
                <select
                  name="gender"
                  className="w-full bg-white rounded-md pl-1 custom-shadow"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option
                    className="appearance-none p-2 rounded-none"
                    value=""
                    disabled
                  >
                    Select an option
                  </option>
                  <option
                    className="appearance-none p-2 rounded-none"
                    value="male"
                  >
                    male
                  </option>
                  <option
                    className="appearance-none p-2 rounded-none"
                    value="female"
                  >
                    female
                  </option>
                  <option
                    className="appearance-none p-2 rounded-none"
                    value="unisex"
                  >
                    unisex
                  </option>
                </select>
              </div>

              {/* Select Category for Product */}
              <div className="w-full my-4">
                <label
                  className="mr-2 mb-1 text-md font-semibold"
                  htmlFor="category"
                >
                  Select Category:
                </label>
                <select
                  name="category"
                  className="w-full bg-white rounded-md pl-1 custom-shadow"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option
                    className="appearance-none p-2 rounded-none"
                    value=""
                    disabled
                  >
                    Select an option
                  </option>
                  <option
                    className="appearance-none p-2 rounded-none"
                    value="bracelet"
                  >
                    bracelet
                  </option>
                  <option
                    className="appearance-none p-2 rounded-none"
                    value="ring"
                  >
                    ring
                  </option>
                  <option
                    className="appearance-none p-2 rounded-none"
                    value="necklace"
                  >
                    necklace
                  </option>
                  <option
                    className="appearance-none p-2 rounded-none"
                    value="earrings"
                  >
                    earrings
                  </option>
                  <option
                    className="appearance-none p-2 rounded-none"
                    value="skin-care"
                  >
                    skin-care
                  </option>
                </select>
              </div>

              {/* Cover Image for Product */}
              <div className="w-full my-4">
                <label
                  className="mr-2 mb-1 text-md font-semibold"
                  htmlFor="imageCover"
                >
                  Cover Image address:
                </label>
                <input
                  className="bg-white rounded-md w-full pl-1 custom-shadow"
                  type="text"
                  name="imageCover"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                />
              </div>

              {/* Add more Images for Product */}
              <div className="w-full my-4">
                <label
                  className="mr-2 mb-1 text-md font-semibold"
                  htmlFor="images"
                >
                  Add more images:
                </label>
                <input
                  className="bg-white rounded-md w-full pl-1 custom-shadow"
                  type="text"
                  name="images"
                  value={thisImage}
                  onChange={(e) => setThisImage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddMoreImages(thisImage);
                  }}
                />
                <div className="flex w-full justify-end">
                  <button
                    className="bg-green-600 text-white rounded-md mt-2 p-2 px-4"
                    onClick={() => handleAddMoreImages(thisImage)}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Stock for Product */}
              <div className="w-full my-4">
                <label
                  className="mr-2 mb-1 text-md font-semibold"
                  htmlFor="stock"
                >
                  Stock:
                </label>
                <input
                  className="bg-white rounded-md w-full pl-1 custom-shadow"
                  type="number"
                  name="stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              {/* is Product Featured? */}
              <div className="w-full my-4">
                <label
                  className="mr-2 mb-1 text-md font-semibold"
                  htmlFor="quote"
                >
                  should Feature?:
                </label>
                <select
                  name="gender"
                  className="w-full bg-white rounded-md pl-1 custom-shadow"
                  value={isFeatured}
                  onChange={(e) => setIsFeatured(e.target.value)}
                >
                  <option
                    className="appearance-none p-2 rounded-none"
                    value=""
                    disabled
                  >
                    Select an option
                  </option>
                  <option
                    className="appearance-none p-2 rounded-none"
                    value={true}
                  >
                    Yes
                  </option>
                  <option
                    className="appearance-none p-2 rounded-none"
                    value={false}
                  >
                    No
                  </option>
                </select>
              </div>

              {/* Price for Product */}
              <div className="w-full my-4">
                <label
                  className="mr-2 mb-1 text-md font-semibold"
                  htmlFor="price"
                >
                  Price:
                </label>
                <input
                  className="bg-white rounded-md w-full pl-1 custom-shadow"
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              {/* Ratings of Product */}
              <div className="w-full my-4">
                <label
                  className="mr-2 mb-1 text-md font-semibold"
                  htmlFor="ratings"
                >
                  Rating:
                </label>
                <input
                  className="bg-white rounded-md w-full pl-1 custom-shadow"
                  type="number"
                  name="ratings"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>

              {/* Reviews of Product */}
              <div className="w-full my-4">
                <label
                  className="mr-2 mb-1 text-md font-semibold"
                  htmlFor="reviews"
                >
                  Number of Reviews:
                </label>
                <input
                  className="bg-white rounded-md w-full pl-1 custom-shadow"
                  type="number"
                  name="reviews"
                  value={reviews}
                  onChange={(e) => setReviews(e.target.value)}
                />
              </div>

              {/* Key Points
           of Product */}
              <div className="w-full my-4">
                <label
                  className="mr-2 mb-1 text-md font-semibold"
                  htmlFor="reviews"
                >
                  Key Points:
                </label>
                <input
                  className="bg-white rounded-md w-full pl-1 custom-shadow"
                  type="string"
                  name="reviews"
                  value={thisPoint}
                  onChange={(e) => setThisPoint(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddKeyPoints(thisPoint);
                  }}
                />
                <div className="flex w-full justify-end">
                  <button
                    className="bg-green-600 text-white rounded-md mt-2 p-2 px-4"
                    onClick={() => handleAddKeyPoints(thisPoint)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------------------------------------------------- */}
          <hr className="flex h-full border-l border-r border-gray-300 border-solid my-8" />
          {/* ---------------------------------------------------------- */}
          {/* Product Viewer */}
          <div className="w-1/2 p-8 bg-white rounded-r-2xl">
            <h1 className="text-center text-3xl font-semibold mb-8">
              View Product Details
            </h1>
            <div className="text-left">
              {/* Prodcut Name */}
              <div className="w-full my-4">
                <p className="inline mr-2 text-md font-semibold" htmlFor="name">
                  Product Name:
                </p>
                <p className="inline capitalize">{name}</p>
              </div>

              {/* Product Quote */}
              <div className="w-full my-4">
                <p
                  className="inline mr-2 text-md font-semibold"
                  htmlFor="quote"
                >
                  Product Quote:
                </p>
                <p className=" inline">{quote}</p>
              </div>

              {/* Selected Gender */}
              <div className="w-full my-4">
                <p
                  className="inline mr-2 text-md font-semibold"
                  htmlFor="gender"
                >
                  Selected Gender:
                </p>

                <p className="inline capitalize">{gender}</p>
              </div>

              {/* Selected Category */}
              <div className="w-full my-4">
                <label
                  className="inline mr-2 text-md font-semibold"
                  htmlFor="category"
                >
                  Selected Category:
                </label>
                <p className="inline capitalize">{category}</p>
              </div>

              {/* Cover Image for Product */}
              <div className="w-full my-4">
                <p
                  className="mr-2 mb-1 text-md font-semibold"
                  htmlFor="imageCover"
                >
                  Cover Image:
                </p>

                {/* Cover Image viewer div */}
                {coverImage.length > 0 && (
                  <div className="mt-1 flex w-fit rounded-md custom-shadow">
                    <img
                      className="h-[240px] w-[240px] rounded-md"
                      src={coverImage}
                      alt={name}
                    />
                  </div>
                )}
              </div>

              {/* Other Images for Product */}
              <div className="w-full my-4">
                <p className="mr-2 mb-1 text-md font-semibold" htmlFor="images">
                  Other Images:
                </p>

                {/* Other Images viewer div */}
                <div className="flex gap-2 flex-wrap">
                  {images.length > 0 &&
                    images.map((image, index) => {
                      return (
                        <div
                          key={index}
                          className="mt-1 flex w-fit rounded-md custom-shadow"
                        >
                          <img
                            className="h-[240px] w-[240px] rounded-md"
                            src={image}
                            alt={name}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Stock of Product */}
              <div className="w-full my-4">
                <p
                  className="inline mr-2 text-md font-semibold"
                  htmlFor="stock"
                >
                  Added Stock:
                </p>
                <p className="inline">{stock}</p>
              </div>

              {/* is Product Featured? */}
              <div className="w-full my-4">
                <p
                  className="inline mr-2 text-md font-semibold"
                  htmlFor="quote"
                >
                  Should Feature Product?
                </p>
                <p className="inline capitalize">{String(isFeatured)}</p>
              </div>

              {/* Product Price */}
              <div className="w-full my-4">
                <p
                  className="inline mr-2 text-md font-semibold"
                  htmlFor="price"
                >
                  Product Price:
                </p>
                <p className="inline">{`Rs. ${price}`}</p>
              </div>

              {/* Product Average Rating */}
              <div className="w-full my-4">
                <p
                  className="inline mr-2 text-md font-semibold"
                  htmlFor="ratings"
                >
                  Average Rating:
                </p>
                <p className="inline">{rating}</p>
              </div>

              {/* Product Reviews */}
              <div className="w-full my-4">
                <p
                  className="inline mr-2 text-md font-semibold"
                  htmlFor="reviews"
                >
                  Number of Reviews:
                </p>
                <p className="inline">{reviews}</p>
              </div>

              {/* Product Key Points */}
              <div className="w-full my-4">
                <p
                  className="inline mr-2 text-md font-semibold"
                  htmlFor="reviews"
                >
                  Key Points:
                </p>

                {/* Key Points viewer div */}
                <div className="flex">
                  <ol className="list-decimal list-inside w-full">
                    {keyPoints.length > 0 &&
                      keyPoints.map((point, index) => {
                        return (
                          <li key={index} className="w-full py-2">
                            {point}
                          </li>
                        );
                      })}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Part */}
      <div className="sticky bottom-0 z-10 bg-gray-300 w-full p-4">
        <div className="w-1/2 mx-auto">
          <button
            className="bg-gray-700 hover:bg-gray-900 text-white rounded-md w-full p-2 px-4"
            onClick={handleSubmit}
            disabled={newProductMutation.isLoading}
          >
            Add Product
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
