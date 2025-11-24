import { Link } from "react-router";

const Header = () => {
    return ( 
        <div className="top-nav">
            <div><h1>Crypto Pulse 💗</h1></div>
            <div>
                <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
            </div>
        </div>
     );
}
 
export default Header;