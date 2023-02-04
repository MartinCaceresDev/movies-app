import { Route, Routes } from 'react-router-dom';
import { LoginPage } from './auth/pages/LoginPage';
import { RegisterPage } from './auth/pages/RegisterPage';
import { ContentRoutes } from './ContentRoutes';

export default function App() {
	return (
		<Routes>
			<Route path='login' element={<LoginPage />} />
			<Route path='register' element={<RegisterPage />} />
			<Route path='/*' element={<ContentRoutes />} />
		</Routes>
	);
}

