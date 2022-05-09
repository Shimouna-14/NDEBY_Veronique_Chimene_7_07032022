import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types'
// import DefaultPicture from '../../assets/profile.png'
import { Link, useParams } from 'react-router-dom';
import { useState } from "react";
import Axios from "axios";

const Publication = styled.article`
    width: 70%;
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

const UserPost = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`
const StyledLink = styled(Link)`
    width: 100%;
`
const Form = styled.form`
    display: flex;
    justify-content: space-around;
`

const Comment = styled.input`
    width: 75%;
    height: 25px;
    padding-left: 20px;
    border-radius: 20px;
    border: 1px solid black;
    background-color: #F4F4F4;
    @media screen and (max-width: 575px) {
        width: 75%;
    }
`
const LikeContainer = styled.div`
    display: flex;
    width: 155px;
    justify-content: space-between;
    align-items: center;
`

function OnePost({ username, date, picture, description, like, dislike }) {
    const { id: postId } = useParams()
    const [likeActive, setLikeActive] = useState(false)
    const [dislikeActive, setDislikeActive] = useState(false)
    
    function handleLike() {
        if (likeActive) {
            setLikeActive(false)
            like = like - 1
        } else {
            setLikeActive(true)
            like = like + 1
            if (dislikeActive) {
                setDislikeActive(false)
                like = like + 1
                dislike = dislike - 1
            }
        }
    }

    function handleDislike() {
        if (dislikeActive) {
            setDislikeActive(false)     
            dislike = dislike - 1
        } else {
            setDislikeActive(true)
            dislike = dislike + 1
            if (likeActive) {
                setLikeActive(false)
                dislike = dislike + 1
                like = like - 1
            }
        }
    }

    const liked = () => {
        Axios.post(`http://localhost:8000/api/home/status/${postId}/like`, {
            likes: like ? 0 : 1,
            username: "test2",
            userId: 61
        })
        .then(() => handleLike())
        .then(() => window.location.reload())
        .catch((error) => console.log(error))
    }
    
    const disliked = () => {
        Axios.post(`http://localhost:8000/api/home/status/${postId}/like`, {
            dislikes: dislike ? 0 : -1,
            username: "test2",
            userId: 61
        })
        .then(() => handleDislike())
        .then(() => window.location.reload())
        .catch((error) => console.log(error))
    }

    const [comment, setComment] = useState("")
    const createComment = () => {
        Axios.post(`http://localhost:8000/api/home/status/${postId}/comments`, {
            comment: comment,
            username: "test2",
            userId: 61
        })
        .then(() => window.location.reload())
        .catch((error) => console.log(error))
    }

    return(
        <Publication>
            <StyledLink to={`/profile/${username}`} >
                <UserPost>
                    <FontAwesomeIcon className='userPost' icon={faUserCircle} size="3x" />
                    <div>
                        <p className='paddingUsernameDate'>{username}</p>
                        <p className='paddingUsernameDate'>Published on {date}</p>
                    </div>
                </UserPost>
            </StyledLink>
            <p>{description}</p>
            <div className='img'><img src={picture} alt=""/></div>
            <LikeContainer>
                <FontAwesomeIcon icon={faThumbsUp} size="xl" onClick={liked} />
                <p>{like}</p>
                <FontAwesomeIcon icon={faThumbsDown} size="xl" onClick={disliked} />
                <p>{dislike}</p>
            </LikeContainer>    
            <Form>
                <Comment type="text" placeholder='Comments...' onChange={(event) => {setComment(event.target.value)}} required/>
                <button type="button" onClick={createComment}>Comments</button>
            </Form>
        </Publication>
    )
};

OnePost.prototype = {
    username: PropTypes.string.isRequired, 
    date: PropTypes.instanceOf(Date).isRequired, 
    picture: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    like: PropTypes.number.isRequired,
    dislike: PropTypes.number.isRequired
}

OnePost.defaultProps = {
    username: "", 
    date: "", 
    picture: "", 
    description: "",
    like: 0,
    dislike: 0
}

export default OnePost;