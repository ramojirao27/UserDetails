

import { createContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

// Create the context
export const UserContext = createContext();

// Create the UserContextProvider component
 const  UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading ,setIsLoading] = useState(true)
  


  // Function to fetch users from the API
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data); // Set the fetched users into state
      // toast.success("Users fetched successfully!");
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Function to add a new user
  const addUser = async (newUser) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
      setUsers((prevUsers) => [...prevUsers, response.data]);
      toast.success("User added successfully.");
    } catch (error) {
      console.error("Error adding user:", error);
      toast.error("Failed to add user. Please try again.");
    }
  };

  // Function to update an existing user
  const updateUser = async (updatedUser) => {
    try {
      const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser);
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
      setIsLoading(false)
      toast.success("User updated successfully.");
    } catch (error) {
      setIsLoading(false)
      console.error("Error updating user:", error);
      toast.error("Failed to update user. Please try again.");
    }
  };

  // Function to delete a user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      setIsLoading(false)
      toast.success("User deleted successfully.");
    } catch (error) {
      setIsLoading(false)
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user. Please try again.");
    }
  };

  return (
    <UserContext.Provider value={{ users, fetchUsers, addUser, updateUser, deleteUser,isLoading,setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};
export default  UserContextProvider
