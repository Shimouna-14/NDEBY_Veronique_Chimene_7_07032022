/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { UserHeader } from '../../../components/Header'
import styled from "styled-components";
import {  useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import Axios from "axios";

const Main = styled.main`
    display: flex;
    justify-content: center;
`

const Publication = styled.article`
    width: 60%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    margin-bottom: 40px;
    padding: 20px 5%;
    margin-top: 50px;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 75%;
    }
    @media screen and (max-width: 575px) {
        width: 75%;
    }
`

const Form = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`

const Input = styled.textarea`
    margin-bottom: 20px;
    resize: none;
    width: 100%;
    height: 100px;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        height: 200px;
    }
    @media screen and (max-width: 575px) {
        height: 300px;
    }
`

const Button = styled.button`
    margin-top: 20px;
    width: 15%;
    height: 40px;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 15%;
    }
    @media screen and (max-width: 575px) {
        width: 20%;
    }
`

function UpdatePost() {
    const { id: postId } = useParams()
    let token = JSON.parse(localStorage.getItem("jwt_G"))
    let [postData, setPostData] = useState({})
    let [description, setDescription] = useState("")

    useEffect(() => {
        fetch(`http://localhost:8000/api/home/status/${postId}`, {
            headers: { 'Authorization': `token ${token}` }
        })
        .then((response) => response.json())
        .then((postData) => {
            setPostData(postData)
            setDescription(postData[0].description)
        })
        .catch((error) => console.log(error))
    }, [postId])

    const { register, handleSubmit, formState: { errors } } = useForm()
    const updatePost = (data) => {
        Axios.put(`http://localhost:8000/api/home/status/${postId}`, {
            description: data.description
        } , {
            headers: { 'Authorization': `token ${token}` }
        })
        .then(() => window.location = `/status/${postId}`)
        .catch((error) => console.log(error))
    }

    return (
        <>
            <UserHeader />
            <Main>
                <Publication>
                    <Form onSubmit={handleSubmit(updatePost)} >
                        <Input placeholder='Write something...' value={description} {...register('description', {
                            required: true, pattern: /^[A-Za-z][0-9A-Za-z '-:]{1,}$/, onChange: (event) => { setDescription(event.target.value) }
                        })}/>
                        {errors.description && <span>Write a description</span>}
                        <Button>Update</Button>
                    </Form>
                </Publication>
            </Main>
        </>
    )
};


export default UpdatePost;