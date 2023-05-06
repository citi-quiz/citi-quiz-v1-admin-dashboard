import React, { useEffect, useState } from 'react';
import "./Manage.css"
import { getAllUsers } from '../apis/apis';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import { Link } from "react-router-dom";


function User() {



   
    const [allUsers, setallUsers] = useState([]);
    const [aUserStatus, setaUserStatus] = useState(false);

    useEffect(() => {
        getAllUsers().then((res) => {
            if(res.error){
                console.log(res.error);
            }
            console.log("All Users: ", res);
            setallUsers(res)
        })
        .catch(err => {
            console.log("Error: ", err);
        })
    }, []);



    const aboutUserDetails = (e, id) => {
            e.preventDefault();
            console.log("About Id - ", id);
            setaUserStatus(true)
    }
    

  return (
    <div className='user-container'>
        <h2>
           Manage User
        </h2>
        <div>
        <div class="grid-container">

            {allUsers.map((user, i) => {
                return (
                    <Link to={`/user/details/${user._id}`}>
                    <div className='centered-box'>
                    
                        <Avatar
                        sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }}
                        alt="Remy Sharp"
                        src="/broken-image.jpg"
                        className="avatar-box"
                        >
                        {user.name.slice(0, 1)}
                        </Avatar>
                        <p>
                            {user.name}
                        </p>
                    </div> 
                    </Link>
                        )
            })
            }
                     
        </div>
        </div>   

    </div>
  )

}

export default User