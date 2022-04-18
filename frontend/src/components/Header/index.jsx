import styled from 'styled-components'
import logo from '../../assets/icon.png'
import longlogo from '../../assets/icon-left-font-monochrome-white.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import '../../styles/style.css'
import { faUserCircle, faSearch, faPlus, faBell, faGear, faPowerOff} from '@fortawesome/free-solid-svg-icons'

const Nav = styled.nav`
    background-color: #C4CFAD;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 6%;
    margin-bottom: 6%;
`

const Icon = styled.img`
    display: none;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        display: initial;
        width: auto;
        height: 41px;
    }
    @media screen and (max-width: 575px) {
        display: initial;
        width: auto;
        height: 41px;
    }
`

const LongIcon = styled.img`
    width: auto;
    height: 35px;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        display: none;
    }
    @media screen and (max-width: 575px) {
        display: none;
    }
`

const Search = styled.input`
    width: 350px;
    height: 28px;
    border: none;
    border-radius: 25px;
    padding-left: 40px;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 200px;
    }
    @media screen and (max-width: 575px) {
        width: 100px;
    }
`

const BtnCreate = styled.button`
    border: 0;
    background-color: white;
    color: #C4CFAD;
    height: 30px;
    width: 85px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 25px;
    padding: 0 1%;
    @media screen and (max-width: 575px) {
        display: none;
    }
`
const BtnCreateMobile = styled.button`
    display: none;
    @media screen and (max-width: 575px) {
        display: initial;
        border: 0;
        background-color: white;
        color: #C4CFAD;
        border-radius: 20px;
        height: 30px;
        width: 30px;
    }
`

const BellMobile = styled.div`
    display: none;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        display: initial;
    
    }
    @media screen and (max-width: 575px) {
        display: initial;
    }
`

// const Setting = styled.div`
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     position: absolute;
//     width: 219px;
//     box-shadow: 0px 13px 16px 5px rgba(0, 0, 0, 0.1);
//     border-radius: 20px;
//     background-color: #C4CFAD;
//     top: 85px;
//     right: 0;
//     display: none;
// `

function Header() {
    return (
        <header>
            <Nav>
                <Link to='/api/home'>
                    <Icon src={logo} alt="Logo Groupomania"/>
                    <LongIcon src={longlogo} alt="Logo Groupomania" />
                </Link>
                <div>
                    <FontAwesomeIcon icon={faSearch} size="lg" />
                    <Search placeholder='Search something...' />
                </div>
                <BtnCreate><FontAwesomeIcon icon={faPlus} /> Create</BtnCreate>
                <BtnCreateMobile><FontAwesomeIcon icon={faPlus} /></BtnCreateMobile>
                <BellMobile><FontAwesomeIcon icon={faBell} size="lg"/></BellMobile>
                <FontAwesomeIcon className='user' icon={faUserCircle} size="2x" />
                <div className='setting'>
                    <h3>@Lorem ipsum</h3>
                    <p><FontAwesomeIcon icon={faGear} /> Setting </p>
                    <p><FontAwesomeIcon icon={faPowerOff} /> Log out </p>
                </div>
            </Nav>
        </header>
    )
}

export default Header;