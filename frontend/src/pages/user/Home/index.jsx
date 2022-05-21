/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import '../../../styles/style.css'
import { UserHeader } from "../../../components/Header";
import { ContainerPost } from '../../../components/Home'
import { useEffect, useState } from 'react'
import Axios from 'axios'
import { useForm } from 'react-hook-form'

const Main = styled.main`
    display: flex;
    justify-content: space-around;
`

const Post = styled.section`
    width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 80%;
    }
    @media screen and (max-width: 575px) {
        width: 90%;
    }
`

const CreatePost = styled.div`
    background-color: #C4CFAD;
    width: 100%;
    height: 100px;
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    @media screen and (max-width: 575px) {
        height: 200px;
    }
`

const Form = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 90%;
    @media screen and (max-width: 575px) {
        flex-direction: column;
    }
`

const Description = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 575px) {
        width: 100%;
        margin-bottom: 15px;
    }
`

const Input = styled.textarea`
    resize: none;
    border: none;
    border-radius: 25px;
    padding: 5px 20px;
    width: 400px;
    height: 50px;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 250px;
    }
    @media screen and (max-width: 575px) {
        width: 80%;
    }
`
const Button = styled.button`
    border: 0;
    background-color: white;
    color: #C4CFAD;
    height: 30px;
    width: 65px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 25px;
    padding: 0 1%;
    cursor: pointer;
    @media screen and (max-width: 575px) {
        width: 30%;
        height: 40px;
        margin-top: 15px;
    }
`

const AllPost = styled.div`
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    width: 85%;
`

function Home() {
    let token = JSON.parse(localStorage.getItem("jwt_G"))
    const [postList, setPostList] = useState([])
    useEffect(() => {
        fetch('http://localhost:8000/api/home', {
            headers: { 'Authorization': `token ${token}` }
        })
            .then((response) => response.json())
            .then((postList) => {setPostList(postList)})
            .catch((error) => console.log(error))
    }, []);

    const [image, setImage] = useState(null)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const createPost = (data) => {
        const formData = new FormData();
        formData.append("image", image)
        formData.append("description", data.description)
        Axios.post('http://localhost:8000/api/home', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `token ${token}`
            }
        })
        .then(() => window.location.reload())
        .catch((error) => console.log(error))
    };

    const handleImage = (event) => { setImage(event.target.files[0]) }

    return (
        <>
            <UserHeader />
            <Main>
                <Post>
                    <CreatePost>
                        <Form onSubmit={handleSubmit(createPost)}>
                            <Description>
                                <Input placeholder='Post something...' {...register('description', { required: true, pattern: /^[A-Za-z][0-9A-Za-z '-]{1,}$/, max: "1500"})}/>
                                {errors.description && <span>Write a description or the description is to long</span>}
                            </Description>
                            <label htmlFor='file'>
                                <FontAwesomeIcon icon={faImage} size="2x"/>
                                <input type="file" id='file' onChange={handleImage}/>
                            </label>
                            <Button type="submit">Post</Button>
                        </Form>
                    </CreatePost>
                    <h1>Lasted post</h1>
                    <AllPost>
                        {postList.map((post) => (
                            <ContainerPost
                                key={post.id}
                                postId={post.id}
                                username={post.username}
                                userId={post.userId}
                                date={post.date}
                                picture={post.image}
                                description={post.description}
                            />
                        ))}
                    </AllPost>
                </Post>
            </Main>
        </>
    )
};

export default Home;
