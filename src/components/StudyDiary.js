import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react"
import { MdAddCircleOutline } from 'react-icons/md';
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";
import './StudyDiary.scss';

const StudyDiary = () => {
    const [diaryList, setDiaryList] = useState([]);
    useEffect(() => {
        const diariesRef = ref(db, `users/${auth.currentUser.uid}/diaries`);
        onValue(diariesRef, (snapshot) => {
            const data = snapshot.val();
            setDiaryList(data);
        })
    }, []);

    return (
        <div className="studydiary-body">
            {diaryList.map(diary => {
                if (diary !== "empty") {
                    return (
                        <textarea readOnly className="diary" key={diary.id}>{diary.text}</textarea>
                    );
                }
            })}
            <Link to="/writediary" className="towrite"><MdAddCircleOutline /></Link>
            <Link to='/' className="studydiary-tohome">To Home</Link>
        </div>
    )
}

export default StudyDiary;