import { useNavigate,Link } from "react-router-dom";
import { auth, db } from "../firebase";
import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";
import './Home.scss';
import Tamagochi from "./Tamagochi";

const Home = () => {
    const navigate = useNavigate();
    const [level, setLevel] = useState();

    useEffect(() => {
        if(auth.currentUser){
            const Ref = ref(db, `users/${auth.currentUser.uid}/lv`)
            onValue(Ref, (snapshot) => {
                setLevel(snapshot.val());
            });
        }
    }, []);

    const onClick = () => {
        navigate('/login');
    }

    return (
        <div className="main">
        <div className="text-box">
          <div className="bigText">
            <div>함께 성장하는 성장형 공부서비스</div>
            <div className="logo-name"><div className="korean">다마고치 벤쿄</div><div className="japan">たまごっち勉強</div></div>
          </div>
          <div className="smallText">할일을 기록 , 관리하고 다마고치를 키워보세요</div>
          <div className="smallText">나만의 다이어리를 통해 자신을 성장시키세요</div>
          
          {auth.currentUser ? (
            <Link to="/tostudy" className="button">시작하기</Link>
          ) : (
            <Link to="/login" className="button">시작하기</Link>
          )}
        </div>
      </div>
    )
}
export default Home;