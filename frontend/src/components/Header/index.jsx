import styled from 'styled-components'
import logo from '../../assets/icon.png'
import longlogo from '../../assets/icon-left-font-monochrome-white.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import '../../styles/style.css'
import { faSearch }  from '@fortawesome/free-solid-svg-icons'
import Params from '../Params'

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

function Header() {       
    return (
        <header>
            <Nav>
                <Link to='/home'>
                    <Icon src={logo} alt="Logo Groupomania"/>
                    <LongIcon src={longlogo} alt="Logo Groupomania" />
                </Link>
                <div>
                    <FontAwesomeIcon icon={faSearch} size="lg" />
                    <Search placeholder='Search something...' />
                </div>
                <Params />
            </Nav>
        </header>
    )
}

export default Header;