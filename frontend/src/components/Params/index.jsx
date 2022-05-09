import styled from 'styled-components'
import { faUserCircle, faGear, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import '../../styles/style.css'
import { useState } from 'react'

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
    return isOpen ? (
        <div>
            <FontAwesomeIcon className='user' onClick={() => setIsOpen(false)} icon={faUserCircle} size="2x" />
            <SettingClose></SettingClose>
        </div>
    ) : (
        <div>
            <FontAwesomeIcon className='user' onClick={() => setIsOpen(true)} icon={faUserCircle} size="2x" />
            <SettingOpen>
                <Link to='/api/profile'><h3>@Lorem ipsum</h3></Link>
                <Link to='/api/setting'><p><FontAwesomeIcon icon={faGear} /> Setting </p></Link>
                <Link to='/api/auth/login'><p><FontAwesomeIcon icon={faPowerOff} /> Log out </p></Link>
            </SettingOpen>
        </div>
    )
}

export default Params