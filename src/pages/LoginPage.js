import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import hashtagContext from "../context/hashtag.context";

export default function LoginPage() {
	const [form, setForm] = useState({ email: "", password: "" });
	const [isSubmit, setIsSubmit] = useState(false);
	const navigate = useNavigate();
	const { setUserInfo } = useContext(hashtagContext);

	// useEffect(() => {
	//   const userToken = localStorage.getItem('userToken');
	//   if (userToken) {
	//     navigate('/timeline');
	//   }
	// }, []);

	function handleForm(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	function submitForm(e) {
		e.preventDefault();

		if (form.email === "" || form.password === "")
			return alert("Todos os campos são obrigatórios!");

		const url = "http://localhost:5000/singin";

		setIsSubmit(true);

		axios
			.post(url, form)
			.then((res) => {
				localStorage.setItem("userToken", res.data.token);
				setUserInfo(res.data.usersInfo);
				navigate("/timeline");
			})
			.catch((err) => {
				if (err.response.status === 401) {
					alert("E-mail ou senha incorretos!");
				} else {
					alert("Ocorreu um erro. Por favor, tente novamente.");
				}
			})
			.finally(() => {
				setIsSubmit(false);
			});
	}

	return (
		<Container>
			<LeftBox>
				<h1>linkr</h1>
				<h2>save, share and discover the best links on the web</h2>
			</LeftBox>
			<DirectBox>
				<Box>
					<form onSubmit={submitForm}>
						<Input
							placeholder="e-mail"
							type="email"
							name="email"
							value={form.email}
							onChange={handleForm}
						/>

						<Input
							placeholder="password"
							type="password"
							name="password"
							value={form.password}
							onChange={handleForm}
						/>
						<button type="submit" disabled={isSubmit}>
							{" "}
							{isSubmit ? "Enviando..." : "Log In"}
						</button>
					</form>
					<Link to="/registration">
						<h3>First time? Create an account!</h3>
					</Link>
				</Box>
			</DirectBox>
		</Container>
	);
}

const Container = styled.div`
	height: 1024px;
	display: flex;
	width: 100%;
	justify-content: center;
	height: 1024px;
	display: flex;
	width: 100%;
	justify-content: center;
	@media (max-width: 375px) {
		flex-direction: column;
		width: 100vw;
		height: 200vw;
	}
`;
const LeftBox = styled.div`
	background: #151515;
	box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
	width: 905px;
	height: 100%;
	background: #151515;
	box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
	width: 905px;
	height: 100%;
	@media (max-width: 375px) {
		width: 100vw;
		height: 60vw;
	}
	h1 {
		color: #ffffff;
		font-size: 106px;
		width: 233px;
		font-weight: 700;
		margin-top: 301px;
		margin-left: 144px;
		font-family: "Passion One", cursive;
		line-height: 116.71px;
		letter-spacing: 5px;
		margin-bottom: 0px;
		@media (max-width: 375px) {
			margin-top: 2vw;
			font-size: 50px;
		}
	}
	h2 {
		color: #ffffff;
		height: 128px;
		width: 442px;
		font-family: "Oswald", sans-serif;
		font-size: 43px;
		font-weight: 700;
		line-height: 63.73px;
		margin-left: 144px;
		margin-top: 0px;
		@media (max-width: 375px) {
			width: 55vw;
			margin-top: -10vw;
			font-size: 18px;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-left: 27vw;
		}
	}
`;
const DirectBox = styled.div`
	background-color: gray;
	width: 535px;
	height: 100%;
	display: flex;
	flex-direction: column;
	background-color: gray;
	width: 535px;
	height: 100%;
	display: flex;
	flex-direction: column;
	@media (max-width: 375px) {
		width: 100vw;
		height: 150vw;
	}
`;

const Input = styled.input`
	padding: 10px;
	border: 1px solid hsl(0, 0%, 80%);
	border-radius: 6px;
	margin-top: 13px;
	width: 429px;
	height: 30px;
	color: #9f9f9f;
	font-size: 20px;
	font-family: "Oswald", sans-serif;
	padding: 10px;
	border: 1px solid hsl(0, 0%, 80%);
	border-radius: 6px;
	margin-top: 13px;
	width: 429px;
	height: 30px;
	color: #9f9f9f;
	font-size: 20px;
	font-family: "Oswald", sans-serif;
	@media (max-width: 375px) {
		width: 70vw;
	}
`;
const Box = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	margin-top: 310px;
	flex-direction: column;
	@media (max-width: 375px) {
		margin-top: 10vw;
	}
	h3 {
		color: #ffffff;
		font-family: "Lato", sans-serif;
		font-size: 20px;
		font-weight: 400;
		line-height: 24px;
		text-decoration-line: underline;
		@media (max-width: 375px) {
			width: 75vw;
			font-size: 13px;
			margin-top: 5vw;
		}
	}
	button {
		background-color: #1877f2;
		width: 450px;
		height: 50px;
		padding: 10px;
		border: 1px solid gray;
		border-radius: 6px;
		margin-top: 13px;
		color: #ffffff;
		font-family: "Oswald", sans-serif;
		font-size: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 44px;
		@media (max-width: 375px) {
			width: 77vw;
		}
	}
`;
