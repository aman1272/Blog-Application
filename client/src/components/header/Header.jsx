
import { AppBar, Toolbar, styled} from '@mui/material';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';


const Component = styled(AppBar)`
    background: #202942;
    color: white;
`;

const Container = styled(Toolbar)`
    justify-content: space-between;
    & > a {
        padding: 20px;
        color: #ffffff;
        text-decoration: none;
    }
`

const Header = () => {

    const navigate = useNavigate();

    const logout = async () => navigate('/account');

    return (
        <>
            <Component>
                <Container>
                    <Link to='/'>Blog-Shala</Link>
                    <Link to='/'>HOME</Link>
                    <Link to='/login'>LOGOUT</Link>
                </Container>
            </Component>
        </>
    )
}

export default Header;