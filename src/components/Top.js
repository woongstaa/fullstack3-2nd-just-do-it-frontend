import { SiJordan } from 'react-icons/si';
import { GiConverseShoe } from 'react-icons/gi';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import SignIn from '../pages/Login/SignIn';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { POST_MEMBER_API } from '../config';

function Top() {
  const [modal, setModal] = useState(false);
  const email = localStorage.getItem('token');

  const makeMember = () => {
    axios.post(POST_MEMBER_API, {
      email: email,
    });
  };
  return (
    <>
      {console.log(email)}
      {modal && <SignIn modal={modal} setModal={setModal} />}
      <TopWrapper>
        <TopLeft>
          <SiJordan className="icon" />
          <GiConverseShoe className="icon" />
        </TopLeft>
        <TopRight>
          <li>고객센터</li>
          <Link to="/signup">
            <li>멤버 가입</li>
          </Link>
          <li onClick={makeMember}>프리미엄 멤버 가입</li>
          <li onClick={() => setModal(true)}>로그인</li>
        </TopRight>
      </TopWrapper>
    </>
  );
}

const TopWrapper = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: gainsboro;
  padding: 0.5vh 3vw;
  font-family: ${props => props.theme.fontContent};

  @media screen and (max-width: 640px) {
    display: none;
  }
`;

const TopLeft = styled.div`
  font-size: 1.4rem;

  .icon {
    padding-right: 1vw;
  }
`;

const TopRight = styled.ul`
  display: flex;

  li {
    padding-left: 1vw;
    font-size: 0.8rem;
  }

  a {
    text-decoration: none;
    color: black;
  }
`;

export default Top;
