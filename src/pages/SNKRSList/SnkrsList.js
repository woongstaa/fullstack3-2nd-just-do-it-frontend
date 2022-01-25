import Footer from '../../components/Footer';
import styled from 'styled-components';
import { FaShoppingCart, FaMapMarker } from 'react-icons/fa';
import { BsFillGridFill, BsFillGrid3X3GapFill } from 'react-icons/bs';
import { IoChevronBackOutline } from 'react-icons/io5';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SignIn from '../Login/SignIn';
import axios from 'axios';
import { GET_SNKRS_LIST_API } from '../../config';
import SnkrsListCard from './SnkrsListCard';

function SnkrsList() {
  const [grid, setGrid] = useState(true);
  const [btnActive, setBtnActive] = useState(false);
  const [modal, setModal] = useState(false);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    axios({
      url: GET_SNKRS_LIST_API,
      method: 'GET',
    }).then(response => {
      setListData(response.data.list);
    });
  }, []);

  return (
    <>
      {modal && <SignIn modal={modal} setModal={setModal} />}
      <ListWrapper>
        <ListHeader>
          <div className="firstHead">
            <Link to="/">
              <div>
                <span>
                  <IoChevronBackOutline className="icon" />
                </span>
                Visit Nike.com
              </div>
            </Link>
            <div className="firstRight">
              <div className="rightRight">
                <Link to="/signup">회원가입</Link>
                <div className="center">/</div>
                <div onClick={() => setModal(true)}>로그인</div>
              </div>
              <div className="rightRight">고객센터</div>
              <span>
                <FaShoppingCart className="iconRight" />
              </span>
              <div>
                <span>
                  <FaMapMarker className="iconRight" />
                </span>
                대한민국
              </div>
            </div>
          </div>
          <div className="secondHead">
            <img src="/images/snkrs.png" alt="snkrs" />
            <div className="secondCenter">
              <div className="centerMenu">Feed</div>
              <div className="centerMenu">In stock</div>
              <div className="centerMenu">Upcoming</div>
            </div>
            <div onClick={() => setGrid(!grid)}>
              {grid ? (
                <BsFillGridFill className="icon" />
              ) : (
                <BsFillGrid3X3GapFill className="icon" />
              )}
            </div>
          </div>
        </ListHeader>
        <ListBody>
          <div className={grid ? 'listCard' : 'changedListCard'}>
            {listData.map((e, i) => {
              return (
                <div
                  className="cardWrapper"
                  key={i}
                  onMouseEnter={() => setBtnActive(true)}
                  onMouseLeave={() => setBtnActive(false)}
                >
                  <Link to={`/snkrs/detail/${e.style_code}`}>
                    <div className="imgWrapper">
                      <img src={e.imgUrl} alt={e.snkrsName} />
                    </div>
                    <div className="nameWrapper">
                      {e.is_open ? <div className="draw">Draw!</div> : <div>Commig soon</div>}
                      <div className="itemName">{e.snkrsName}</div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          {/* {listData.map((element, index) => {
            return (
              <SnkrsListCard
                key={index}
                snkrsName={element.snkrsName}
                imgUrl={element.imgUrl}
                isOpen={element.isOpen}
                setBtnActive={setBtnActive}
                grid={grid}
              />
            );
          })} */}
        </ListBody>
        <Footer />
      </ListWrapper>
    </>
  );
}

const ListWrapper = styled.div`
  box-sizing: border-box;
  font-family: ${props => props.theme.fontContent};
  width: 100%;
`;
const ListHeader = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 12px;

  a {
    text-decoration: none;
    color: black;
  }

  .firstHead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 2vw;

    .icon {
      vertical-align: -13%;
    }

    .firstRight {
      display: flex;

      .rightRight {
        display: flex;
        padding-right: 10px;
        cursor: pointer;

        .center {
          margin: 0 5px;
        }
      }

      .iconRight {
        padding-right: 10px;
      }
    }
  }

  .secondHead {
    display: flex;
    justify-content: space-between;
    border-top: 1px solid gray;
    border-bottom: 1px solid gray;
    padding: 20px 2vw;

    img {
      width: 30px;
      margin: 0;
    }

    .secondCenter {
      display: flex;
      align-items: center;
      font-size: 18px;

      .centerMenu {
        padding: 0 20px;
      }
    }

    .icon {
      font-size: 20px;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 640px) {
    .firstHead {
      display: none;
    }
  }
`;

const ListBody = styled.div`
  box-sizing: border-box;
  font-family: ${props => props.theme.fontContent};
  padding: 10px 2vw;

  .listCard {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 15px;
    margin-top: 20px;
    width: 100%;

    .cardWrapper {
      .imgWrapper {
        height: 500px;
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #efefef;
        cursor: pointer;

        img {
          width: 100%;
        }
      }

      .nameWrapper {
        text-align: center;
        padding: 30px;

        .draw {
          font-weight: 700;
          color: red;
        }

        .itemName {
          padding-top: 10px;
          font-size: 22px;
          font-weight: 600;
        }
      }
    }
  }

  .changedListCard {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 15px;
    margin: 20px 0;
    width: 100%;

    .cardWrapper {
      .imgWrapper {
        height: 250px;
        width: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #efefef;
        cursor: pointer;

        img {
          width: 100%;
        }
      }

      .nameWrapper {
        display: none;
      }
    }
  }

  a {
    text-decoration: none;
    color: black;
  }

  a :hover {
    opacity: 0.8;
  }

  @media screen and (max-width: 640px) {
    .listCard {
      grid-template-columns: 1fr;
    }

    .changedListCard {
      grid-template-columns: 1fr 1fr;
    }
  }
`;

const mock = [
  {
    id: 1,
    imgUrl:
      'https://static-breeze.nike.co.kr/kr/launch/cmsstatic/product/DA8016-806/ffa83bb5-dac3-4389-b4ea-fdbbd158492e_3.jpg?snkrBrowse',
    productName: 'Girls That Hoop',
    productCate: '에어 조던 5',
  },
  {
    id: 2,
    imgUrl:
      'https://static-breeze.nike.co.kr/kr/launch/cmsstatic/product/DA8016-806/ac46a97e-ac58-4e26-b718-9ab9fa23c197_2.jpg?snkrBrowse',
    productName: 'LeBron is King',
    productCate: '르브론 9',
  },
  {
    id: 3,
    imgUrl:
      'https://static-breeze.nike.co.kr/kr/launch/cmsstatic/product/DA8016-806/ccd0afa7-9dc7-4ee6-9f1a-7e6096845136_primary.jpg?snkrBrowse',
    productName: 'Air force',
    productCate: '에어포스',
  },
  {
    id: 4,
    imgUrl:
      'https://static-breeze.nike.co.kr/kr/launch/cmsstatic/product/DA8016-806/ffa83bb5-dac3-4389-b4ea-fdbbd158492e_3.jpg?snkrBrowse',
    productName: 'Girls That Hoop',
    productCate: '에어 조던 5',
  },
  {
    id: 5,
    imgUrl:
      'https://static-breeze.nike.co.kr/kr/launch/cmsstatic/product/DA8016-806/ac46a97e-ac58-4e26-b718-9ab9fa23c197_2.jpg?snkrBrowse',
    productName: 'LeBron is King',
    productCate: '르브론 9',
  },
  {
    id: 6,
    imgUrl:
      'https://static-breeze.nike.co.kr/kr/launch/cmsstatic/product/DA8016-806/ccd0afa7-9dc7-4ee6-9f1a-7e6096845136_primary.jpg?snkrBrowse',
    productName: 'Air force',
    productCate: '에어포스',
  },
];
export default SnkrsList;
