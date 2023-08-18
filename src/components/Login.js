import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

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
            alert(e.message);
        }
    }

    return (
        <div>
            <div>
                <div className="signup-email">
                    <p>email</p>
                    <input type="text" onChange={onChangeEmail} />
                </div>
                <div className="signup-password">
                    <p>password</p>
                    <input type="password" onChange={onChangePw} />
                </div>
                <button onClick={login}>Login</button>
            </div>
        </div>
    );
};

export default Login;