
import styled from 'styled-components';
import { FiSend } from 'react-icons/fi';
import { useEffect , useContext , useState } from 'react';
import hashtagContext from '../../context/hashtag.context';
import { ThreeDots } from 'react-loader-spinner';
import api from '../../constants/api';


export default function CommentBox({ image, postId, setCommentCounter }) {
  
   const [singleComment, setSingleComment] = useState([]);
   const [commentsList, setNewComment] = useState('');
   const [loading, setLoading] = useState(false);
   const { commentInfo } = useContext(hashtagContext);
 


   async function getComments() {


       try{


           const { configuration } = await api.get(`posts/${postId}/comments`, commentInfo);
           setSingleComment(configuration || []);
           setLoading(false);


       } catch (error) {


           console.log(error);
           setLoading(false);


       }


   }


   async function handleClick (e) {


       e.preventDefault();


       try{


           setNewComment('');
           await api.post(`/posts/${postId}/comments`, { comment: commentsList }, commentInfo);
           setCommentCounter(singleComment.length + 1);
           getComments();


       } catch (error){


           console.log(error);


       }
      
   }




   useEffect(() => {


       setLoading(true);
       getComments();


   }, []);




  


   return (
       <CommentsContainer data-test="comment-box">


           { loading ?


               <ThreeDots
                       height="80"
                       width="80"
                       radius="9"
                       color="white"
                       ariaLabel="three-dots-loading"
                       wrapperStyle={{}}
                       wrapperClassName=""
                       visible={true}/> :
                       singleComment.map((c, i) =>


                   <SingleCommentContainer key={i} data-test="comment" >


                       <ProfilePicture src={c.image} />


                       <div>
                           <ProfileName>
                               {c.name}
                               <UserFollow>{c.owner ? "• post's author" : c.following ? "• following" :  ''}</UserFollow>
                           </ProfileName>


                           <Comment>{c.comment}</Comment>


                       </div>


                   </SingleCommentContainer>


               )


           }


           <PersonalComment>


               <ProfilePicture src={image} alt="" />


               <form onSubmit={handleClick}>
                  
                   <input data-test="comment-input" type='text' placeholder="write a comment..." value={commentsList} onChange={(e) => setNewComment(e.target.value)} required={true} maxLength='150' />


                   <Button data-test="comment-submit" type="Submit"  >


                       <FiSend />


                   </Button>


               </form>


           </PersonalComment>


       </CommentsContainer>


   );
  
}


const CommentsContainer = styled.div`
 width: 100%;
 height: fit-content;
 background-color: #1E1E1E;
 border-radius: 16px;
 margin-top: -25px;
 padding: 25px;
 display: flex;
 flex-direction: column;
 align-items: center;
`;


const SingleCommentContainer = styled.div`
 width: 100%;
 height: fit-content;
 display: flex;
 align-items: center;
 padding: 15px 0;
 box-shadow: 0px 1px #353535;


 div{
   width: 100%;
   min-height: 17px;
   height: fit-content;
   display: flex;
   flex-direction: column;
   justify-content: center;
 }


 p{
   min-height: 17px;
   font-size: 14px;
   font-family: 'lato';
 }
`;


const ProfilePicture = styled.img`
   width: 39px;
   height: 39px;
   border-radius: 26.5px;
   margin-right: 14px;
   align-self: flex-start;
`;


const ProfileName = styled.p`
 font-weight: 700;
 color: white;
`;


const UserFollow = styled.span`
 font-weight: 400;
 color: #565656;
 margin-left: 5px;
`;


const Comment = styled.p`
 font-weight: 400;
 color: #ACACAC;
`;




const PersonalComment = styled.div`
 width: 100%;
 height: fit-content;
 display: flex;
 align-items: center;
 justify-content: center;
 margin-top: 25px;


 form{
   width: 100%;
   height: 39px;
   background-color: #252525;
   border-radius: 8px;
   display: flex;
   justify-content: center;
   align-items: center;
 }


 input[type="text"] {
   width: 100%;
   height: 39px;
   padding: 11px 15px;
   background-color: transparent;
   color: #ACACAC;
   border: none;
   border-radius: 8px;
   font-family: 'lato';
   font-size: 14px;


   :focus{
     outline: none;
   }
 }
`;


const Button = styled.button`
   width: 45px;
   height: 39px;
   padding: 11px 15px;
   cursor: pointer;
   border-radius: 8px;
   background-color: transparent;
   border: none;


   svg{
       width: 100%;
       height: 100%;
       color: #F3F3F3;
   }


   :hover{
       background-color: #3d3d3d;
   }
`;
