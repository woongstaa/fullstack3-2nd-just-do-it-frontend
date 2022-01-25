import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledDetailImg = styled.div`
  width: calc(100% - 449px);
  position: relative;
  padding: 0 10px;
`;

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  column-gap: 10px;
`;

const List = styled.li`
  position: relative;
  width: 99%;
  display: flex;
  justify-content: center;
  background: #f2f2f2;
  align-items: center;
  margin-bottom: 20px;
`;

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;

  img {
    width: 100%;
    background: #f2f2f2;
  }
`;

export default function DetailImg() {
  const [mockdata, setMockdata] = useState([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/product/detail/DAA-0001`)
      .then(res => setMockdata(res.data.data.img));
  }, []);

  return (
    <StyledDetailImg>
      <Wrapper>
        {mockdata &&
          mockdata.map(obj => {
            return (
              <List key={obj.url}>
                <ImgWrapper>
                  <img src={obj.url} alt={obj.url} />
                </ImgWrapper>
              </List>
            );
          })}
      </Wrapper>
    </StyledDetailImg>
  );
}
