import styled from 'styled-components';
import Footer from '../../components/Footer';
import Top from '../../components/Top';
import TopNav from '../../components/TopNav';

function Main() {
  return (
    <>
      <Top />
      <TopNav />
      <MainWrapper>
        <div>메인페이지입니다</div>
      </MainWrapper>
      <Footer />
    </>
  );
}

const MainWrapper = styled.div``;

export default Main;
