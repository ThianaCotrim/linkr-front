import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Hashtags() {
	const [topHashtags, setTopHashtags] = useState([]);
	const PORT = "http://localhost:5000";
	const token = "";
	useEffect(() => {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		axios
			.get(`${PORT}/hashtag`, null, config)
			.then((r) => {
				console.log(r.data);
				setTopHashtags(r.data);
			})
			.catch((e) => console.log(e));
	}, [topHashtags]);
	return (
		<HashtagsStyle>
			<div>
				<h1>trending</h1>
			</div>
			<ul>
				{topHashtags.length === 0 ? (
					<p>Sem trendings</p>
				) : (
					topHashtags.map((h, index) => <li key={index}> {h.hashtags}</li>)
				)}
			</ul>
		</HashtagsStyle>
	);
}
const HashtagsStyle = styled.div`
	position: absolute;
	width: 301px;
	height: 406px;
	left: 877px;
	top: 232px;
	background: #171717;
	border-radius: 16px;
	box-sizing: border-box;
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
		}
		p {
			color: white;
			font-size: 15px;
			margin-left: 30%;
		}
	}
`;
