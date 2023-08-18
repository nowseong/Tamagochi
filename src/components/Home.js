import { useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const Home = ({ state, setState }) => {
    // useEffect(() => {
    //     if(auth.currentUser) {

    //     }
    // }, []);
    const logOut = () => {
        auth.signOut();
        setState({
            user: auth.currentUser,
            isLoggedIn: false
        });
    }

    return (
        <div>
            <header>
                <div>ToStudyList</div>
                <div>
                    {state.isLoggedIn ? <span onClick={logOut}>Logout</span> : <Link to="/login">Login</Link>}
                </div>
                <div><Link to="/signup">Sign Up</Link></div>
            </header>
            <main>
                <div><Link to="/tostudy">Today's Study List</Link></div>
                <div>Today's Study Diary</div>
            </main>
        </div>
    );
};

export default Home;