import styled from "styled-components";

export default function singlePost (){

    return (

		<ContainerSinglePost>

			<Post data-test="post">

				<SideBar>

					<ProfilePhoto  />

          </SideBar>

				<ContentBox>

					<PostTop>

						<UserName data-test="username" ></UserName>

          </PostTop>

              <Description data-test="description"></Description>

        <ContainerMetadata data-test="link" >

					<MetadataBox>

							<MetaTitle></MetaTitle>
							<MetaDescrip></MetaDescrip>
							<MetaLink></MetaLink>

					</MetadataBox>

						<MetaPhoto />

					</ContainerMetadata>

				</ContentBox>

			</Post>

    </ContainerSinglePost>

         );

}

 const ContainerSinglePost = styled.div`

  width: 100%;
  height: fit-content;
  min-height: 275px;
  border-radius: 16px;
  margin-bottom: 15px;

`;

 const Post = styled.div`

  width: 100%;
  height: fit-content;
  min-height: 275px;
  border-radius: 16px;
  background: #171717;
  display: flex;
  justify-content: space-between;
  position: relative;
  z-index: 2;

`;

 const SideBar = styled.div`

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 17px;
    padding-right: 0px;

`

const PostTop = styled.div`
 
width: 100%;
height: 50px;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 5px;

`;

const ContentBox = styled.div`

  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 1rem;
  @media (max-width: 710px) {
    width: 80%;
    margin-right: 3rem;
  }

`;

 const ProfilePhoto = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 26.5px;
  margin-bottom: 20px;
`;

 

 const UserName = styled.p`
  height: 23px;
  font-family: "Lato";
  font-weight: 400;
  font-size: 19px;
  line-height: 22px;
  color: #ffffff;
  margin-top: 20px;

  :hover {
    cursor: pointer;
  }

`;

 const Description = styled.p`

  width: 100%;
  min-height: 45px;
  font-family: "Lato";
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: #b7b7b7;
  margin-top: 10px;

`;

 const ContainerMetadata = styled.div`

  width: 100%;
  height: 155px;
  background: #171717;
  border-radius: 11px;
  border: 1px solid #c4c4c4;
  margin-bottom: 20px;
  margin-top: 1rem;
  cursor: pointer;
  display: flex;

`;

 const MetadataBox = styled.div`

  width: 350px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;

 const MetaPhoto = styled.img`

  width: 150px;
  height: 100%;
  border-top-right-radius: 11px;
  border-bottom-right-radius: 11px;

`;

 const MetaTitle = styled.p`

  width: 300px;
  height: 40px;
  max-height: 40px;
  overflow: hidden;
  font-family: "Lato";
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #cecece;

`;

 const MetaDescrip = styled.p`

  width: 300px;
  height: 40px;
  max-height: 40px;
  overflow: hidden;
  font-family: "Lato";
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #9b9595;

`;

 const MetaLink = styled.p`

  width: 300px;
  height: 40px;
  max-height: 40px;
  overflow: hidden;
  font-family: "Lato";
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #cecece;
  margin-top: 0.5rem;
  
`;

 
