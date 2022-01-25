import styled from 'styled-components';
import { AiOutlineControl } from 'react-icons/ai';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import { useState } from 'react';

function ListTop({ filter, setFilter, query }) {
  const [upDown, setUpDown] = useState(false);
  const [cate, setCate] = useState();
  const [gender, setGender] = useState();

  useState(() => {
    if (query.get('categoryId') === '1') {
      setCate('신발');
    } else if (query.get('categoryId') === '2') {
      setCate('의류');
    } else if (query.get('categoryId') === '3') {
      setCate('용품');
    } else {
      setCate('전체');
    }
  }, []);

  useState(() => {
    if (query.get('genderId') === '1') {
      setGender("Mens'");
    } else if (query.get('genderId') === '2') {
      setGender("Womens'");
    } else if (query.get('genderId') === '3') {
      setGender("Kids'");
    }
  });

  return (
    <TopWrapper>
      <div className="topLeft">
        <div className="subTitle">
          <span>{cate}</span>
        </div>
        <div className="mainTitle">
          <span>
            {gender} {cate}
          </span>
        </div>
      </div>
      <div className="topRight">
        <div className="filter" onClick={() => setFilter(!filter)}>
          필터
          <AiOutlineControl className="icon" />
        </div>
        <div className="sort" onClick={() => setUpDown(!upDown)}>
          신상품순
          {upDown ? (
            <MdKeyboardArrowUp className="icon" />
          ) : (
            <MdKeyboardArrowDown className="icon" />
          )}
        </div>
      </div>
    </TopWrapper>
  );
}

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  .icon {
    vertical-align: -10%;
    margin-left: 5px;
  }

  .topLeft {
    .subTitle {
      font-size: 14px;
    }
    .mainTitle {
      padding-top: 14px;
      font-size: 20px;
      font-weight: 700;
    }
  }
  .topRight {
    display: flex;
    font-size: 16px;

    .filter {
      margin-right: 30px;
      cursor: pointer;
    }
    .sort {
      cursor: pointer;
    }
  }
`;

export default ListTop;
