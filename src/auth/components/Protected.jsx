import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../AuthProvider';

export function Protected({ children }) {
	const { user } = useAuthContext();

	if (!user) {
		return <Navigate to='/login' />;
	}
	return children;
}
