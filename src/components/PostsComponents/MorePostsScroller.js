import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";

export default function MorePostsScroller() {
	return (
		<MorePostsScrollerContainer>
			<TailSpin
				height="40"
				width="40"
				color="#6D6D6D"
				ariaLabel="tail-spin-loading"
				radius="0"
				wrapperStyle={{}}
				wrapperClass=""
				visible={true}
			/>

			<p>Loading more posts...</p>
		</MorePostsScrollerContainer>
	);
}

const MorePostsScrollerContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	margin: 50px 0;

	> p {
		font-family: "Lato";
		font-style: normal;
		font-weight: 400;
		font-size: 22px;
		line-height: 26px;
		letter-spacing: 0.05em;
		color: #6d6d6d;
		margin-top: 15px;
	}
`;
