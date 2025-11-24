import { Link } from "react-router";

const NotFound = () => {
    return ( <div className="not-found">
        <h1>404!</h1>
        <p>Page you are looking for was not found!</p>
        <Link to='/'>← Go Home</Link>
    </div> );
}
 
export default NotFound;