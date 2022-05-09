import styled from 'styled-components'
import imageBg from '../../assets/EntreprisePhoto.jpg'
import { Link } from 'react-router-dom'

export const Image = styled.div`
    background-image: url(${imageBg});
    background-size: cover;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    @media screen and (max-width: 1023px){
        justify-content: center;
        align-items: center;
    }
`

export const Sign = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(196, 207, 173, 0.7);
    width: 50%;
    height: 100vh;
    position: relative;
    right: 0%;
    z-index: 2;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 70%;
        height: 90vh;
    }
    @media screen and (max-width: 575px) {
        height: 90vh;
        width: 90%;
    }
`

export const Icon = styled.img`
    width: 70px;
    height: 70px;
`

export const H1 = styled.h1`
    font-size: 27px;
    margin-bottom: 0px;
    color: white;
    @media screen and (max-width: 575px) {
        font-size: 25px;
    }
`

export const H2 = styled.h2`
    margin-bottom: 0px;
    font-size: 22px;
    color: white;

`

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const Label = styled.label`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
`

export const Input = styled.input`
    border-top-style: none;
    border-left-style: none;
    border-right-style: none;
    border-bottom: 3px white solid;
    background-color: rgba(196, 207, 173, 0);
    width: 260px;
    height: 40px;
    padding-left: 40px;
`

export const IconForm = styled.span`
    position: relative;
    top: 36px;
    left: 5px;
    width: 25px;
`

export const Button = styled.button`
    width: 50%;
    height: 40px;
    background-color: white;
    border-radius: 15px;
    font-size: 16px;
    margin: 23px 0;
`
export const StyledLink = styled(Link)`
    font-size: 17px;
    color: white;
`