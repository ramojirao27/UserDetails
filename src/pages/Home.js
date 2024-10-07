
import React, { useEffect ,useState} from 'react'
import Table from '../components/Table';
import loader from '../assets/loader.jpg'
import CreateUser from '../components/CreateUser';
import {UserContext} from '../context/userContext.js';
import { useContext } from 'react';
import UpdateModal from '../components/UpdateModal.js';
import DeleteConfirmationModal from '../components/DeleteConfirmationModel.js';



const Home = () => {
  const { users,fetchUsers,isLoading,setIsLoading,deleteUser } = useContext(UserContext); // Access the user context
    // const [visible,setVisible] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false); // For update modal
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State for delete confirmation modal
    const [userToDelete, setUserToDelete] = useState(null); // State for user to delete
   const [selectedUser, setSelectedUser] = useState(null);
   const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setShowUpdateModal(true); // Open update modal
  };
  const handleCloseUpdateModal = () => setShowUpdateModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };
  const handleDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id); // Call the delete function from context
    }
    handleCloseDeleteModal();
  };
    useEffect(()=>{
        setTimeout(() => {
            fetchUsers();
            setIsLoading(false)
          }, 2000);
       
    
    },[])
  return (
    <>
     
  {/* Loader Section */}
  {isLoading && (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <img src={loader} alt="Loading..." className="img-fluid" style={{ maxWidth: '300px' }} />
    </div>
  )}

  {/* User Creation and Update Section */}
  {!isLoading && (
    <div className="container mt-4">
      {/* Create User Modal */}
      <CreateUser />
     
      {/* Update User Modal */}
      <UpdateModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        userToUpdate={selectedUser}
      />
      <DeleteConfirmationModal show={showDeleteModal} handleClose={handleCloseDeleteModal} handleDelete={handleDelete}/>
      {/* User Table */}
      <Table onUpdateClick={handleUpdateClick}  onDeleteClick={handleDeleteClick}/>
    </div>
  )}
</>

 
  )
}

export default Home