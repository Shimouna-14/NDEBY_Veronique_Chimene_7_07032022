import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types'
import Axios from "axios";

const Profile = styled.section`
    width: 70%;
    background-color: #f4f4f4;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 2% 3%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    margin-bottom: 50px;
    margin-top: 20px;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        flex-direction: column;
        height: 450px;
    }
    @media screen and (max-width: 575px) {
        flex-direction: column;
        height: 550px;
    }
`

const Name = styled.div`
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 70%;
    }
    @media screen and (max-width: 575px) {
        width: 70%;
    }
`

const Info = styled.div`
    width: 50%;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 80%;
    }
    @media screen and (max-width: 575px) {
        width: 80%;
    }
`

const Div = styled.div`
    @media screen and (min-width: 547px) {
        display: flex;
    }
`

const Button = styled.div`
    display: flex;
    justify-content: space-around;
    width: 50%;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 80%;
    }
    @media screen and (max-width: 575px) {
        flex-direction: column;
        align-items: center;
        margin-bottom: 40px;
    }
`

const BtnModify = styled.button`
    background: #C4CFAD;
    border-radius: 25px;
    width: 100px;
    height: 45px;
    font-size: 20px;
    color: white;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
`

const BtnDelete = styled.button`
    background: #D05757;
    border-radius: 25px;
    width: 225px;
    height: 45px;
    font-size: 20px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
`

function Setting({ username, bio, email, date }) {
    let token = JSON.parse(localStorage.getItem("jwt_G"))
    let userData = JSON.parse(localStorage.getItem("userData"))
    let userId = userData.userId

    const deleted = () => {
        Axios.delete(`http://localhost:8000/api/profile/${userId}`, {
            headers: { 'Authorization': `token ${token}` }
        })
        .then(() => localStorage.clear() )
        .then(() => window.location = "/auth/signup")
        .catch((error) => console.log(error))
    }

    return (
        <>
            <Profile>
                <Name>
                    <FontAwesomeIcon icon={faUserCircle} size="4x" />
                    <h1>{username}</h1>
                </Name>
                <Info>
                    <Div>
                        <p className="bold">Bio:</p>
                        <p>{bio}</p>
                    </Div>
                    <Div>
                        <p className="bold">Email:</p>
                        <p>{email}</p>
                    </Div>
                    <p>Inscribed since {date}</p>
                </Info>
            </Profile>
            <Button>
                <BtnModify to={`/update-profile/${userId}`}>Modify</BtnModify>
                <BtnDelete onClick={deleted} to='/auth/signup'>Delete the account</BtnDelete>
            </Button>
        </>
    );
}

Setting.prototype = {
    username: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired
};

Setting.defaultPrototype = {
    username: '',
    bio: '',
    email: '',
    date: ''
};


export default Setting;