import styled from "styled-components";
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const CommentContainer = styled.div`
    width: 65%;
    display: flex;
    align-items: center;
    flex-direction: column;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 65%;
    }
    @media screen and (max-width: 575px) {
        width: 70%;
    }
`
const CommentUser = styled.div`
    width: 100%;
    padding: 0 3%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    margin-bottom: 10px;
    padding: 20px 5%;
`

function Comment({comment, user}) {
    return(
        <CommentContainer>
            <CommentUser>
                <Link to={`/api/profile/${user}`}><p>{user}</p></Link>
                <p>{comment}</p>   
            </CommentUser>
        </CommentContainer>
    )
};

Comment.prototype = {
    user: PropTypes.string.isRequired,
    comments : PropTypes.string.isRequired
}

Comment.defaultProps = {
    user: "",
    comment: ""
}

export default Comment;
