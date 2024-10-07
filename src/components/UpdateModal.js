import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { UserContext } from '../context/userContext';

const UpdateModal = ({ show, handleClose, userToUpdate, handleUpdate }) => {
   
  const [updatedUser, setUpdatedUser] = useState(userToUpdate);
  const [errors, setErrors] = useState({});
  const {updateUser,setIsLoading} = useContext(UserContext)
  useEffect(() => {
    if (userToUpdate) {
      setUpdatedUser(userToUpdate); // Pre-fill the modal with user data
    }
  }, [userToUpdate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Handle changes for address fields
    if (name === "address.street" || name === "address.city") {
      setUpdatedUser(prevState => ({
        ...prevState,
        address: {
          ...prevState.address,
          [name.split(".")[1]]: value, // Update only the street or city field
        },
      }));
    }
    // Handle changes for company name
    else if (name === "company.name") {
      setUpdatedUser(prevState => ({
        ...prevState,
        company: {
          ...prevState.company,
          name: value, // Update the company name
        },
      }));
    }
    // Handle changes for all other fields
    else {
      setUpdatedUser(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  
  
  const validateForm = () => {
    let formErrors = {};

    // Name validation
    if (!updatedUser.name || updatedUser.name.length < 3) {
      formErrors.name = "Name is required and should be at least 3 characters.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!updatedUser.email || !emailRegex.test(updatedUser.email)) {
      formErrors.email = "A valid email is required.";
    }

    // Phone validation
   
    if (!updatedUser.phone || updatedUser.phone.length<=10) {
        formErrors.phone = "A valid phone number is required ";
    }
      
// if (!updatedUser.phone || !phoneRegex.test(updatedUser.phone)) {
//   formErrors.phone = "A valid phone number is required ";
// }

    // const phoneRegex = /^[0-9]{10}$/; // Simple validation for a 10-digit phone number
    // if (!updatedUser.phone || !phoneRegex.test(updatedUser.phone)) {
    //   formErrors.phone = "A valid 10-digit phone number is required.";
    // }

    // // Username validation
    // if (!updatedUser.username || updatedUser.username.length < 8) {
    //   formErrors.username = "Username should be auto-generated and non-editable.";
    // }

    // Address validation
    if (!updatedUser.address.street || !updatedUser.address.city) {
      formErrors.address = "Street and City are required.";
    }

    // Company name validation (optional)
    if (updatedUser.company.name && updatedUser.company.name.length < 3) {
      formErrors.company = "Company name should be at least 3 characters.";
    }

    // Website validation (optional)
    const websiteRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (updatedUser.website && !websiteRegex.test(updatedUser.website)) {
      formErrors.website = "Website must be a valid URL if provided.";
    }

    return formErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(updatedUser)
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {

      setErrors(validationErrors);

      console.log(errors)
    } else {
      setIsLoading(true)
      setErrors({});
      handleClose()
      updateUser(updatedUser)
    //   console.log(updatedUser)
      // Handle form submission (e.g., API call)
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form className='mx-4 mb-3 z-3' onSubmit={handleSubmit} >
    
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">
        Name
      </label>
      <input
        name="name"
        type="text"
        className="form-control"
        id="title"
        aria-describedby="title"
        value={updatedUser?.name||''}
       onChange={handleChange}
 />
         {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">
        Email
      </label>
      <input
        name='email'
        type="email"
        className="form-control"
        id="emailId"
        value={updatedUser?.email||''}      
         onChange={handleChange}

      />
       {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">
        Phone
      </label>
      <input
        name="phone"
        type="text"
        className="form-control"
        id="phoneId"
        value={updatedUser?.phone||''}
        onChange={handleChange}
      />
      {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
    </div>
    <div className="mb-3">
      <label htmlFor="usernameId" className="form-label">
        UserName
      </label>
      <input
       
        name="username"
        type="text"
        className="form-control"
        id="usernameId"
        value={updatedUser?.username||''}
        
      />
       {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
    </div>
    <div>
     <h5 >Address</h5>
    <div className="mb-3">
      <label htmlFor="streetId" className="form-label">
       street
      </label>
      <input
        name="address.street"
        type="text"
        className="form-control"
  
        id="streeId"
        value={updatedUser?.address.street||''}
        onChange={handleChange}
      />
       {errors.street && <span style={{ color: 'red' }}>{errors.street}</span>}
    </div>
    <div className="mb-3">
      <label htmlFor="cityId" className="form-label">
       City
      </label>
      <input
        name="address.city"
        type="text"
        className="form-control"

        id="cityId"
        value={updatedUser?.address.city||''}
        onChange={handleChange}
      />
       {errors.city && <span style={{ color: 'red' }}>{errors.city}</span>}
    </div>

    </div>
    <div className="mb-3">
      <label htmlFor="companyId" className="form-label">
        Company Name
      </label>
      <input
        name='company.name'
        type="text"
        className="form-control"
        id="companyId"
        value={updatedUser?.company.name||''}
        onChange={handleChange}
      />
       {errors.company && <span style={{ color: 'red' }}>{errors.company}</span>}
    </div>
    <div className="mb-3">
      <label htmlFor="websiteID" className="form-label">
        Website
      </label>
      <input
        name='website'
        type='text'
        className="form-control"
        id="websiteID"

        value={updatedUser?.website||''}
        onChange={handleChange}

      />
      {errors.website &&<span style={{ color: 'red' }}>{errors.website}</span>}
    </div>
 
  </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateModal;
