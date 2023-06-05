import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import hashtagContext from "../context/hashtag.context";

export default function HashtagsBox() {
	const [topHashtags, setTopHashtags] = useState([]);
	const PORT = "http://localhost:5000";
	const navigate = useNavigate();
	const { setHashtagsInfo, setHashtagTitle } = useContext(hashtagContext);
	useEffect(() => {
		axios
			.get(`${PORT}/hashtag`)
			.then((r) => {
				setTopHashtags(r.data);
			})
			.catch((e) => console.log(e));
	}, []);
	function specificPage(hashtag) {
		axios
			.get(`${PORT}/hashtag/${hashtag}`)
			.then((r) => {
				setHashtagsInfo(r.data);
				setHashtagTitle(hashtag);
				navigate(`/hashtag/${hashtag}`);
			})
			.catch((e) => console.log(e));
	}
	return (
		<HashtagsStyle>
			<div>
				<h1>trending</h1>
			</div>
			<ul>
				{topHashtags.length === 0 ? (
					<p>Sem trendings</p>
				) : (
					topHashtags.map((h, index) => (
						<li key={index} onClick={() => specificPage(h.hashtag)}>
							{" "}
							{h.hashtag}
						</li>
					))
				)}
			</ul>
		</HashtagsStyle>
	);
}
const HashtagsStyle = styled.div`
	position: absolute;
	width: 301px;
	height: 406px;
	right: 16.4%;
	top: 21.5%;
	background: #171717;
	border-radius: 16px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	div {
		width: 100%;
		height: 15%;
		border-bottom: 1px solid #484848;
		padding-left: 16px;
		box-sizing: border-box;
		h1 {
			font-style: normal;
			font-weight: 700;
			font-size: 27px;
			line-height: 40px;
			color: #ffffff;
			font-family: "Oswald", sans-serif;
		}
	}
	ul {
		display: flex;
		flex-direction: column;
		list-style-type: none;
		padding: 0;
		li {
			font-style: normal;
			font-weight: 700;
			margin-left: 16px;
			font-size: 19px;
			line-height: 23px;
			letter-spacing: 0.05em;
			color: #ffffff;
			font-family: "Lato", sans-serif;
			margin-bottom: 10px;
			::before {
				content: "#";
				margin-right: 2px;
			}
			cursor: pointer;
		}
		p {
			color: white;
			font-size: 15px;
			margin-left: 30%;
		}
	}
`;
