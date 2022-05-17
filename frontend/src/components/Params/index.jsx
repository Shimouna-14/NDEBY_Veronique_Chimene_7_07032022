import styled from 'styled-components'
import { faUserCircle, faGear, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import '../../styles/style.css'
import { useState } from 'react'
import Axios from 'axios'

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

function Params() {
    const [isOpen, setIsOpen] = useState(true)
    let userData = JSON.parse(localStorage.getItem("userData"))

    const logout = () => {
        Axios.get('http://localhost:8000/api/auth/logout')
        .then(() => localStorage.clear() )
        .then(() => window.location = "/auth/login")
        .catch((error) => console.log(error))
    }
    
    return isOpen ? (
        <div>
            <FontAwesomeIcon className='user' onClick={() => setIsOpen(false)} icon={faUserCircle} size="2x" />
            <SettingClose/>
        </div>
    ) : (
        <div>
            <FontAwesomeIcon className='user' onClick={() => setIsOpen(true)} icon={faUserCircle} size="2x" />
            <SettingOpen>
                <Link to={`/profile/${userData.username}`}><h3>@{userData.username}</h3></Link>
                <Link to={`/setting/${userData.username}`}><p><FontAwesomeIcon icon={faGear} /> Setting </p></Link>
                <Link onClick={logout} to="/auth/login"><p><FontAwesomeIcon icon={faPowerOff} /> Log out </p></Link>
            </SettingOpen>
        </div>
    )
}

export default Params;