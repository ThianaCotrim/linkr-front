import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroller";
import PostCreation from "../components/PostsComponents/CreatePost";
import PostsList from "../components/PostsComponents/PostsList";
import HashtagsBox from "../constants/HashtagsBox";
import Header from "../constants/Header";

//import MorePostsScroller from "../components/PostsComponents/MorePostsScroller";

export default function TimelinePage() {
	return (
		<>
			<Header />
			<MainContainer>
				<TimelineContainer>
					<MainTitle>timeline</MainTitle>
					<PostCreation />
					<InfiniteScroll>
						<PostsList />
					</InfiniteScroll>
				</TimelineContainer>
				<HashtagsBox />
			</MainContainer>
		</>
	);
}
//<MorePostsScroller key={0} /> aplicar dentro de infinitescroll
const MainContainer = styled.div`
	min-height: 100vh;
	height: 100%;
	background: #333333;
	margin-top: 0px;
	display: flex;
	justify-content: center;
	@media (max-width: 710px) {
		width: 100vw;
	}
`;
const HeaderBox = styled.div`
	color: white;
	font-family: "Passion One", cursive;
	font-size: 49px;
	line-height: 54px;
`;

const TimelineContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const MainTitle = styled.p`
	font-family: "Oswald";
	font-weight: 700;
	font-size: 43px;
	line-height: 60px;
	color: #ffffff;
	width: 610px;
	text-align: left;
	margin-bottom: 40px;
	margin-top: 1rem;
	@media (max-width: 710px) {
		width: 100vw;
		margin-left: 1.5rem;
	}
`;
