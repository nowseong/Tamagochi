import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect } from "react";

const Home = () => {
    const logOut = () => {
        auth.signOut();
        window.location.reload();
        // location.reload();
        // console.log(auth.currentUser);
    };
    useEffect(() => {
        console.log(auth.currentUser);
    })

    const onClick = () => {
        alert('로그인하세요!');
    }

    return (
        <div>
            <header>
                <div>ToStudyList</div>
                {auth.currentUser ? <span onClick={logOut}>Logout</span> : <Link to="/login">Login</Link>}
                <div><Link to="/signup">Sign Up</Link></div>
            </header>
            <main>
                {auth.currentUser ? <Link to="/tostudy">Today's Study List</Link> : <span onClick={onClick}>Today's Study List</span>}
                <div>Today's Study Diary</div>
            </main>
        </div>
    );
};

export default Home;