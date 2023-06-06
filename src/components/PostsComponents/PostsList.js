import axios from "axios";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import styled from "styled-components";
import SinglePost from "./SinglePost.js";

//import singlePost from "./SinglePost";//

export default function PostsList() {
	const [postList, setPostList] = useState(null);
	const token = localStorage.getItem("userToken");
	useEffect(() => {
		const url = `http://localhost:5000/posts`;
		const headers = { headers: { authorization: `Bearer ${token}` } };
		axios
			.get(url, headers)
			.then((res) => setPostList(res.data))
			.catch((err) =>
				alert(
					"An error occured while trying to fetch the posts, please refresh the page"
				)
			);
	}, []);
	return (
		<PostListContainer>
			{postList ? (
				postList.length === 0 ? (
					<MessageEmpty>There are no posts yet</MessageEmpty>
				) : (
					postList.map((post, index) => {
						return <SinglePost key={index} post={post} />;
					})
				)
			) : (
				<>
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
				</>
			)}
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
