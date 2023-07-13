import { Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { Protected } from './auth/components/Protected';
import { MoviesPage, MyListPage, PopularPage, TVPage } from './contentPages';
import { Header } from './components';
import { useAuthContext } from './auth/AuthProvider';


export const ContentRoutes = () => {

	const { isLoading } = useAuthContext();

	return (
		<Container>
			{!isLoading && <Header />}
			<Routes>
				<Route path='/' element={<Protected><MoviesPage /></Protected>} />
				<Route path='tv' element={<Protected><TVPage /></Protected>} />
				<Route path='/movies' element={<Protected><MoviesPage /></Protected>} />
				<Route path='popular' element={<Protected><PopularPage /></Protected>} />
				<Route path='mylist' element={<Protected><MyListPage /></Protected>} />
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</Container>
	);
};


// STYLES

const Container = styled.div`
	width: 100%;
	min-height: 100vh;
	overflow-x: hidden;
	background-color: #0b0b0b;
	position: relative;
`;
