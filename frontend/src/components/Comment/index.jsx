import styled from "styled-components";
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";

const CommentContainer = styled.div`
    width: 55%;
    padding: 0 3%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    margin-bottom: 10px;
    padding: 20px 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 65%;
    }
    @media screen and (max-width: 575px) {
        width: 70%;
    }
`

const Content = styled.div`
    width: 95%;
`

export function ContainerComment({comment, userId, username, commentId}) {
    let token = JSON.parse(localStorage.getItem("jwt_G"))
    let userData = JSON.parse(localStorage.getItem("userData"))

    const deleted = () => {
        Axios.delete(`http://localhost:8000/api/home/comments/${commentId}`, {
            headers: { 'Authorization': `token ${token}` }
        })
        .then(() => window.location.reload())
        .catch((error) => console.log(error))
    }

    return(
        <CommentContainer>
                <Content>
                    <Link to={`/profile/${userId}`}><p>{username}</p></Link>
                    <p>{comment}</p>
                </Content>
                    { userId === userData.userId ? (
                        <div>
                            <p id="commentId">{commentId}</p>
                            <FontAwesomeIcon icon={faTrash} size="xl" onClick={deleted}/>
                        </div>
                    ) : (null)}
        </CommentContainer>
    )
};

ContainerComment.prototype = {
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    comment : PropTypes.string.isRequired,
    commentId : PropTypes.string.isRequired
};

ContainerComment.defaultProps = {
    userId: "",
    username: "",
    comment: "",
    commentId: ""
};

export function ContainerAdminComment({comment, userId, username, commentId}) {
    let token = JSON.parse(localStorage.getItem("jwt_G_admin"))

    const deleted = () => {
        Axios.delete(`http://localhost:8000/api/admin/comments/${commentId}`, {
            headers: { 'Authorization': `token ${token}` }
        })
        .then(() => window.location.reload())
        .catch((error) => console.log(error))
    }

    return(
        <CommentContainer>
                <Content>
                    <Link to={`/profile/${userId}`}><p>{username}</p></Link>
                    <p>{comment}</p>
                </Content>
                    { token ? (
                        <div>
                            <p id="commentId">{commentId}</p>
                            <FontAwesomeIcon icon={faTrash} size="xl" onClick={deleted}/>
                        </div>
                    ) : (null)}
        </CommentContainer>
    )
};

ContainerAdminComment.prototype = {
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    comment : PropTypes.string.isRequired,
    commentId : PropTypes.string.isRequired
};

ContainerAdminComment.defaultProps = {
    userId: "",
    username: "",
    comment: "",
    commentId: ""
};