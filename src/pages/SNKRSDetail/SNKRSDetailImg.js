import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

export default function DetailImg() {
  const [mockdata, setMockdata] = useState([]);

  const params = useParams();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/snkrs/detail/${params.styleCode}`)
      .then(res => setMockdata(res.data.data.img));
  }, []);

  return (
    <StyledDetailImg>
      <Wrapper>
        {mockdata &&
          mockdata.map((obj, i) => {
            return (
              <ImgWrapper key={i}>
                <div className="center">
                  <img src={obj.url} alt={obj.url} />
                </div>
              </ImgWrapper>
            );
          })}
      </Wrapper>
    </StyledDetailImg>
  );
}

const StyledDetailImg = styled.div`
  padding: 0 10px;
  width: 70%;
  @media screen and (max-width: 640px) {
    display: flex;
    justify-content: center;
  }
`;

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  width: 100%;
  text-align: center;
  justify-items: center;
  justify-content: center;

  @media screen and (max-width: 640px) {
    grid-template-columns: 1fr;
    justify-content: center;
    align-items: center;
  }
`;

const ImgWrapper = styled.div`
  background: #f2f2f2;
  width: 500px;
  height: 500px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .center {
    display: flex;
    justify-content: center;
    img {
      width: 100%;
    }
  }
`;
