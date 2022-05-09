import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import '../../styles/style.css'
import Header from '../../components/Header'
import PostContainer from '../../components/Home'
import { useEffect, useState } from 'react'
import Axios from 'axios'

const Main = styled.main`
    display: flex;
    justify-content: space-around;
`

const Post = styled.section`
    width: 55%;
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
    height: 85px;
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 90%;
`

const Input = styled.input`
    border: none;
    border-radius: 25px;
    padding-left: 20px;
    width: 350px;
    height: 40px;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 250px;
    }
    @media screen and (max-width: 575px) {
        width: 200px;
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
`

const AllPost = styled.div`
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
`

function Home() {
    const [postList, setPostList] = useState([])
    useEffect(() => {
        fetch(`http://localhost:8000/api/home`)
            .then((response) => response.json())
            .then((postList) => {setPostList(postList)})
            .catch((error) => console.log(error))
    }, []);

    const [image, setImage] = useState()
    const [description, setDescription] = useState("")
    const createPost = () => {
        Axios.post('http://localhost:8000/api/home', {
            description: description, 
            image: image
        })
        .then(() => window.location.reload())
        .catch((error) => console.log(error))
    };

    return (
        <div>
            <Header />
            <Main>
                <Post>
                    <CreatePost>
                        <Form>
                            <label htmlFor="description">
                                <Input type="text" name="description" id="description" placeholder='Post something...' onChange={(event) => {setDescription(event.target.value)}} required/>  
                            </label>
                            <label htmlFor='file'>
                                <FontAwesomeIcon icon={faImage} size="2x" />
                                <input type="file" id='file' onChange={(event) => {setImage(event.target.value)}} />
                            </label>  
                            <Button type="button" onClick={createPost}>Post</Button>
                        </Form>
                    </CreatePost>

                    <h1>Lasted post</h1>
                    <AllPost>
                        {postList.map((post) => (
                            <PostContainer
                                key={post.id}
                                postId={post.id}
                                username={post.username}
                                date={post.date}
                                imageUrl={post.image}
                                description={post.description}
                            />
                        ))}
                    </AllPost>
                </Post>
            </Main>
        </div>
    )
};

export default Home;
