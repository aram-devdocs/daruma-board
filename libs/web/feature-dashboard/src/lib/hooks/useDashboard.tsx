
import { useRouter } from 'next/router';




export const useDashboard = () => {
    const router = useRouter();


    const onNewGoalClick = () => {
        router.push('/board/new');
    };
    const onBoardClick = () => {
        router.push('/board');
      };
      const onLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('localEmail');
        router.push('/login');
      };
    return {onNewGoalClick, onBoardClick, onLogout};
};


