/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { UserHeader } from "../../../components/Header";
import { useEffect, useState } from "react";
import SettingContainer from "../../../components/Setting";
import { useParams } from "react-router-dom";

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: center;
`

function Setting() {
    let { id: userId } = useParams()
    let token = JSON.parse(localStorage.getItem("jwt_G"))
    const apiUrl = process.env.REACT_APP_API_URL; 

    const [profile, setProfile] = useState([])
    useEffect(() => {
        fetch(`${apiUrl}/profile/${userId}`, {
            headers: { 'Authorization': `token ${token}` }
        })
            .then((response) => response.json())
            .then((profile) => (setProfile(profile)))
            .catch(() => window.location = '/error')

    }, [userId])

    return(
        <>
            <UserHeader />
            <Main>
                {profile.map((profile) => (
                    <SettingContainer
                        key={profile.id}
                        username={profile.username}
                        bio={profile.bio}
                        email={profile.email}
                        date={profile.date}
                    />
                ))}
            </Main>
        </>
    )
};

export default Setting;