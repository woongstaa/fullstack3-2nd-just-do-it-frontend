import DetailInfo from './compo/DetailInfo';
import DetailImg from './compo/DetailImg';
import styled from 'styled-components';
import Top from '../../components/Top';
import TopNav from '../../components/TopNav';
import Footer from '../../components/Footer';

const DetailSection = styled.section`
  display: flex;
  margin: 20px 10vw;
  font-family: ${({ theme }) => theme.fontContent};
`;

function Detail() {
  return (
    <div className="Detail">
      <Top />
      <TopNav />
      <DetailSection>
        <DetailImg />
        <DetailInfo />
      </DetailSection>
      <Footer />
    </div>
  );
}

export default Detail;
