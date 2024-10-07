
import React,{useState} from 'react'
import {UserContext} from '../context/userContext.js';
import { useContext } from 'react';
const CreateUser = ({setVisible,createNewUser}) => {
  const {addUser} = useContext(UserContext)
  const [errors, setErrors] = useState({});
  const [newUser,setNewUser] = useState({
    name:"",
    email:"",
    phone:"",
    username:"",
    address:{street:"",city:""},
    company:{name:""},
    website:""
  
   })
   const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Handle changes for address fields
    if (name === "address.street" || name === "address.city") {
      setNewUser(prevState => ({
        ...prevState,
        address: {
          ...prevState.address,
          [name.split(".")[1]]: value, // Update only the street or city field
        },
      }));
    }
    // Handle changes for company name
    else if (name === "company.name") {
      setNewUser(prevState => ({
        ...prevState,
        company: {
          ...prevState.company,
          name: value, // Update the company name
        },
      }));
    }
    // Handle changes for all other fields
    else {
      setNewUser(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  
  
  const validateForm = () => {
    let formErrors = {};

    // Name validation
    if (!newUser.name || newUser.name.length < 3) {
      formErrors.name = "Name is required and should be at least 3 characters.";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!newUser.email || !emailRegex.test(newUser.email)) {
      formErrors.email = "A valid email is required.";
    }
//phone validation
    if (!newUser.phone || newUser.phone.length<=10) {
      formErrors.phone = "A valid phone number is required ";
  }
    
    // Username validation
    if (!newUser.username || newUser.username.length < 8) {
      formErrors.username = "Username should be auto-generated and non-editable.";
    }

    // Address validation
    if (!newUser.address.street || !newUser.address.city) {
      formErrors.address = "Street and City are required.";
    }

    // Company name validation (optional)
    if (newUser.company.name && newUser.company.name.length < 3) {
      formErrors.company = "Company name should be at least 3 characters.";
    }

    // Website validation (optional)
    const websiteRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (newUser.website && !websiteRegex.test(newUser.website)) {
      formErrors.website = "Website must be a valid URL if provided.";
    }

    return formErrors;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(newUser)
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {

      setErrors(validationErrors);

      console.log(errors)
    } else {
      
      setErrors({});
     addUser(newUser)
      // Handle form submission (e.g., API call)
    }
  };
  return (
    <>
    <button
          type="button"
          className="btn btn-primary my-3"
          data-bs-toggle="modal"
          data-bs-target="#createUserModal"
         
        >
          Create New User
        </button>
      <div
        className="modal fade"
        id="createUserModal"
        tabIndex="-1"
        aria-labelledby="createUserModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createUserModalLabel">Create New User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body"></div>
    
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
        value={newUser.name}
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

        value={newUser.email}
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
        value={newUser.phone}
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
        value={newUser.username}
        onChange={handleChange}
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
        value={newUser.address.street}
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
        value={newUser.address.city}
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
        value={newUser.company.name}
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

        value={newUser.website}
        onChange={handleChange}

      />
      {errors.website &&<span style={{ color: 'red' }}>{errors.website}</span>}
    </div>

    <button  type='submit'  className="btn mx-3 btn-primary">
      Submit
    </button>
    <button data-bs-dismiss="modal"  className="btn btn-primary">
      close
    </button>
    
  </form>
  </div>
          </div>
        </div>
      
      </>
    
  )
}

export default CreateUser

