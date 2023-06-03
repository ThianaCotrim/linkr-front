
import axios from 'axios'
import { useState } from 'react'
import styled from 'styled-components'


export default  function PostCreation (){
    const [form, setForm] = useState({link: "", description: ""})
    const [isPublishing, setIsPublishing] = useState(false)
    console.log(form)
    

    function handleForm(e) {
		setForm({ ...form, [e.target.name]: e.target.value });
	}
    function submitForm(e) {
        e.preventDefault()
        setIsPublishing(true)
        const token = localStorage.getItem("userToken")
        const url = `http://localhost:5000/posts`
        const headers = {headers: {authorization: `Bearer ${token}`}}
        axios
            .post(url, form, headers)
            .then((res) => {
                setIsPublishing(false)
                setForm({link: "", description: ""})
                document.location.reload(true)
            })
            .catch((err) => {
                setIsPublishing(false)
                alert(err.response.message)
            })
    }
    return (

        <CreatePostContainer data-test="publish-box">

            <ContainerProfilePhoto>
                <ProfilePhoto />
            </ContainerProfilePhoto>

            <Form onSubmit={submitForm}>
                
                <Title>What are you going to share today?</Title>
                <InputLink 
                    data-test="link" 
                    placeholder="http://..."
                    name="link"
                    value={form.link} 
                    onChange={handleForm}
                    required/>
                <InputDescription 
                    data-test="description" 
                    name="description"
                    placeholder="Awesome article about #javascript" 
                    value={form.description}
                    onChange={handleForm}/>

                <ButtonBox>
                    <Button 
                        disabled={isPublishing} 
                        type='submit' 
                        data-test="publish-btn"
                        >{isPublishing ? "Publishing..." : "Publish"}</Button>
                </ButtonBox>

            </Form>

        </CreatePostContainer>

    )

}

 const CreatePostContainer = styled.div`

    width: 610px;
    height: 210px;
    border-radius: 16px;
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
    @media (max-width: 710px){
        width: 100vw;
        justify-content: center;
        align-items: center;
        border-radius: 0px;
    }

`
 const ContainerProfilePhoto = styled.div`

    @media (max-width: 710px){
        display: none;
    }

`

const Form = styled.form`

width: 500px;
display: flex;
flex-direction: column;
margin-right: 1rem;
@media (max-width: 710px){
    width: 100vw;
    margin-left: 1rem;
}

`

 const ProfilePhoto = styled.img`

    width: 50px;
    height: 50px;
    border-radius: 26.5px;
    margin-top: 17px;
    margin-left: 17px;

`

 const Title = styled.p`

    width: 100%; 
    height: 40px;
    margin-top: 20px;
    font-family: "Lato";
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    color: #949494;
    @media (max-width: 710px){
        font-size: 17px;
        line-height: 20px;
        text-align: center;
    }

`
 const InputLink = styled.input`

    width: 100%;
    height: 30px;
    border-radius: 5px;
    border: hidden;
    font-family: "Lato";
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color: #949494;
    background-color: #EFEFEF;
    &::placeholder{
        padding-left: 10px;
    }
    @media (max-width: 710px){
        font-size: 13px;
        line-height: 15px;
    }

`
 const InputDescription = styled.textarea`

    width: 100%;
    height: 66px;
    border-radius: 5px;
    border: hidden;
    margin-top: 5px;
    font-family: "Lato";
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    color: #949494;
    background-color: #EFEFEF;
    &::placeholder{
        padding-left: 10px;
        padding-top: 5px;
        font-family: "Lato";
        font-weight: 300;
        font-size: 15px;
        line-height: 18px;
    }

`
 const ButtonBox = styled.div`

    width: 100%;
    height: 30px;
    display: flex;
    justify-content: flex-end;
    margin-top: 5px;

`
 const Button = styled.button`

    width: 110px;
    background: #1877F2;
    border-radius: 5px;
    border: hidden;
    color: #FFFFFF;
    font-family: "Lato";
    font-weight: 700;
    font-size: 14px;
    line-height: 16px;
    cursor: pointer;
    &:hover {
        filter: brightness(0.8);
    }
    &:active {
        filter: brightness(1.2);
    }
    
`

