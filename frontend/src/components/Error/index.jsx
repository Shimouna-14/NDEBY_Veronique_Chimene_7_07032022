import illustration from '../../assets/page_not_found.svg'
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Img = styled.img`
    margin: 20px 0 0 20px;
    width: auto;
    height: 450px;
`

const H1 = styled.h1`
    color: #3f3d56;
`

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #3f3d56;
    width: 200px;
`

const P = styled.p`
    font-size: 22px;
    color: #3f3d56;
    margin: 0;
`

export function UserError() {
    return(
        <Main>
            <Img src={illustration} alt="Moon"/>
            <H1>This page is missing or the link is incorrect</H1>
            <StyledLink to='/home'>
                <P>Back to the home</P>
                <FontAwesomeIcon icon={faArrowRight} />
            </StyledLink>
        </Main>
    )
};


export function AdminError() {
    return(
        <Main>
            <Img src={illustration} alt="Moon"/>
            <H1>This page is missing or the link is incorrect</H1>
            <StyledLink to='/admin/home'>
                <P>Back to the home</P>
                <FontAwesomeIcon icon={faArrowRight} />
            </StyledLink>
        </Main>
    )
};

