import React from 'react';
import styled from 'styled-components';
import SNKRSDetailImg from './SNKRSDetailImg';
import SNKRSDetailInfo from './SNKRSDetailInfo';
import Footer from '../../components/Footer';
import Top from '../../components/Top';
import TopNav from '../../components/TopNav';

const DetailSection = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 200px;
`;

export default function SNKRSDetail() {
  return (
    <div className="SNKRSDetail">
      <Top />
      <TopNav />
      <DetailSection>
        <SNKRSDetailImg />
        <SNKRSDetailInfo />
      </DetailSection>
      <Footer />
    </div>
  );
}
