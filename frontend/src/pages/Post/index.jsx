import styled from "styled-components";
import Header from "../../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faThumbsUp, faThumbsDown, faCommentDots } from "@fortawesome/free-solid-svg-icons";

const Main = styled.main`
    display: flex;
    align-items: center;
    flex-direction: column;
`

const Publication = styled.article`
    width: 50%;
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

const Like = styled.div`
    margin: 16px 0;
    display: flex;
    justify-content: space-between;
    width: 150px;
`

const Comment = styled.input`
    width: 96%;
    height: 25px;
    padding-left: 20px;
    border-radius: 20px;
    border: 1px solid black;
    background-color: #F4F4F4;
    @media screen and (max-width: 575px) {
        width: 93%;
    }
`

function Post() {
    return(
        <div>
            <Header />
            <Main>
                <Publication>
                    <UserPost>
                    <FontAwesomeIcon className='userPost' icon={faUserCircle} size="3x" />
                    <div>
                        <p className='paddingUsernameDate'>Lorem ipsum</p>
                        <p className='paddingUsernameDate ellipse'>Published on 12/02/22 at 12:25</p>
                    </div>
                        </UserPost>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi accusamus quidem voluptates voluptatem quasi esse adipisci veniam repellat, officiis exercitationem, amet nesciunt inventore enim aliquid, tempore dolore quo animi perspiciatis.</p>
                    <div className='img'></div>
                    <Like>
                        <FontAwesomeIcon icon={faThumbsUp} size="xl" />
                        <FontAwesomeIcon icon={faThumbsDown} size="xl" />
                        <FontAwesomeIcon icon={faCommentDots} size="xl" />
                    </Like>
                    <Comment type="text" placeholder='Comments...'/>
                </Publication>
            </Main>
        </div>
    )
}

export default Post;
