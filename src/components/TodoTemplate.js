// import { useNavigate } from 'react-router-dom';
import './TodoTemplate.scss';

const TodoTemplate = ({ children }) => {
    // const navigate = useNavigate();
    return (
        <div className='TodoTemplate'>
            <div className='app-title'>오늘의 공부</div>
            <div className='content'>{children}</div>
            {/* <button onClick={navigate('/')} className='ToHome'>홈으로</button> */}
        </div>
    );
};

export default TodoTemplate;