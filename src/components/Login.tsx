import {login} from './Auth'
import {useNavigate} from 'react-router-dom'

export default function Login() 
{
    const navigate = useNavigate();

    const handleLogin = async () => {
        await login();
        navigate('/');


    }

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Login</button>
        </div>
    )
}