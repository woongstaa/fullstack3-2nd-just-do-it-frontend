import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { GrClose } from 'react-icons/gr';
import { useParams } from 'react-router-dom';
export default function SNKRSDetailInfo() {
  const [data, setData] = useState('');
  const [userData, setUserData] = useState();
  const [size, setSize] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const params = useParams();

  const userId = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/snkrs/detail/${params.styleCode}`)
      .then(res => setData(res.data.data));
  }, []);
  console.log(data.is_open);
  const draw = () => {
    if (size === 0 || size === '사이즈 선택') {
      return alert('신발 사이즈를 선택해주세요!');
    } else if (!data.is_open) {
      return alert('Draw 시간이 아닙니다!');
    } else if (size !== '사이즈 선택' && data.is_open) {
      fetch(`${process.env.REACT_APP_BASE_URL}/snkrs`, {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          style_code: `${data.style_code}`,
          size: `${size}`,
        }),
      }).then(res => {
        if (res.status === 500) {
          alert('이미 추첨을 하셨습니다');
        } else {
          alert('응모가 완료되었습니다');
        }
      });
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const pickValue = e => {
    setSize(e.target.value);
  };

  // useEffect(() => {
  //   axios
  //     .put(`${process.env.REACT_APP_BASE_URL}/snkrs`, {
  //       user_id: userId,
  //       style_code: params.styleCode,
  //     })
  //     .then(res => setUserData(res.data));
  // }, []);

  return (
    <SNKRSDetailInfos>
      {/* {console.log(userId)}
      {console.log(params.styleCode)} */}
      {openModal ? ( // 모달 창
        <ModalBackground onClick={() => closeModal()}>
          <ModalContainer onClick={e => e.stopPropagation()}>
            <div>추첨 결과</div>
            <GrClose className="SNKRSModalIcon" onClick={() => closeModal()} />
            {userData &&
              userData.map((obj, index) => {
                return (
                  <UserDataWrapper key={index}>
                    <div>{obj.name}님의 응모 내역</div>
                    <div>{obj.style_code}</div>
                    <div className={obj.is_winner !== 0 ? 'winResult active' : 'winResult'}>
                      {obj.is_winner !== 0 ? '당첨' : '미당첨'}
                    </div>
                  </UserDataWrapper>
                );
              })}
          </ModalContainer>
        </ModalBackground>
      ) : null}

      <SNKRSDetailInfosTitle>{data.name}</SNKRSDetailInfosTitle>
      <SNKRSDetailInfosPrice>{data.price} 원</SNKRSDetailInfosPrice>
      <div>
        모든 복장을 자기표현의 기회로 삼으세요. 커스텀이 가능한 이번 덩크 로우는 농구 아이콘을
        강조해 오랜 시간을 거쳐 검증된 디자인 그 이상을 보여줍니다. 다양한 방법으로 신발 끈을 조일
        수 있는 옵션, 더블 아이스테이, 여분의 신발 끈 세트로 날마다 어울리는 맞춤 룩을 연출할 수
        있습니다. 과감해지는 걸 두려워하지 마세요. 설포의 신축성 밴드가 신발 끈이 느슨해져도 꼭 맞는
        핏을 선사합니다.
      </div>
      <div>한정판 드가자</div>
      <div>매일 오전 09:00 ~ 09:30 추첨 가능합니다.</div>
      <SizeSelection>
        <select onChange={pickValue}>
          <option value="사이즈 선택">사이즈 선택</option>
          {data.info &&
            data.info.map((obj, index) => {
              return (
                <option key={index} value={obj.size}>
                  {obj.size}
                </option>
              );
            })}
        </select>
      </SizeSelection>
      {data.is_open === 0 ? (
        <button onClick={() => draw()} disabled={true}>
          Comming SOON!
        </button>
      ) : (
        <button onClick={() => draw()} disabled={false}>
          응모하기
        </button>
      )}

      <button onClick={() => setOpenModal(true)}>추첨 확인</button>
    </SNKRSDetailInfos>
  );
}

const SNKRSDetailInfos = styled.div`
  right: 120px;
  top: 100px;
  display: flex;
  margin-left: 50px;
  margin-top: 100px;
  flex-direction: column;
  width: 300px;
  height: 100%;

  span {
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
    transition: opacity 0.15s linear;
  }

  div {
    margin: 20px auto;
  }

  button {
    width: 100%;
    height: auto;
    margin-bottom: 24px;
    margin-top: 20px;
    padding: 18px 1.5em;
    border-radius: 30px;
    border: none;
    color: white;
    background: black;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background: gray;
    }
  }
`;

const SNKRSDetailInfosTitle = styled.div`
  font-size: 30px;
`;

const SNKRSDetailInfosPrice = styled.div`
  font-size: 20px;
`;
const SizeSelection = styled.div`
  select {
    width: 100%;
    font-size: 15px;
    padding: 8px 16px;
  }
`;

const ModalBackground = styled.div`
  margin: 0 !important;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  z-index: 0;
`;

const ModalContainer = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 30vw;
  height: 80%;
  max-height: 80%;
  padding: 16px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 0 10px rgb(0 0 0 / 30%);
  text-align: center;

  .SNKRSModalIcon {
    text-align: center;
    font-size: 20px;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    cursor: pointer;
  }
`;

const UserDataWrapper = styled.div`
  margin: 10px 0;
  border-bottom: 1px gray solid;

  .winResult.active {
    color: #c3a923;
  }

  .winResult {
    color: #b74141;
  }
`;
