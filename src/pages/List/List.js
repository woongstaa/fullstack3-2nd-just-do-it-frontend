import styled from 'styled-components';
import ListCard from './ListCard';
import Top from '../../components/Top';
import TopNav from '../../components/TopNav';
import Footer from '../../components/Footer';
import ListTop from './ListTop';
import ListFilterCard from './ListFilterCard';
import { useEffect, useState } from 'react';
import { GET_LIST_API } from '../../config';
import axios from 'axios';

function List() {
  const [filter, setFilter] = useState(false);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    axios({
      url: GET_LIST_API,
      method: 'GET',
    }).then(response => {
      setListData(response.data.list);
    });
  }, []);

  // useEffect(() => {
  //   fetch('http://localhost:8000/product/list', {
  //     method: 'GET',
  //     headers: { 'Content-type': 'application/json', mode: 'cors' },
  //   })
  //     .then(res => res.json())
  //     .then(data => setListData(data.list));
  // }, []);

  return (
    <>
      <Top />
      <TopNav />
      <ListWrapper>
        <ListTop filter={filter} setFilter={setFilter} />
        <ListBody>
          <ListFilterCard filter={filter} />
          <ListCardWrapper>
            {listData.map((element, index) => {
              return (
                <ListCard
                  key={element.styleCode}
                  categoryName={element.categoryName}
                  genderName={element.genderName}
                  productName={element.productName}
                  imgUrl={element.imgUrl}
                  normalPrice={element.normal_price}
                  salePrice={element.sale_price}
                  saleRate={element.sale_rate}
                  styleCode={element.styleCode}
                  subAccName={element.subAccessoriesName}
                  subBrandName={element.subBrandName}
                  subClothesName={element.subClothesName}
                  subIconName={element.subIconName}
                  isMember={element.is_member}
                />
              );
            })}
          </ListCardWrapper>
        </ListBody>
      </ListWrapper>
      <Footer />
    </>
  );
}

const ListWrapper = styled.div`
  padding: 3vw;
  box-sizing: border-box;
  font-family: ${props => props.theme.fontContent};
`;

const ListBody = styled.div`
  display: flex;
`;

const ListCardWrapper = styled.div`
  width: 100%;
  margin-top: 40px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: 1fr 1fr 1fr;
`;

export default List;
