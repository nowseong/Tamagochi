import { useState } from "react";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, update } from "firebase/database";
import {AiOutlineMail ,AiOutlineUser} from "react-icons/ai"
import {TbPassword} from "react-icons/tb"
import {LiaBirthdayCakeSolid} from "react-icons/lia"
import './Signup.scss';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [eggname, setEggname] = useState('');
    const [goal, setGoal] = useState('');

    const onChangeEmail = e => {
        setEmail(e.target.value);
    };

    const onChangePw = e => {
        setPassword(e.target.value);
    };
    const onChangeEggname = e => {
        setEggname(e.target.value);
    };
    const onChangeGoal = e => {
        setGoal(e.target.value);
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
                    diaries: ["empty"],
                    eggname,
                    goal,
                    lv: 1
                }
            };
            update(usersRef, newUser);
            navigate('/');
            console.log(CreatedUser);   
        } catch (e) {
            switch (e.code) {
                case 'auth/weak-password':
                    alert('비밀번호는 6자리 이상이어야 합니다');
                    break;
                case 'auth/invalid-email':
                    alert('잘못된 이메일 주소입니다');
                    break;
                case 'auth/email-already-in-use':
                    alert('이미 가입되어 있는 계정입니다');
                    break;
                default: alert("오류가 발생하였습니다.");
            }
        }
    }

    return (
        <div className="loginbody">
            <div className="box">
                <div className="bigText">SignUp</div>
                <div className="innerbox">
                    <div className="text">
                        <AiOutlineMail size='50px' color="#E38F9F"/> 
                        <input placeholder="이메일 ex.2006@gmail.com"className="input" type="text" onChange={onChangeEmail} /></div>
                    <div className="text">
                        <TbPassword size='50px' color="#E38F9F"/> 
                        <input placeholder="비밀번호"className="input" type="password" onChange={onChangePw} /></div>
                    <div className="text">
                        <AiOutlineUser size='50px' color="#E38F9F"/> 
                        <input placeholder="알 닉네임"className="input" type="text" onChange={onChangeEggname} /></div>
                    <div className="text">
                        <LiaBirthdayCakeSolid size='50px' color="#E38F9F"/> 
                        <input placeholder="희망목표"className="input" type="text" onChange={onChangeGoal} /></div>
                </div>
                <div onClick={register} className="btn">SignUp</div>
            </div>
        </div>
    );
};

export default Signup;