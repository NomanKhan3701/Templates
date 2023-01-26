import axios from 'axios';
import * as actionTypes from '../constants/actionTypes';
import { toast } from 'react-toastify';
// import jwt from 'jsonwebtoken';
// import cookieCutter from 'cookie-cutter';

const SERVER_URL = process.env.REACT_APP_API_URL;

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START,
	};
};

export const authSuccess = (token, user) => {
	localStorage.setItem("token", token);
	// localStorage.setItem("expiresIn", expiresIn);
	localStorage.setItem("user", JSON.stringify(user));
	return {
		type: actionTypes.AUTH_SUCCESS,
		token: token,
		user: user,
	};
};

export const logout = () => {
	localStorage.removeItem("token");
	localStorage.removeItem("expiresIn");
	localStorage.removeItem("user");

	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const authFail = (error, message) => {
	return {
		type: actionTypes.AUTH_FAIL,
		error: error,
		message: message,
	};
};

export const login = ({ email, password }) => {
	return (dispatch) => {
		dispatch(authStart());
		try {
			axios.post(`${SERVER_URL}/user/login`, {
				email: email,
				password: password,
			}).then((res) => {
				if (res.status >= 400) {
					toast.error(res.data.message);
					return;
				}
				const token = res.data.token;
				// const decoded = jwt.decode(token);
				// const user = {
				// 	id: decoded.id,
				// 	email: decoded.email,
				// 	username: decoded.username,
				// };
				const user = res.data.user;
				// const expiresIn = new Date(decoded.exp * 1000);

				dispatch(authSuccess(token, user));

			}).catch((err) => {
				toast.error(err.response.data.message);
				console.log(err.response.data.message);
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const signup = ({ email, password, userName, image }) => {
	return (dispatch) => {
		dispatch(authStart());
		try {
			axios.post(`${SERVER_URL}/user/signup`, {
				email: email,
				password: password,
				userName: userName,
				image: image,
			}).then((res) => {
				if (res.status >= 400) {
					toast.error(res.data.message);
					return;
				}
				const token = res.data.data.token;
				// const decoded = jwt.decode(token);
				// const user = {
				// 	id: decoded.id,
				// 	email: decoded.email,
				// 	username: decoded.username,
				// };
				const user = res.data.data.user;
				// const expiresIn = new Date(decoded.exp * 1000);
				localStorage.setItem("token", token);
				// localStorage.setItem("expiresIn", expiresIn);
				localStorage.setItem("user", JSON.stringify(user));
				dispatch(authSuccess(token, user));

			}).catch((err) => {
				toast.error(err.response.data.message);
				console.log(err.response.data.message);
			});
		} catch (err) {
			console.log(err);
		}
	};
};

export const authCheckState = () => {
	return (dispatch) => {
		const token = localStorage.getItem("token");
		// const expiresIn = localStorage.getItem("expiresIn");

		// if (new Date().getTime() > +expiresIn) {
		// 	dispatch(logout(token));
		// } else {
		const user = localStorage.getItem("user");
		if (user && user !== "undefined") {
			const parsedUser = JSON.parse(user);
			dispatch(authSuccess(token, parsedUser));
		}
		// }
	};
};