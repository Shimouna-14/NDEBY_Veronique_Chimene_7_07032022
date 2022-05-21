import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faThumbsUp, faThumbsDown, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom';
import { useState } from "react";
import Axios from "axios";
import { useForm } from 'react-hook-form'

const Publication = styled.article`
    width: 65%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    margin-bottom: 40px;
    padding: 20px 5%;
    margin-top: 50px;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 75%;
    }
    @media screen and (max-width: 575px) {
        width: 80%;
    }
`

const Div = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const StyledLink = styled(Link)`
    width: auto;
`

const UserPost = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const Icon = styled.div`
    width: 75px;
    margin-left: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 575px) {
        flex-direction: column;
        margin-left: 25px;
        height: 55px;
    }
`

const CenterImg = styled.div`
    display: flex;
    justify-content: center;
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

export function OnePost({ userId, username, date, picture, description, like, dislike }) {
    const { id: postId } = useParams()
    let userData = JSON.parse(localStorage.getItem("userData"))
    let token = JSON.parse(localStorage.getItem("jwt_G"))
    const [likeActive, setLikeActive] = useState(false)
    const [dislikeActive, setDislikeActive] = useState(false)

    const deleted = () => {
        Axios.delete(`http://localhost:8000/api/home/status/${postId}`, {
            headers: { 'Authorization': `token ${token}` }
        })
        .then(() => window.location = "/home")
        .catch((error) => console.log(error))
    };

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
    };

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
    };

    const liked = () => {
        Axios.post(`http://localhost:8000/api/home/status/${postId}/like`, {
            likes: like ? 0 : 1
        }, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(() => handleLike())
        .then(() => window.location.reload())
        .catch((error) => console.log(error))
    };

    const disliked = () => {
        Axios.post(`http://localhost:8000/api/home/status/${postId}/like`, {
            dislikes: dislike ? 0 : -1
        }, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(() => handleDislike())
        .then(() => window.location.reload())
        .catch((error) => console.log(error))
    };

    const { register, handleSubmit, formState: { errors } } = useForm()
    const createComment = (data) => {
        Axios.post(`http://localhost:8000/api/home/status/${postId}/comments`, {
            comment: data.comment
        }, {
            headers: {
                'Authorization': `token ${token}`
            }
        })
        .then(() => window.location.reload())
        .catch((error) => console.log(error))
    }

    return(
        <Publication>
            <Div>
                <StyledLink to={`/profile/${userId}`}>
                    <UserPost>
                        <FontAwesomeIcon className='userPost' icon={faUserCircle} size="3x" />
                        <div>
                            <p className='paddingUsernameDate'>{username}</p>
                            <p className='paddingUsernameDate'>Published on {date}</p>
                        </div>
                    </UserPost>
                </StyledLink>
                { userId === userData.userId ? (
                    <Icon>
                        <Link to={`/update/${postId}`}><FontAwesomeIcon icon={faPen} size="lg"/></Link>
                        <FontAwesomeIcon icon={faTrash} size="lg" onClick={deleted} />
                    </Icon>
                ) : (null)}
            </Div>
            <p>{description}</p>
            { picture ? (
                <CenterImg><img className='post-img' src={picture} alt=""/></CenterImg>
            ) : (null)}
            <LikeContainer>
                <FontAwesomeIcon icon={faThumbsUp} size="xl" onClick={liked} />
                <p>{like}</p>
                <FontAwesomeIcon icon={faThumbsDown} size="xl" onClick={disliked} />
                <p>{dislike}</p>
            </LikeContainer>
            <Form onSubmit={handleSubmit(createComment)}>
                <Comment type="text" placeholder='Comments...' {...register('comment', { required: true, pattern: /^[A-Za-z][0-9A-Za-z '-]{1,}$/})}/>
                <button type="submit">Comment</button>
            </Form>
            {errors.comment && <span>Write a comment</span>}
        </Publication>
    )
};

OnePost.prototype = {
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    picture: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    like: PropTypes.number.isRequired,
    dislike: PropTypes.number.isRequired
}

OnePost.defaultProps = {
    userId: "",
    username: "",
    date: "",
    picture: "",
    description: "",
    like: 0,
    dislike: 0
}

export function OnePostAdmin({ userId, username, date, picture, description, like, dislike }) {
    const { id: postId } = useParams()
    let token = JSON.parse(localStorage.getItem("jwt_G_admin"))

    const deleted = () => {
        Axios.delete(`http://localhost:8000/api/admin/status/${postId}`, {
            headers: { 'Authorization': `token ${token}` }
        })
        .then(() => window.location = "/admin/home")
        .catch((error) => console.log(error))
    };
    return(
        <Publication>
            <Div>
                <StyledLink to={`/admin/profile/${userId}`}>
                    <UserPost>
                        <FontAwesomeIcon className='userPost' icon={faUserCircle} size="3x" />
                        <div>
                            <p className='paddingUsernameDate'>{username}</p>
                            <p className='paddingUsernameDate'>Published on {date}</p>
                        </div>
                    </UserPost>
                </StyledLink>
                { token ? (
                    <>
                        <FontAwesomeIcon icon={faTrash} size="lg" onClick={deleted} />
                    </>
                ) : (null)}
            </Div>
            <p>{description}</p>
            { picture ? (
                <CenterImg><img className='post-img' src={picture} alt=""/></CenterImg>
            ) : (null)}
            <LikeContainer>
                <FontAwesomeIcon icon={faThumbsUp} size="xl" />
                <p>{like}</p>
                <FontAwesomeIcon icon={faThumbsDown} size="xl" />
                <p>{dislike}</p>
            </LikeContainer>
        </Publication>
    )
};

OnePostAdmin.prototype = {
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    picture: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    like: PropTypes.number.isRequired,
    dislike: PropTypes.number.isRequired
}

OnePostAdmin.defaultProps = {
    userId: "",
    username: "",
    date: "",
    picture: "",
    description: "",
    like: 0,
    dislike: 0
}
