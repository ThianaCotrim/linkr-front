import styled from "styled-components";
import { AiOutlineHeart } from "react-icons/ai";
import HashtagsBox from "../constants/HashtagsBox";
import { useContext } from "react";
import hashtagContext from "../context/hashtag.context";
import Header from "../constants/Header";

export default function SpecificHashtagTimeline() {
	const { hashtagTitle, hashtagsInfo } = useContext(hashtagContext);
	return (
		<>
			<Header />
			<Container>
				<div>
					<h1># {hashtagTitle}</h1>
					{hashtagsInfo.map((p, index) => (
						<PostDiv key={index}>
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
