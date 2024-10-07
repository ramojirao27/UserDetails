import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { GrEdit } from 'react-icons/gr'; // Example for edit icon
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const Table = ({ onUpdateClick, onDeleteClick}) => {
  const { users, deleteUser ,setIsLoading} = useContext(UserContext); // Assuming these are from context
  const [searchQuery, setSearchQuery] = useState(''); // For tracking search input
  const [filteredUsers, setFilteredUsers] = useState(users);
 const navigate = useNavigate()
  // Effect to filter users based on the search query
  const handleClick = (id)=>{
    setIsLoading(true)
    navigate(`/user/${id}`)
}
   const handleDelete = (id)=>{
    setIsLoading(true)
    deleteUser(id)
   }
  useEffect(() => {
    const result = users.filter((user) => {
      return (
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery)
      );
    });
    setFilteredUsers(result);
  }, [searchQuery, users]);

  return (
    <div>
      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Search by name, email, or phone"
          className="form-control"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <table className="table table-responsive">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Update User</th>
            <th>Delete User</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td onClick={() => handleClick(user.id)}>{user.name}</td>
              <td className="sm">{user.email}</td>
              <td>{user.phone}</td>
              <td
                onClick={() => onUpdateClick(user)}
                className="text-primary cursor-pointer text-center"
              >
                <GrEdit />
              </td>
              <td
                onClick={() => onDeleteClick(user)}
                className="text-danger cursor-pointer"
              >
              <MdDelete />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

