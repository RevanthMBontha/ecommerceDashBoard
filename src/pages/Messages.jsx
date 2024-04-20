import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ImBin2 } from 'react-icons/im';
import axios from 'axios';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

const messagesURL =
  'https://ecommercebackend-rt0y.onrender.com/api/v1/messages';

// Message Card showing fewer details
const MessageCard = ({ id, name, dateString, message, onClick, isRead }) => {
  const dateTime = new Date(dateString);
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1; // Months are zero-based (0 = January)
  const day = dateTime.getDate();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  const queryClient = useQueryClient();

  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.patch(`${messagesURL}/${id}`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('specificMessage');
    },
  });

  return (
    <div
      className="p-3 relative bg-white rounded-md hover:scale-105 transition-all"
      onClick={() => {
        onClick(id);
        updateMutation.mutate({ isRead: true });
      }}
    >
      <div className="flex justify-between">
        <h1 className="text-xl my-auto font-semibold">{name}</h1>
        <div className="flex flex-col gap-y-2">
          <p className="text-sm text-end mb-0 mt-auto font-thin">
            {`${day}/${month}/${year}, ${hours}:${minutes}`}
          </p>
        </div>
      </div>
      <hr className="border-b-1 border-solid border-gray-400 w-4/5 mx-auto my-2" />
      <p>{message.length > 80 ? `${message.substring(0, 80)}...` : message}</p>
      <div
        className={`${
          isRead ? 'hidden' : 'visible'
        } absolute -top-1 -right-1 rounded-full h-[16px] w-[16px] bg-blue-400`}
      ></div>
    </div>
  );
};

// PropTypes for the Message Card
MessageCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dateString: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isRead: PropTypes.bool.isRequired,
};

// The larger message component with all the details
const MessageComponent = ({ messageID, setMessageID }) => {
  let thisMessageURL = '';
  if (messageID.length > 0) thisMessageURL = `${messagesURL}/${messageID}`;

  const queryClient = useQueryClient();

  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const { isPending, isError, data } = useQuery({
    queryKey: ['specificMessage'],
    queryFn: async () => {
      if (thisMessageURL.length > 0) {
        const response = await axiosInstance.get(thisMessageURL);
        return response.data.data.message;
      }
      return {
        name: 'Example Name',
        email: 'examplemail@example.com',
        phoneNumber: '99999 99999',
        messageBody:
          'Please click on one of the messages to view the contents of the message',
        isRead: false,
        createdAt: '2024-04-03T21:53:47.637Z',
        _id: '123456789',
      };
    },
  });

  const deleteMessageMutation = useMutation({
    mutationFn: async () => {
      setMessageID('');
      const response = await axiosInstance.delete(`${messagesURL}/${data._id}`);
      return response;
    },
    onSuccess: () => {
      toast.success('Message has been deleted!');
      queryClient.invalidateQueries('componentMessages');
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error. Please refresh the page...</div>;
  }

  const dateTime = new Date(data.createdAt);
  const year = dateTime.getFullYear();
  const month = dateTime.getMonth() + 1; // Months are zero-based (0 = January)
  const day = dateTime.getDate();
  const hours = dateTime.getHours();
  const minutes = dateTime.getMinutes();

  return (
    <div className="bg-white rounded-md p-8">
      <div className="flex justify-between">
        <h1 className="text-xl my-auto font-semibold capitalize">
          {data.name}
        </h1>
        <p className="text-sm my-auto text-end font-thin">
          {`${day}/${month}/${year}, ${hours}:${minutes}`}
        </p>
      </div>
      <hr className="border-b-1 border-solid border-gray-400 w-4/5 mx-auto my-8" />
      <div className="flex justify-between">
        <p>{data.email}</p>
        <p>{data.phoneNumber}</p>
      </div>
      <hr className="border-b-1 border-solid border-gray-400 w-4/5 mx-auto my-8" />
      <div>
        <p>{data.messageBody}</p>
      </div>
      <hr className="border-b-1 border-solid border-gray-400 w-4/5 mx-auto my-8" />
      <div className="text-end">
        <button
          disabled={data._id === '123456789'}
          className="bg-orange-400 hover:bg-orange-400 p-4 text-white rounded-md"
          onClick={() => deleteMessageMutation.mutate()}
        >
          <ImBin2 size={24} />
        </button>
      </div>
    </div>
  );
};

// PropTypes for the large MessageComponent
MessageComponent.propTypes = {
  messageID: PropTypes.string.isRequired,
  setMessageID: PropTypes.func.isRequired,
};

// Page component to hold the messages and message cards
const Messages = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  const [messageID, setMessageID] = useState('');

  const axiosInstance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const { isPending, isError, data, error } = useQuery({
    queryKey: ['componentMessages'],
    queryFn: async () => {
      const response = await axiosInstance.get(messagesURL);
      return response.data.data.messages;
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="flex flex-1 w-full overflow-auto cursor-pointer">
      {/* Div to display the messages list */}
      <div className="w-1/3 flex flex-col bg-gray-200 border-r-4 border-gray-400 border-solid">
        <div className="bg-white p-2">
          <h1 className="text-2xl mb-4 font-bold">Messages List</h1>
          <hr className="border-b border-gray-400 border-solid w-2/3 mx-auto" />
        </div>
        <div className="flex flex-col bg-gray-200 px-6 py-4 gap-y-3 overflow-y-auto">
          {data.map((message) => (
            <MessageCard
              key={message._id}
              id={message._id}
              name={message.name}
              dateString={message.createdAt}
              message={message.messageBody}
              onClick={setMessageID}
              isRead={message.isRead}
            />
          ))}
        </div>
      </div>
      {/* Div to display the actual message */}
      <div className="w-full bg-gray-200 p-12">
        <MessageComponent messageID={messageID} setMessageID={setMessageID} />
      </div>
    </div>
  );
};

export default Messages;
