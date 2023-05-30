import { useState } from "react";
import { Form, Link } from "react-router-dom";
import styled from "styled-components";

export default function RegistrationPage(){

    const [form, setForm] = useState({email: "", password: "", name:"", profileImage: ""})

    function handleForm(e){
        setForm({...form, [e.target.name]: e.target.value})
    }

    function submitForm(e){
        e.preventDefault()
        // continuar aqui
    }

    return (
        <Container>
          <LeftBox>
            <h1>linkr</h1>
            <h2>save, share and discover the best links on the web</h2>
          </LeftBox>
          <DirectBox>
            <Box>
            <Form onSubmit={submitForm}>
              <Input 
              placeholder="e-mail" 
              type="email" 
              autoComplete="email"
              required
              name="email"
              value={form.email}
              onChange={handleForm}
              />
              <Input 
              placeholder="password" 
              type="password"
              required
              name="password"
              value={form.password}
              onChange={handleForm}
              />
              <Input 
              placeholder="username" 
              type="text" 
              required
              name="name"
              value={form.name}
              onChange={handleForm}
              />
              <Input 
              placeholder="picture url" 
              type="url"
              required
              name="profileImage"
              value={form.profileImage}
              onChange={handleForm}
              />
              <button type="submit">Sing Up</button>
              </Form>

              <Link to="/">
              <h3>Switch back to log in</h3>
              </Link>   
            </Box>
          </DirectBox>
        </Container>
    )
}

const Container = styled.div`
height: 1024px;
display: flex;
width: 100%;
justify-content: center;
`

const LeftBox = styled.div`
background: #151515;
box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
width: 905px;
height: 100%;

h1{
  color: #FFFFFF;
  font-size: 106px;
  width: 233px;
  font-weight: 700;
  margin-top: 301px;
  margin-left: 144px;
  font-family: 'Passion One', cursive;
  line-height: 116.71px;
  letter-spacing: 5px;
  margin-bottom: 0px;
}

h2{
  color: #FFFFFF;
  height: 128px;
  width: 442px;
  font-family: 'Oswald', sans-serif;
  font-size: 43px;
  font-weight: 700;
  line-height: 63.73px;
  margin-left: 144px;
  margin-top: 0px;
}
`

const DirectBox = styled.div`
  background-color: gray;
  width: 535px;
  height: 100%;
  display:flex;
  flex-direction: column;
`

const Input = styled.input`
  padding: 10px;
  border: 1px solid hsl(0, 0%, 80%);
  border-radius: 6px;
  margin-top: 13px;
  width: 429px;
  height: 30px;
  color: #9F9F9F;
  font-size: 20px;
  font-family: 'Oswald', sans-serif;
`

const Box = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  margin-top: 265px;
  flex-direction: column;

  h3{
    color: #FFFFFF;
    font-family: 'Lato', sans-serif;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
    text-decoration-line: underline;
  }

  button{
  background-color: #1877F2;
  width: 449px;
  height: 50px;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 6px;
  margin-top: 13px;
  color: #FFFFFF;
  font-family: 'Oswald', sans-serif;
  font-size: 20px;
  display: flex;
  text-align: center;
  justify-content: center;
  }
`