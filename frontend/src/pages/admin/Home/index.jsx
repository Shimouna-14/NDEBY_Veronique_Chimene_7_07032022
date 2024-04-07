/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components'
import '../../../styles/style.css'
import { AdminHeader } from '../../../components/Header'
import { ContainerAdminPost } from '../../../components/Home'
import { useEffect, useState } from 'react'

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

const AllPost = styled.div`
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    width: 85%;
`

function Home() {
    let token = JSON.parse(localStorage.getItem("jwt_G_admin"))
    const [postList, setPostList] = useState([])
    const apiUrl = process.env.REACT_APP_API_URL; 
    useEffect(() => {
        fetch(`${apiUrl}/admin/home`, {
            headers: { 'Authorization': `token ${token}` }
        })
            .then((response) => response.json())
            .then((postList) => {setPostList(postList)})
            .catch((error) => console.log(error))
    }, []);

    return (
        <>
            <AdminHeader />
            <Main>
                <Post>
                    <h1>Lasted post</h1>
                    <AllPost>
                        {postList.map((post) => (
                            <ContainerAdminPost
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
