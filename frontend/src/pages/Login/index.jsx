import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import '../../styles/style.css'
import logo from '../../assets/icon.png'
import { Image, Sign, Icon, H1, H2, Form, Label, IconForm, Input, Button, StyledLink } from '../../components/SignupLogin'

function Login() {
    return(
        <Image>
            <Sign>
                <Icon src={logo} alt="Logo Groupomania" />
                <H1>Welcome back to Groupomania</H1>
                <H2>Login</H2>
                <Form>

                    <Label htmlFor="email"> 
                        <IconForm><FontAwesomeIcon icon={faEnvelope} size="xl"/></IconForm> 
                        <Input type="email" name="email" id="email" placeholder="Email" required/>
                    </Label>

                    <Label htmlFor="password"> 
                        <IconForm><FontAwesomeIcon icon={faLock} size="xl"/></IconForm> 
                        <Input type="password" name="password" id="password" placeholder="Password" required/>
                    </Label>                    
                    <Button>Connexion</Button>
                </Form>
                <StyledLink to="/api/auth/signup">Create account</StyledLink>
            </Sign>
        </Image>
    )
}

export default Login;
