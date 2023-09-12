import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useEffect } from "react";
import './Layout.scss';
import { CiMemoPad } from 'react-icons/ci';
import { PiNotePencil } from 'react-icons/pi';
import { BiUser } from 'react-icons/bi';

const Layout = ({ setIsLoggedIn }) => {
    const navigate = useNavigate();
    const logOut = () => {
        auth.signOut();
        setIsLoggedIn(false);
        window.location.reload();
        // location.reload();
        // console.log(auth.currentUser);
    };
    useEffect(() => {
        console.log(auth.currentUser);
        if(auth.currentUser) {
            setIsLoggedIn(true);
        }
        else {
            setIsLoggedIn(false);
        }
    }, []);

    const onClick = () => {
        alert('로그인하세요!');
    };

    return (
        <div className="homebody">
            <div className="header">
                    <h3 className="title" onClick={() => {navigate('/');}}><img src="images/logo0.svg"></img></h3>
                    <div className="navbar">
                        {auth.currentUser ?
                            <Link to="/profile" className="nav">
                                <BiUser />
                            </Link> : 
                            <span onClick={onClick} className="nav">
                                <BiUser />
                            </span>
                        }
                        {auth.currentUser ?
                            <Link to="/tostudy" className="nav">
                                <PiNotePencil />
                            </Link> : 
                            <span onClick={onClick} className="nav">
                                <PiNotePencil />
                            </span>
                        }
                        {auth.currentUser ? 
                            <Link to="/studydiary" className="nav">
                                <CiMemoPad />
                            </Link> : 
                            <span onClick={onClick} className="nav">
                                <CiMemoPad />
                            </span>}
                        
                    </div>
                    <div className="right">

                        {auth.currentUser ? 
                            <div onClick={logOut} className="logout">로그아웃</div> : 
                            <div className="loginsignup">
                                <Link to="/login" className="inner">로그인</Link>
                                <Link to="/signup" className="inner">회원가입</Link>
                            </div>}
                    </div>        
            </div>
            <div className="main">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;