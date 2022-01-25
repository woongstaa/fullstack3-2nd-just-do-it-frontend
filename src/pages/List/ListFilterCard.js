import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ColorFilter from './filter/ColorFilter';
import SizeFilter from './filter/SizeFilter';

function ListFilterCard({ filter, FILTER_URL, changeParams }) {
  return (
    <FilterWrapper>
      <div className={filter ? 'notHide' : 'hide'}>
        <SizeFilter FILTER_URL={FILTER_URL} changeParams={changeParams} />
        <ColorFilter FILTER_URL={FILTER_URL} changeParams={changeParams} />
      </div>
    </FilterWrapper>
  );
}

const FilterWrapper = styled.div`
  margin-top: 50px;
  margin-right: 20px;

  .notHide {
    display: block;
    width: 220px;
  }

  .hide {
    display: none;
  }
`;

export default ListFilterCard;
