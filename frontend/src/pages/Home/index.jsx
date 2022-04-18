import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faXmark, faImage, faThumbsUp, faThumbsDown, faCommentDots } from '@fortawesome/free-solid-svg-icons'
import '../../styles/style.css'
import Header from '../../components/Header'

const Main = styled.main`
    display: flex;
    justify-content: space-around;
`

const Post = styled.section`
    width: 55%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 80%;
    }
    @media screen and (max-width: 575px) {
        width: 90%;
    }
`

const CreatePost = styled.div`
    background-color: #C4CFAD;
    width: 100%;
    height: 85px;
    border-radius: 20px;
    display: flex;
    justify-content: space-around;
    align-items: center;
`

const Form = styled.form`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 90%;
`

const Input = styled.input`
    border: none;
    border-radius: 25px;
    padding-left: 20px;
    width: 350px;
    height: 40px;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 250px;
    }
    @media screen and (max-width: 575px) {
        width: 200px;
    }
`
const BtnPost = styled.button`
    border: 0;
    background-color: white;
    color: #C4CFAD;
    height: 30px;
    width: 65px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 25px;
    padding: 0 1%;
`

const AllPost = styled.div`
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
`

const Publication = styled.article`
    width: 88%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    margin-bottom: 40px;
    padding: 20px 5%;
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
    width: 110px;
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

const Notif = styled.section`
    width: 23%;
    background-color: #C4CFAD;
    height: 60%;
    border-radius: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    scrollbar-width: none;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        display: none;
    }
    @media screen and (max-width: 575px) {
        display: none;
    }
`

const NotifPost = styled.div`
    display: flex;
    align-items: center;
    background-color: #C4CFAD;
    box-shadow: 0px 6px 16px 5px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    width: 90%;
    height: 70px;
    margin-bottom: 20px;
    padding: 10px 0;
`

function Home() {
    return (
        <div>
            <Header />
            <Main>
                <Post>
                    <CreatePost>
                        <Form action="">
                            <Input type="text" id="post" name="post" placeholder='Post something...' />  
                            <label className='labelfile' htmlFor="file"><FontAwesomeIcon icon={faImage} size="2x" /></label>  
                            <input className='inputfile' type="file" name="file" id="file" />
                            <BtnPost>Post</BtnPost>
                        </Form>
                    </CreatePost>

                    <h1>Lasted post</h1>
                    <AllPost>
                        <Publication>
                            <UserPost>
                                <FontAwesomeIcon className='userPost' icon={faUserCircle} size="3x" />
                                <div>
                                    <p className='paddingUsernameDate'>Lorem ipsum</p>
                                    <p className='paddingUsernameDate'>Published on 12/02/22 at 12:25</p>
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
                    </AllPost>
                </Post>
                <Notif>
                    <h2>Notifications</h2>
                    <NotifPost>
                        <FontAwesomeIcon icon={faXmark} size="lg" />
                        <FontAwesomeIcon className='userNotif' icon={faUserCircle} size="3x" />
                        <p>Lorum ipsum likes your post</p>
                    </NotifPost>

                    <NotifPost>
                        <FontAwesomeIcon icon={faXmark} size="lg" />
                        <FontAwesomeIcon className='userNotif' icon={faUserCircle} size="3x" />
                        <p>Lorum ipsum Lorum ipsum comment your post</p>
                    </NotifPost>
                </Notif>
            </Main>
        </div>
    )
}

export default Home;
