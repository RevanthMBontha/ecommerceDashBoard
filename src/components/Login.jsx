import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';

const URL =
  'https://ecommercebackend-rt0y.onrender.com/api/v1/users/login/admin';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (userCredentials) => {
      // Set Email and Password to empty again
      setEmail('');
      setPassword('');

      // Await response from the server
      const response = await axios.post(URL, userCredentials);
      return response;
    },
    onSuccess: (response) => {
      localStorage.setItem('token', response.data.token);
      toast.success('Successfully logged User in. Redirecting to Home!');
      setTimeout(() => {
        navigate('/');
      }, 500);
    },
  });

  const handleLogin = (data) => {
    loginMutation.mutate({ email: data.email, password: data.password });
  };

  return (
    <div className="absolute bg-white w-full lg:w-1/3 rounded-lg p-4">
      {/* Heading */}
      <div className="my-4">
        <img
          className="h-[48px] w-[48px] mx-auto"
          src="/images/favicon.svg"
          alt="logo"
        />
        <h1 className="text-xl text-center">
          Login to your UrbanForge Partner Account
        </h1>
      </div>

      {/* Divider */}
      <hr className="border-t border-solid border-gray-300 w-1/2 mx-auto mt-2 mb-8" />

      {/* Details */}
      <div className="w-2/3 mx-auto my-4">
        <div className="flex flex-col gap-y-2 my-3">
          <label className="w-full" htmlFor="email">
            Email:
          </label>
          <input
            className="w-full h-8 pl-1 rounded-md custom-shadow"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-y-2 my-3">
          <label className="w-full" htmlFor="email">
            Password:
          </label>
          <input
            className="w-full h-8 pl-1 rounded-md custom-shadow"
            type="password"
            name="email"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-solid border-gray-300 w-1/2 mx-auto mt-8 mb-2" />

      {/* Action Button */}
      <div className="flex items-center justify-center my-4">
        <button
          className="rounded-md bg-gray-700 hover:bg-gray-900 text-white py-2 px-4 hover:custom-shadow-3"
          onClick={() => handleLogin({ email, password })}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
