import { onValue, ref, set } from "firebase/database";
import { useEffect, useRef, useState } from "react"
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

const WriteDiary = () => {
    const navigate = useNavigate();
    const [diaries, setDiaries] = useState([]);
    const [text, setText] = useState("");
    const date = useRef(new Date());
    
    useEffect(() => {
        const diariesRef = ref(db, `users/${auth.currentUser.uid}/diaries`);
        onValue(diariesRef, (snapshot) => {
            const data = snapshot.val();
            setDiaries(data);
        })
    }, []);

    const onChange = (e) => {
        setText(e.target.value);
    }

    const onClick = () => {
        date.current = new Date();
        const id = date.current.getTime();
        const diary = {
            id,
            text
        };
        set(ref(db, `users/${auth.currentUser.uid}/diaries`), diaries.concat(diary));
        navigate('/studydiary');
    }

    return (
        <div>
            <textarea onChange={onChange} />
            <button onClick={onClick}>추가</button>
        </div>
    )
}

export default WriteDiary;