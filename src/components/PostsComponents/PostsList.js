import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";

//import singlePost from "./SinglePost";//

export default function PostsList() {
	return (
		<PostListContainer>
			<ThreeDots
				height="80"
				width="80"
				radius="9"
				color="white"
				ariaLabel="three-dots-loading"
				wrapperStyle={{}}
				wrapperClassName=""
				visible={true}
			/>
			<MessageEmpty data-test="message">
				No posts found from your friends
			</MessageEmpty>{" "}
			:
			<MessageEmpty data-test="message">
				You don't follow anyone yet. Search for new friends!
			</MessageEmpty>
		</PostListContainer>
	);
}

// adicionar os singlepost ali encima

const PostListContainer = styled.div`
	width: 610px;
	display: flex;
	flex-direction: column;
	background: transparent;
	align-items: center;
	margin-top: 30px;
	z-index: 0;
	@media (max-width: 710px) {
		width: 100%;
	}
`;

const MessageEmpty = styled.p`
	width: 100%;
	text-align: center;
	color: #ffffff;
	font-family: "Lato";
	font-size: 30px;
	font-weight: 400;
`;
