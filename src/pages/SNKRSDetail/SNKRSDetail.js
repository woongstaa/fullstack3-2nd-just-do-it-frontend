import React from 'react';
import styled from 'styled-components';
import SNKRSDetailImg from './SNKRSDetailImg';
import SNKRSDetailInfo from './SNKRSDetailInfo';
import Footer from '../../components/Footer';
import SnkrsTop from '../SNKRSList/SnkrsTop';

export default function SNKRSDetail() {
  return (
    <div className="SNKRSDetail">
      <SnkrsTop />
      <DetailSection>
        <SNKRSDetailImg />
        <SNKRSDetailInfo />
      </DetailSection>
      <Footer />
    </div>
  );
}

const DetailSection = styled.section`
  display: flex;
  margin-top: 100px;
  margin-bottom: 200px;
  font-family: ${({ theme }) => theme.fontContent};

  @media screen and (max-width: 640px) {
    flex-direction: column;
  }
`;
