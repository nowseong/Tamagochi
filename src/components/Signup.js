import { useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, update } from "firebase/database";
import './Login.scss';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onChangePw = e => {
        setPassword(e.target.value);
    };

    const register = async () => {
        try {
            const CreatedUser = await createUserWithEmailAndPassword(auth, email, password);
            const useremail = CreatedUser.user.email;
            const usersRef = ref(db, 'users');
            const newUser = {
                [CreatedUser.user.uid]: {
                    useremail: useremail,
                    todos: ["empty"],
                    diaries: ["empty"]
                }
            };
            update(usersRef, newUser);
            navigate('/');
            console.log(CreatedUser);   
        } catch (e) {
            alert(e.message);
        }
    }

    return (
        <div className="body">
            <div className="box">
                <h1 className="title">SIGN UP</h1>
                <div className="innerbox">
                    <p className="text">email</p>
                    <input className="input" type="text" onChange={onChangeEmail} />
                </div>
                <div className="innerbox">
                    <p className="text">password</p>
                    <input className="input" type="password" onChange={onChangePw} />
                </div>
                <button onClick={register} className="btn">Sign Up</button>
            </div>
        </div>
    );
};

export default Signup;