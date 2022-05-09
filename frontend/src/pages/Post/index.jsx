import Header from "../../components/Header";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ContainerPost from "../../components/Post";
import ContainerComment from "../../components/Comment";

const Main = styled.main`
    display: flex;
    align-items: center;
    flex-direction: column;
`

function Post() {
    const { id: postId } = useParams()
    const [postData, setPostData] = useState([])
    useEffect(() => {
        fetch(`http://localhost:8000/api/home/status/${postId}`)
            .then((response) => response.json())
            .then((postData) => {setPostData(postData)})
            .catch((error) => console.log(error))
    }, [postId])

    const [commentList, setcommentList] = useState([])
    useEffect(() => {
        fetch(`http://localhost:8000/api/home/status/${postId}/comments`)
            .then((response) => response.json())
            .then((commentList) => {setcommentList(commentList)})
            .catch((error) => console.log(error))
    }, [postId])

    return(
        <div>
            <Header />
            <Main>
                {postData.map((post) => (
                    <ContainerPost
                        key={post.id}
                        username={post.username}
                        date={post.date}
                        picture={post.image}
                        description={post.description}
                        like={post.likes}
                        dislike={post.dislikes}
                    />
                ))}
                {commentList.map((post) => (
                    <ContainerComment 
                        key={-post.commentId}
                        user={post.username}
                        comment={post.comment}
                    />
                ))}
            </Main>
        </div>
    )
}

export default Post;
