import styled from "styled-components";
import { UserHeader } from "../../../components/Header";
import { useEffect, useState } from "react";
import { ContainerPost } from '../../../components/Home'
import ProfileContainer from '../../../components/Profile'
import { useParams } from "react-router-dom";

const Main = styled.main`
    display: flex;
    align-items: center;
    flex-direction: column;
`

const Line = styled.div`
    border-bottom: 4px solid rgba(229, 229, 229, 0.4);
    width: 70%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    margin: 25px;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 80%;
    }
    @media screen and (max-width: 575px) {
        width: 85%;
    }
`

const AllPost = styled.div`
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    width: 50%;
    @media screen and (max-width: 1023px) and (min-width: 546px) {
        width: 60%;
    }
    @media screen and (max-width: 575px) {
        width: 80%;
    }
`
function Profile() {
    const { id: userId } = useParams()
    let token = JSON.parse(localStorage.getItem("jwt_G"))

    const [profile, setProfile] = useState([])
    useEffect(() => {
        fetch(`http://localhost:8000/api/profile/${userId}`, {
            headers: { 'Authorization': `token ${token}` }
        })
            .then((response) => response.json())
            .then((profile) => (setProfile(profile)))
            .catch((error) => console.log(error))
    }, [userId])

    const [postList, setPostList] = useState([])
    useEffect(() => {
        fetch(`http://localhost:8000/api/profile/status/${userId}`, {
            headers: { 'Authorization': `token ${token}` }
        })
            .then((response) => response.json())
            .then((postList) => (setPostList(postList)))
            .catch((error) => console.log(error))
    }, [userId])

    return(
        <>
            <UserHeader />
            <Main>
                {profile.map((profile) => (
                    <ProfileContainer
                        key={profile.id}
                        username={profile.username}
                        bio={profile.bio}
                    />
                ))}
                <Line/>

                <AllPost>
                    {postList.map((post) => (
                        <ContainerPost
                            key={post.id}
                            postId={post.id}
                            username={post.username}
                            userId={post.userId}
                            date={post.date}
                            picture={post.image}
                            description={post.description}
                        />
                    ))}
                </AllPost>
            </Main>
        </>
    )
};

export default Profile;
