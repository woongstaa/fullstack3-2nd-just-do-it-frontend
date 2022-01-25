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
import { useLocation, useParams } from 'react-router-dom';

function List() {
  const [filter, setFilter] = useState(true);
  const [listData, setListData] = useState([]);

  const params = useParams();
  const location = useLocation().search;
  const query = new URLSearchParams(location);

  // &size=${params.size}&colorId=${params.colorId}&subBrandName=${
  //   params.subBrandName
  // }&subIconName=${params.subIconName}&subClothesName=${
  //   params.subClothesName
  // }&subAccessoriesName=${params.subAccessoriesName}

  const URL = `${GET_LIST_API}?genderId=${query.get('genderId')}&categoryId=${query.get(
    'categoryId'
  )}`;

  const FILTER_URL = `${process.env.REACT_APP_BASE_FRONT_URL}?genderId=${query.get(
    'genderId'
  )}&categoryId=${query.get('categoryId')}`;

  const changeParams = new URLSearchParams(FILTER_URL);

  useEffect(() => {
    axios({
      url: URL,
      method: 'GET',
    }).then(response => {
      setListData(response.data.list);
    });
  }, []);

  return (
    <>
      <Top />
      <TopNav />
      <ListWrapper>
        <ListTop filter={filter} setFilter={setFilter} query={query} />
        <ListBody>
          <ListFilterCard filter={filter} FILTER_URL={FILTER_URL} changeParams={changeParams} />
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
