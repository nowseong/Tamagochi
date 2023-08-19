import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react"
import { MdAddCircleOutline } from 'react-icons/md';
import { Link } from "react-router-dom";
import { auth, db } from "../firebase";

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
        <>
            {diaryList.map(diary => {
                if (diary !== "empty") {
                    return (
                        <textarea readOnly>{diary.text}</textarea>
                    );
                }
            })}
            <div>
                <Link to="/writediary"><MdAddCircleOutline /></Link>
            </div>
            <Link to='/'>ToHome</Link>
        </>
    )
}

export default StudyDiary;