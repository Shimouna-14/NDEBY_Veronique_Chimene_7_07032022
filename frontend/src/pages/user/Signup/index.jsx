import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import '../../../styles/style.css'
import logo from '../../../assets/icon.png'
import { Image, Sign, Icon, H1, H2, Form, Label, IconForm, Input, Button, StyledLink } from '../../../components/SignupLogin'
import Axios from 'axios'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

function Signup() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState(false)

    const login = (data) => {
        Axios.post('http://localhost:8000/api/auth/signup', {
            username: data.username,
            email: data.email,
            password: data.password
        })
        .then(() => window.location = "/auth/login")
        .catch(() => setError(true))
    }

    return(
        <Image>
            <Sign onSubmit={handleSubmit(login)}>
                <Icon src={logo} alt="Logo Groupomania" />
                <H1>Welcome to Groupomania</H1>
                <H2>Signup</H2>
                {error ? (
                    <span>The email or username is already used</span>
                ) : (null)}
                <Form>
                    <Label htmlFor="username"> 
                        <IconForm><FontAwesomeIcon icon={faUser} size="xl" /></IconForm> 
                        <Input type="text" placeholder="Username" {...register('username', { required: true, pattern: /^[A-Za-z][0-9A-Za-z '-]{2,}$/})}/>
                        {errors.username && <span>Please to fill the input</span>}
                    </Label>

                    <Label htmlFor="email"> 
                        <IconForm><FontAwesomeIcon icon={faEnvelope} size="xl"/></IconForm> 
                        <Input type="email" placeholder="Email" {...register('email', { required: true, pattern: /^[\w.-]+@[\w.-]+\.[\w]+$/ })}/>
                        {errors.email && <span>Please to fill a valid email</span>}
                    </Label>

                    <Label htmlFor="password"> 
                        <IconForm><FontAwesomeIcon icon={faLock} size="xl"/></IconForm> 
                        <Input type="password" placeholder="Password" {...register('password', { required: true, minLength: '8' })}/>
                        {errors.password && <span>The password must contain at least 8 characters</span>}
                    </Label>

                    <Button type="submit">Create</Button>
                </Form>
                <StyledLink to="/auth/login">Log in</StyledLink>
            </Sign>
        </Image>
    ) 
};

export default Signup;
