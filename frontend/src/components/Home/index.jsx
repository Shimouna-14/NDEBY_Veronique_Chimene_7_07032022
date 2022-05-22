/* eslint-disable jsx-a11y/img-redundant-alt */
import styled from 'styled-components'
import '../../styles/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Publication = styled.article`
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    margin-bottom: 40px;
    padding: 20px 5%;
    width: 100%;
`

const UserPost = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

const CenterImg = styled.div`
    display: flex;
    justify-content: center;
`

export function ContainerPost ({ postId, username, userId ,date, picture, description }) {
    return(
        <Publication>
            <Link to={`/profile/${userId}`}>
                <UserPost>
                    <FontAwesomeIcon aria-hidden="false" className='userPost' icon={faUserCircle} size="3x" />
                    <div>
                        <p className='paddingUsernameDate'>{username}</p>
                        <p className='paddingUsernameDate'>Published on {date}</p>
                    </div>
                </UserPost>
            </Link>
            <Link to={`/status/${postId}`}>
                <p>{description}</p>
                {picture ? (
                    <CenterImg><img className='post-img' src={picture} alt="Post picture"/></CenterImg>
                ) : (null)}
            </Link>
        </Publication>
    )
};

ContainerPost.prototype = {
    postId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    description: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
};

ContainerPost.defaultProps = {
    postId: "",
    username: "",
    userId: "",
    date: "",
    description: "",
    picture: ""
};

export function ContainerAdminPost ({ postId, username, userId ,date, picture, description }) {
    return(
        <Publication>
            <Link to={`/admin/profile/${userId}`}>
                <UserPost>
                    <FontAwesomeIcon aria-hidden="false" className='userPost' icon={faUserCircle} size="3x" />
                    <div>
                        <p className='paddingUsernameDate'>{username}</p>
                        <p className='paddingUsernameDate'>Published on {date}</p>
                    </div>
                </UserPost>
            </Link>
            <Link to={`/admin/status/${postId}`}>
                <p>{description}</p>
                {picture ? (
                    <CenterImg><img className='post-img' src={picture} alt=""/></CenterImg>
                ) : (null)}
            </Link>
        </Publication>
    )
};

ContainerAdminPost.prototype = {
    postId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    description: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
};

ContainerAdminPost.defaultProps = {
    postId: "",
    username: "",
    userId: "",
    date: "",
    description: "",
    picture: ""
};