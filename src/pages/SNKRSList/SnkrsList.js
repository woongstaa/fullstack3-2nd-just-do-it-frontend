import Footer from '../../components/Footer';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GET_SNKRS_LIST_API } from '../../config';
import SnkrsTop from './SnkrsTop';

function SnkrsList() {
  const [grid, setGrid] = useState(true);

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
    <ListWrapper>
      <SnkrsTop setGrid={setGrid} grid={grid} />
      <ListBody>
        <div className={grid ? 'listCard' : 'changedListCard'}>
          {listData.map((e, i) => {
            return (
              <div className="cardWrapper" key={i}>
                <a href={`/snkrs/detail/${e.style_code}`}>
                  <div className="imgWrapper">
                    <img src={e.imgUrl} alt={e.snkrsName} />
                  </div>
                  <div className="nameWrapper">
                    {e.is_open ? <div className="draw">Draw!</div> : <div>Commig soon</div>}
                    <div className="itemName">{e.snkrsName}</div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </ListBody>
      <Footer />
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  box-sizing: border-box;
  font-family: ${props => props.theme.fontContent};
  width: 100%;
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

export default SnkrsList;
