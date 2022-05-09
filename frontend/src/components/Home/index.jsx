import styled from 'styled-components'
import '../../styles/style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types'
import DefaultPicture from '../../assets/profile.png'
import { Link } from 'react-router-dom'

const Publication = styled.article`
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    margin-bottom: 40px;
    padding: 20px 5%;
    width: 88%;
`

const UserPost = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`

function PostContainer ({ postId, username, date, picture, description }) {
    return(
        <Publication>
            <Link to={`/profile/${username}`}>
                <UserPost>
                    <FontAwesomeIcon className='userPost' icon={faUserCircle} size="3x" />
                    <div>
                        <p className='paddingUsernameDate'>{username}</p>
                        <p className='paddingUsernameDate'>Published on {date}</p>
                    </div>
                </UserPost>
            </Link>
            <Link to={`/status/${postId}`}>
                <p>{description}</p>
                <img src={picture} alt=""/>
            </Link>
        </Publication>
    )
};

PostContainer.prototype = {
    postId: PropTypes.string.isRequired, 
    username: PropTypes.string.isRequired,    
    date: PropTypes.instanceOf(Date).isRequired, 
    description: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired
};

PostContainer.defaultProps = {
    postId: "",
    username: "",
    date: "", 
    description: "",
    picture: ""
};

export default PostContainer