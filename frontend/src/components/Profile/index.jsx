import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components";
import PropTypes from 'prop-types'
import Axios from "axios";
import { useParams } from 'react-router-dom';

const Profil = styled.section`
    display: flex;
    width: 70%;
    justify-content: space-around;
    align-items: center;
`

const UserProfile = styled.div`
    width: 60%;
`
const apiUrl = process.env.REACT_APP_API_URL; 

function Profile({ username, bio }) {
    let token = JSON.parse(localStorage.getItem("jwt_G_admin"))
    const { id: userId } = useParams()

    const deleted = () => {
        Axios.delete(`${apiUrl}/admin/profile/${userId}`, {
            headers: { 'Authorization': `token ${token}` }
        })
        .then(() => window.location = "/admin/home")
        .catch((error) => console.log(error))
    }

    return(
        <>
            <Profil>
            <FontAwesomeIcon aria-hidden="false" role="img"  className='userPost' icon={faUserCircle} size="5x" />
                <UserProfile>
                    <h1>{username}</h1>
                    <p>{bio}</p>
                </UserProfile>
                { token ? (
                    <FontAwesomeIcon aria-hidden="false" role="img" icon={faTrash} onClick={deleted} size="lg" />
                ) : null}
            </Profil>
        </>

    )
};

Profile.prototype = {
    username: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired
};

Profile.defaultPrototype = {
    username: "",
    bio: ""
};


export default Profile;