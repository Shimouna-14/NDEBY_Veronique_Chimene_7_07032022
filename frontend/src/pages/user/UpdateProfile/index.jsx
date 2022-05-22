/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { UserHeader } from '../../../components/Header';
import styled from "styled-components";
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Profile = styled.form`
    width: 70%;
    background-color: #f4f4f4;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 2% 3%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    margin-bottom: 50px;
    margin-top: 20px;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        flex-direction: column;
        height: 450px;
    }
    @media screen and (max-width: 575px) {
        flex-direction: column;
        height: 550px;
    }
`

const Name = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 70%;
    }
    @media screen and (max-width: 575px) {
        width: 70%;
    }
`

const Info = styled.div`
    width: 50%;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 80%;
    }
    @media screen and (max-width: 575px) {
        width: 90%;
    }
`

const Div = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
`

const Bio = styled.textarea`
    resize: none;
    border: 1px solid black;
    border-radius: 20px;
    width: 80%;
    height: 125px;
    padding: 5px 0 0 15px;
    @media screen and (max-width: 575px) {
        height: 190px;
    }
`

const Button = styled.button`
    background: #C4CFAD;
    border-radius: 25px;
    width: 120px;
    height: 45px;
    font-size: 20px;
    color: white;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
`


function UpdateProfile() {
    let token = JSON.parse(localStorage.getItem("jwt_G"))
    let userData = JSON.parse(localStorage.getItem("userData"))
    let userId = userData.userId
    const [profile, setProfile] = useState([])
    let [bio, setBio] = useState("")

    useEffect(() => {
        fetch(`http://localhost:8000/api/profile/${userId}`, {
            headers: { 'Authorization': `token ${token}` }
        })
            .then((response) => response.json())
            .then((profile) => {
                setProfile(profile)
                setBio(profile[0].bio)
            })
            .catch((error) => console.log(error))
    }, [userId])

    const { register, handleSubmit, formState: { errors } } = useForm()
    const updateProfile = (data) => {
        Axios.put(`http://localhost:8000/api/profile/${userId}`, {
            bio: data.bio
        } , {
            headers: { 'Authorization': `token ${token}` }
        })
        .then(() => window.location = `/setting/${userId}`)
        .catch((error) => console.log(error))
    }
    return (
        <>
            <UserHeader />
            <Main>
                <Profile onSubmit={handleSubmit(updateProfile)}>
                    <Name>
                        <FontAwesomeIcon icon={faUserCircle} size="4x" />
                        <h1>{userData.username}</h1>
                    </Name>
                    <Info>
                        <Div>
                            <label htmlFor="bio">Bio :</label>
                            <Bio placeholder='Write something...' value={bio} {...register('bio', {
                                required: true, pattern: /^[A-Za-z][0-9A-Za-z '-:]{1,}$/, onChange: (event) => { setBio(event.target.value) }
                            })} />
                        </Div>
                        {errors.bio && <span>Write something</span>}
                    </Info>
                </Profile>
                <Button>Confirm</Button>
            </Main>
        </>
    );
};

export default UpdateProfile;