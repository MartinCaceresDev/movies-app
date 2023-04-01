import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { Spinner } from '@chakra-ui/react'
import { useAuthContext } from '../AuthProvider';

export function Protected({ children }) {
	const { user, isLoading } = useAuthContext();

	if (isLoading) {
		return (
			<Loading>
				<Spinner color='red.500' size='lg' />
			</Loading>
		)
	}
	if (!user) {
		return <Navigate to='/login' />;
	}
	return children;
}


// STYLES

const Loading = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background: #0b0b0b;
	height: 100vh;
	width: 100%;
`;

