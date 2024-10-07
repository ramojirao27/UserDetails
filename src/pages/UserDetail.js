import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const UserDetail = () => {
  const { id } = useParams(); // 'id' is a string
  const Navigate = useNavigate()
  const { users } = useContext(UserContext); // Fetch users from context
  const [userDetails, setUserDetails] = useState(null); // Properly initialize state
 const handleNavigation = ()=>{
     
       Navigate("/")
 }
  // Find the user by comparing 'id' (string) with 'user.id' (number)
  useEffect(() => {
    const foundUser = users.find((user) => user.id === parseInt(id)); // Convert id to number
    setUserDetails(foundUser);
  }, [id, users]); // Dependency array

  if (!userDetails) {
    return <div>Loading...</div>; // Render a loading state if user is not yet found
  }

  return (
    <div className="container mt-5">
  <div className="card shadow">
    <div className="card-header bg-primary text-white">
      <h3 className="text-center">User Details</h3>
    </div>
    <div className="card-body">
      <div className="row mb-3">
        <div className="col-md-6 col-sm-12">
          <p><strong>Name:</strong> {userDetails.name}</p>
        </div>
        <div className="col-md-6 col-sm-12">
          <p><strong>Email:</strong> {userDetails.email}</p>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6 col-sm-12">
          <p><strong>Phone:</strong> {userDetails.phone}</p>
        </div>
        <div className="col-md-6 col-sm-12">
          <p><strong>Username:</strong> {userDetails.username}</p>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6 col-sm-12">
          <p><strong>Address:</strong> {userDetails.address.street}, {userDetails.address.city}</p>
        </div>
        <div className="col-md-6 col-sm-12">
          <p><strong>Company:</strong> {userDetails.company.name}</p>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-md-6 col-sm-12">
          <p><strong>Website:</strong> {userDetails.website}</p>
        </div>
      </div>
      <div className="text-center">
        <button onClick={handleNavigation} className="btn btn-secondary">Back to Home</button>
      </div>
    </div>
  </div>
</div>


  );
};

export default UserDetail;
