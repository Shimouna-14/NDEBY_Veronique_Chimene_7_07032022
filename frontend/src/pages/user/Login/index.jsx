import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import '../../../styles/style.css'
import logo from '../../../assets/icon.png'
import { Image, Sign, Icon, H1, H2, Form, Label, IconForm, Input, Button, StyledLink } from '../../../components/SignupLogin'
import Axios from 'axios'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState(false)

    const login = (data) => {
        Axios.post('http://localhost:8000/api/auth/login', {
            email: data.email,
            password: data.password
        })
        .then((response) => response.data)
        .then((response) => {
            let token = JSON.parse(localStorage.getItem("jwt_G"))
            token = []
            token.push(response.token)
            localStorage.setItem("jwt_G", JSON.stringify(token))

            let userData = JSON.parse(localStorage.getItem("userData"))
            let data = {userId: response.userId, username: response.username}
            userData = []
            userData.push(data)
            localStorage.setItem("userData", JSON.stringify(data))
        })
        .then(() => window.location = "/home")
        .catch(() => setError(true))
    }

    return(
        <Image>
            <Sign onSubmit={handleSubmit(login)}>
                <Icon src={logo} alt="Logo Groupomania" />
                <H1>Welcome back to Groupomania</H1>
                <H2>Login</H2>
                {error ? (<span>The email or password are incorrect</span>) : (null)}
                <Form>
                    <Label htmlFor="email">
                        Email :
                        <IconForm><FontAwesomeIcon role="img" icon={faEnvelope} size="xl"/></IconForm>
                        <Input type="email" placeholder="Email" id="email" {...register('email', { required: true, pattern: /^[\w.-]+@[\w.-]+\.[\w]+$/ })}/>
                        {errors.email && <span>Please to fill your email </span>}
                    </Label>

                    <Label htmlFor="password">
                        Password :
                        <IconForm><FontAwesomeIcon role="img" icon={faLock} size="xl"/></IconForm>
                        <Input type="password" placeholder="Password" id="password" {...register('password', { required: true, minLength: '8' })}/>
                        {errors.password && <span>Please to fill your password</span>}
                    </Label>
                    <Button className="borderBtn" type="submit">Connection</Button>
                </Form>
                <StyledLink to="/auth/signup">Create account</StyledLink>
            </Sign>
        </Image>
    )
};

export default Login;
