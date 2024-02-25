import {useEffect, useState } from 'react';
import {logout} from './Auth';
import {useNavigate} from 'react-router-dom'
import {requestGet} from '../lib/Backend'

export default function MyPage() 
{
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const data = await requestGet('/api/user');
            setUser(data);
        })();
    },[]);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    }

    const data = () => user ? (<div>
        <h1>{user.name}</h1>
        <h2>{user.email}</h2>
    </div>) : (<p>Loading...</p>);

    return (
        <div>
            <h1>MyPage</h1>
            {user ? data() : (<h1>Loading...</h1>)}
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}