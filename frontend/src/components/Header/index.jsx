import styled from 'styled-components'
import logo from '../../assets/icon.png'
import longlogo from '../../assets/icon-left-font-monochrome-white.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUserCircle, faGear, faPowerOff, faUserTie }  from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import '../../styles/style.css'
import { useState } from 'react'
import Axios from 'axios'

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

const AdminNav = styled.nav`
    background-color: #35446e;
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

const SettingClose = styled.div`
    display: none;
`

const SettingOpen = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 219px;
    box-shadow: 0px 13px 16px 5px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    background-color: #C4CFAD;
    top: 85px;
    right: 0;
`

const Setting = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100px;
`

const Logout = styled(Link)`
    display: flex;
    flex-direction: column;
`
const apiUrl = process.env.REACT_APP_API_URL; 

export function UserHeader() {
    const [isOpen, setIsOpen] = useState(true)
    let userData = JSON.parse(localStorage.getItem("userData"))

    const logout = () => {
        Axios.get(`${apiUrl}/auth/logout`)
        .then(() => localStorage.clear() )
        .then(() => window.location = "/auth/login")
        .catch((error) => console.log(error))
    }
    return (
        <header>
            <Nav>
                <Link to='/home'>
                    <Icon src={logo} alt="Logo Groupomania"/>
                    <LongIcon src={longlogo} alt="Logo Groupomania" />
                </Link>
                <label htmlFor='search'>
                    Search
                    <FontAwesomeIcon aria-hidden="false" role="img" icon={faSearch} size="lg" />
                    <Search id='search' placeholder='Search something...' />
                </label>
                {isOpen ? (
                    <>
                        <FontAwesomeIcon aria-hidden="false" role="img" className='user'
                        tabIndex="0 "onClick={() => setIsOpen(false)} icon={faUserCircle} size="2x" />
                        <SettingClose />
                    </>
                ) : (
                    <>
                        <FontAwesomeIcon aria-hidden="false" role="img" className='user'
                        tabIndex="0" onClick={() => setIsOpen(true)} icon={faUserCircle} size="2x" />
                        <SettingOpen>
                            <Link to={`/profile/${userData.userId}`}><h3>@{userData.username}</h3></Link>
                            <Link to={`/setting/${userData.userId}`}><p><FontAwesomeIcon aria-hidden="false" role="img" icon={faGear} /> Setting </p></Link>
                            <Link onClick={logout} to="/auth/login"><p><FontAwesomeIcon aria-hidden="false" role="img" icon={faPowerOff} /> Log out </p></Link>
                        </SettingOpen>
                    </>
                )}
            </Nav>
        </header>
    )
};

export function AdminHeader() {
    const logout = () => {
        Axios.get(`${apiUrl}/admin/logout`)
        .then(() => localStorage.clear() )
        .then(() => window.location = "/admin/auth/login")
        .catch((error) => console.log(error))
    }

    return (
        <header>
            <AdminNav>
                <Link to='/admin/home'>
                    <Icon src={logo} alt="Logo Groupomania"/>
                    <LongIcon src={longlogo} alt="Logo Groupomania" />
                </Link>
                <label htmlFor='search' className='whiteTxt'>
                    Search
                    <FontAwesomeIcon aria-hidden="false" role="img"  icon={faSearch} size="lg" />
                    <Search id='search' placeholder='Search something...' />
                </label>
                <Setting>
                    <FontAwesomeIcon aria-hidden="false" role="img" icon={faUserTie} size="2x" />
                    <Logout onClick={logout} to="/auth/admin/login" className='whiteTxt'>
                        <FontAwesomeIcon aria-hidden="false" role="img" className='whiteTxt' icon={faPowerOff} size="xl" />
                        <p className='paddingUsernameDate'>Log out</p>
                    </Logout>
                </Setting>
            </AdminNav>
        </header>
    )
};
