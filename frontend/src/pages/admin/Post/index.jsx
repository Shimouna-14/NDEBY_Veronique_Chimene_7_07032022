/* eslint-disable react-hooks/exhaustive-deps */
import { AdminHeader } from "../../../components/Header";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { OnePostAdmin } from "../../../components/Post";
import { ContainerAdminComment } from "../../../components/Comment";

const Main = styled.main`
    display: flex;
    align-items: center;
    flex-direction: column;
`

function Post() {
    const { id: postId } = useParams()
    let token = JSON.parse(localStorage.getItem("jwt_G_admin"))

    const [postData, setPostData] = useState([])
    useEffect(() => {
        fetch(`http://localhost:8000/api/admin/status/${postId}`, {
            headers: { 'Authorization': `token ${token}` }
        })
            .then((response) => response.json())
            .then((postData) => {setPostData(postData)})
            .catch(() => window.location = '/error')
    }, [postId])

    const [commentList, setcommentList] = useState([])
    useEffect(() => {
        fetch(`http://localhost:8000/api/admin/status/${postId}/comments`, {
            headers: { 'Authorization': `token ${token}` }
        })
            .then((response) => response.json())
            .then((commentList) => {setcommentList(commentList)})
            .catch((error) => console.log(error))
    }, [postId])

    return(
        <>
            <AdminHeader />
            <Main>
                {postData.map((post) => (
                    <OnePostAdmin
                        key={post.id}
                        userId={post.userId}
                        username={post.username}
                        date={post.date}
                        picture={post.image}
                        description={post.description}
                        like={post.likes}
                        dislike={post.dislikes}
                    />
                ))}
                {commentList.map((comment) => (
                    <ContainerAdminComment
                        key={comment.id}
                        userId={comment.userId}
                        username={comment.username}
                        comment={comment.comment}
                    />
                ))}
            </Main>
        </>
    )
};

export default Post;
