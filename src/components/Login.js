import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import './Login.scss';
import {AiOutlineMail} from "react-icons/ai"
import {TbPassword} from "react-icons/tb"

const Login = () => {
    const navigate = useNavigate('/');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onChangePw = e => {
        setPassword(e.target.value);
    };

    // const login = () => {
    //     setPersistence(auth, browserLocalPersistence)
    //         .then(() => {
    //             const curUserInfo = signInWithEmailAndPassword(auth, email, password);
    //             setState({
    //                 user: curUserInfo.user,
    //                 isLoggedIn: true
    //             });
    //         })
    //         .then(() => {
    //             navigate('/');
    //         })
    //         .catch((error) => {
    //             alert(error.message);
    //         })
    // }
    const login = async () => {
        try {
            const curUserInfo = signInWithEmailAndPassword(auth, email, password);
            console.log((await curUserInfo).user);
            navigate('/');
        } catch (e) {
            alert("로그인 할 수 없습니다.");
        }
    }
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            login(); // Enter 키를 누르면 로그인 함수 호출
        }
    };
    return (
        <div className="loginbody">
        <div className="loginbox">
            <h1 className="title">LO_GIN</h1>
                <div className="innerbox">
                <div className="innercontent"><AiOutlineMail size='50px' color="#E38F9F"/><input placeholder="Email ex: 2006@gmail.com"className="input" type="text" onChange={onChangeEmail} /></div>
                <div className="innercontent"><TbPassword size='50px' color="#E38F9F"/><input placeholder="Password"className="input" type="password" onChange={onChangePw} onKeyPress={handleKeyPress}/></div>
                </div>
            <button onClick={login} className="btn">LO_GIN</button>
        </div>
    </div>  );
};

export default Login;