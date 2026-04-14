import { AppRoutes } from '@/app/routes/routes';
import './call-to-action.css';
import { useNavigate } from 'react-router-dom';

export const CallToAction = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(AppRoutes.Constructor);
    }
    return (
        <div className="call-to-action">
            <button
                className='call-to-action__button'
                onClick={handleButtonClick}
            >
                Перейти в конструктор
            </button>
        </div>
    )
}