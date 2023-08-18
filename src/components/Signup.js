import { useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { push, ref, set, update } from "firebase/database";

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
                    todos: ["empty"]
                }
            };
            update(usersRef, newUser);
            navigate('/login');
            console.log(CreatedUser);   
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
                <button onClick={register}>Sign Up</button>
            </div>
        </div>
    );
};

export default Signup;