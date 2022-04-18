import styled from "styled-components";
import Header from "../../components/Header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
`

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
`

const BtnDelete = styled.button`
    background: #D05757;
    border-radius: 25px;
    width: 200px;
    height: 45px;
    font-size: 20px;
    color: white;
`

function Setting() {
    return(
        <div>
            <Header />
            <Main>
                <Profile>
                    <Name>
                        <FontAwesomeIcon icon={faUserCircle} size="4x" />
                        <h1>Lorum ipsum</h1>
                    </Name>
                    <Info>
                        <div>
                            <p>Bio :</p>
                            <p>lorem ipsum dolor sit amet consectetur adipiscing elit pharetra cras bibendum nullam lacus ultricies tristique lectus suscipit pellentesque vehicula cursus lobortis tellus rhoncus</p>
                        </div>
                        <div>
                            <p>Email :</p>
                            <p>l......@gmail.com</p>
                        </div>
                        <p>Inscribed since 05/02/22</p>
                    </Info>
                </Profile>
                <Button>
                    <BtnModify>Modify</BtnModify>
                    <BtnDelete>Delete the account</BtnDelete>
                </Button>
            </Main>
        </div>
    )
}

export default Setting;
