/* eslint-disable jsx-a11y/img-redundant-alt */
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom';
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
    width: 100px;
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
    margin-top: 10px;
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

const apiUrl = process.env.REACT_APP_API_URL; 

export function OnePost({ userId, username, date, picture, description}) {
    const { id: postId } = useParams()
    let userData = JSON.parse(localStorage.getItem("userData"))
    let token = JSON.parse(localStorage.getItem("jwt_G"))

    const deleted = () => {
        Axios.delete(`${apiUrl}/home/status/${postId}`, {
            headers: { 'Authorization': `token ${token}` }
        })
        .then(() => window.location = "/home")
        .catch((error) => console.log(error))
    };

    const { register, handleSubmit, formState: { errors } } = useForm()
    const createComment = (data) => {
        Axios.post(`${apiUrl}/home/status/${postId}/comments`, {
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
                        <FontAwesomeIcon role="img" aria-hidden="false" className='userPost' icon={faUserCircle} size="3x" />
                        <div>
                            <p className='paddingUsernameDate'>{username}</p>
                            <p className='paddingUsernameDate'>Published on {date}</p>
                        </div>
                    </UserPost>
                </StyledLink>
                {userId === userData.userId ? (
                    <Icon>
                        <Link to={`/update/${postId}`}>
                            <p className='paddingUsernameDate'>Update</p>
                            <FontAwesomeIcon aria-hidden="false" role="img" icon={faPen} size="lg"/>
                        </Link>
                        <div>
                            <p className='paddingUsernameDate'>Delete</p>
                            <FontAwesomeIcon aria-hidden="false" role="img"icon={faTrash} size="lg" onClick={deleted} />
                            </div>
                    </Icon>
                ) : (null)}
            </Div>
            <p>{description}</p>
            { picture ? (<CenterImg><img className='post-img' src={picture} alt="Post picture"/></CenterImg>) : (null)}
            <Form onSubmit={handleSubmit(createComment)}>
                <label htmlFor="comment">Post a comment</label>
                <Comment type="text" placeholder='Comments...' id="comment"
                {...register('comment', {required: true, pattern: /^[A-Za-z][0-9A-Za-z '-,?)!-(:+]{1,}$/})}/>
                <button className="borderBtn" type="submit">Comment</button>
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
    description: PropTypes.string.isRequired
}

OnePost.defaultProps = {
    userId: "",
    username: "",
    date: "",
    picture: "",
    description: ""
}

export function OnePostAdmin({ userId, username, date, picture, description}) {
    const { id: postId } = useParams()
    let token = JSON.parse(localStorage.getItem("jwt_G_admin"))

    const deleted = () => {
        Axios.delete(`${apiUrl}/admin/status/${postId}`, {
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
                        <FontAwesomeIcon aria-hidden="false" role="img" className='userPost' icon={faUserCircle} size="3x" />
                        <div>
                            <p className='paddingUsernameDate'>{username}</p>
                            <p className='paddingUsernameDate'>Published on {date}</p>
                        </div>
                    </UserPost>
                </StyledLink>
                { token ? (
                    <>
                        <FontAwesomeIcon aria-hidden="false" role="img" icon={faTrash} size="lg" onClick={deleted} />
                    </>
                ) : (null)}
            </Div>
            <p>{description}</p>
            { picture ? (
                <CenterImg><img className='post-img' src={picture} alt="Post picture"/></CenterImg>
            ) : (null)}
        </Publication>
    )
};

OnePostAdmin.prototype = {
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    picture: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
}

OnePostAdmin.defaultProps = {
    userId: "",
    username: "",
    date: "",
    picture: "",
    description: ""
}
