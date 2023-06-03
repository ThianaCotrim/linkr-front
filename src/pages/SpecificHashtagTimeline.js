import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import HashtagsBox from "../constants/HashtagsBox";
import { useContext, useState } from "react";
import hashtagContext from "../context/hashtag.context";

export default function SpecificHashtagTimeline() {
	const [logout, setLogout] = useState(false);
	const navigate = useNavigate();
	const { hashtagTitle, hashtagsInfo } = useContext(hashtagContext);
	console.log(hashtagsInfo);
	function exit() {
		navigate("/");
	}
	return (
		<>
			<Header>
				<p>linkr</p>
				{logout ? (
					<IoIosArrowUp
						onClick={() => setLogout(false)}
						style={{
							color: "white",
							marginLeft: "87%",
							width: "10%",
							height: "50%",
							cursor: "pointer",
						}}
					/>
				) : (
					<IoIosArrowDown
						onClick={() => setLogout(true)}
						style={{
							color: "white",
							marginLeft: "87%",
							width: "10%",
							height: "50%",
							cursor: "pointer",
						}}
					/>
				)}
				<img src={logo} alt="profileImage" />
			</Header>
			<Container>
				<div>
					<h1># {hashtagTitle}</h1>
					{hashtagsInfo.map((p) => (
						<PostDiv>
							<ProfileInfo>
								<img src={p.profileImage} alt="profileImage" />
								<AiOutlineHeart
									style={{
										color: "white",
										width: "70%",
										height: "10%",
										marginTop: "15%",
									}}
								/>
							</ProfileInfo>
							<Description>
								<p>{p.name}</p>
								<p>{p.description}</p>
								<p
									style={{ color: "white", marginLeft: "2%", marginTop: "2%" }}
								>
									{p.link}
								</p>
							</Description>
						</PostDiv>
					))}
				</div>
				{logout === true && (
					<LogoutDiv>
						<p onClick={exit}>Logout</p>
					</LogoutDiv>
				)}
				<HashtagsBox />
			</Container>
		</>
	);
}
const Container = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: space-evenly;
	background-color: #333333;
	box-sizing: border-box;
	overflow: hidden;
	h1 {
		font-family: "Oswald";
		font-style: normal;
		font-weight: 700;
		font-size: 43px;
		line-height: 64px;
		color: #ffffff;
		margin-top: 5%;
	}
`;
const PostDiv = styled.div`
	width: 611px;
	height: 276px;
	background: #171717;
	border-radius: 16px;
	display: flex;
	margin-top: 5%;
`;
const ProfileInfo = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	width: 10%;
	margin-left: 1%;
	align-items: center;
	img {
		width: 88%;
		height: 18%;
		border-radius: 100%;
		margin-top: 20%;
	}
`;
const Description = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	p:nth-child(1) {
		font-family: "Lato";
		font-style: normal;
		font-weight: 400;
		font-size: 19px;
		line-height: 23px;
		color: #ffffff;
		margin-left: 2%;
		margin-top: 2%;
	}
	p:nth-child(2) {
		font-family: "Lato";
		font-style: normal;
		font-weight: 400;
		font-size: 17px;
		line-height: 20px;
		color: #b7b7b7;
		margin-left: 2%;
		margin-top: 2%;
	}
`;
const Header = styled.div`
	height: 72px;
	background-color: #151515;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	position: relative;
	box-sizing: border-box;
	img {
		width: 2.6%;
		height: 70%;
		border-radius: 100%;
		margin-right: 1%;
	}
	p {
		color: white;
		font-family: "Passion One", cursive;
		font-size: 49px;
		line-height: 54px;
		margin-left: 1%;
	}
`;
const LogoutDiv = styled.div`
	background: #171717;
	border-radius: 0px 0px 20px 20px;
	width: 7%;
	height: 4%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	right: 0%;
	p {
		font-family: "Lato";
		font-style: normal;
		font-weight: 700;
		font-size: 17px;
		line-height: 20px;
		letter-spacing: 0.05em;
		color: #ffffff;
		cursor: pointer;
	}
`;
