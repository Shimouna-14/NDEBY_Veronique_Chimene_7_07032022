import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUserTie } from '@fortawesome/free-solid-svg-icons'
import '../../../styles/style.css'
import logo from '../../../assets/icon.png'
import { Image, LoginAdmin, Icon, H1, H2, Form, Label, IconForm, Input, Button } from '../../../components/SignupLogin'
import Axios from 'axios'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState(false)

    const sign = (data) => {
        Axios.post('http://localhost:8000/api/admin/auth/login', {
            email: data.email,
            password: data.password
        })
        .then((response) => response.data)
        .then((response) => {
            let token = JSON.parse(localStorage.getItem("jwt_G_admin"))
            token = []
            token.push(response.token)
            localStorage.setItem("jwt_G_admin", JSON.stringify(token))

            let userData = JSON.parse(localStorage.getItem("adminData"))
            let data = {adminId: response.adminId, username: response.username}
            userData = []
            userData.push(data)
            localStorage.setItem("adminData", JSON.stringify(data))
        })
        .then(() => window.location = "/admin/home")
        .catch(() => setError(true))
    }

    return(
        <Image>
            <LoginAdmin onSubmit={handleSubmit(sign)}>
                <Icon src={logo} alt="Logo Groupomania" />
                <H1>Welcome back to Groupomania</H1>
                <H2>Login - Admin</H2>
                <FontAwesomeIcon className='adminLogin' icon={faUserTie} size="2x"/>
                {error ? (
                    <span>The email or password are incorrect</span>
                ) : (null)}
                <Form>
                    <Label htmlFor="email">
                        <IconForm><FontAwesomeIcon icon={faEnvelope} size="xl"/></IconForm>
                        <Input type="email" placeholder="Email" {...register('email', { required: true, pattern: /^[\w.-]+@[\w.-]+\.[\w]+$/ })}/>
                        {errors.email && <span>Please to fill your email </span>}
                    </Label>

                    <Label htmlFor="password">
                        <IconForm><FontAwesomeIcon icon={faLock} size="xl"/></IconForm>
                        <Input type="password" placeholder="Password" {...register('password', { required: true, minLength: '8' })}/>
                        {errors.password && <span>Please to fill your password</span>}
                    </Label>
                    <Button type="submit">Connexion</Button>
                </Form>
            </LoginAdmin>
        </Image>
    )
};

export default Login;