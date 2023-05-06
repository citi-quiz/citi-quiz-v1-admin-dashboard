import React, { useEffect, useState } from "react";
import { getAUsers, getAllUsers } from "../../apis/apis";
import { Routes, Route, useParams } from "react-router-dom";
import "./UserDetails.css";
import { Avatar } from "@mui/material";
import { deepOrange } from "@mui/material/colors";

function UserDetails() {
  const { userId } = useParams();
  const [userDetails, setuserDetails] = useState("");
  const getAllUsersDetails = () => {
    console.log("id - ", userId);
    getAUsers(userId)
      .then((res) => {
        console.log("Res - ", res);
        setuserDetails(res);
      })
      .catch((err) => {
        console.log("Error - ", err);
      });
  };

  useEffect(() => {
    getAllUsersDetails();
  }, []);

  return (
    <div>
      User Profile Details
      <div className="user-avatar">
        <Avatar
          sx={{ bgcolor: deepOrange[500], width: 56, height: 56 }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
          className="avatar-box"
        >
          {userDetails.name}
        </Avatar>
      </div>
      <p className="user-name">{userDetails.name}</p>
      <p className="user-name">{userDetails.email}</p>
      <p className="test-score">{userDetails.totalScore}</p>
    </div>
  );
}

export default UserDetails;
