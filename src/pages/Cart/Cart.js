import styled from 'styled-components';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development';
import Top from '../../components/Top';
import TopNav from '../../components/TopNav';
import Footer from '../../components/Footer';

function Cart() {
  const userId = localStorage.getItem('token');
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    axios
      .post('http://localhost:8000/cart/list', {
        user_id: userId,
      })
      .then(res => setCartData(res.data.result));
  }, []);

  // const totalPrice = () => {
  //   let result = 0;
  //   addCart &&
  //     addCart.map(obj => {
  //       result += Math.round(
  //         obj.sale_price ? obj.sale_price * obj.quantity : obj.normal_price * obj.quantity
  //       );
  //     });
  //   return result;
  // };

  return (
    <>
      <Top />
      <TopNav />
      <CartWrapper>
        <Header>
          <div className="title">장바구니</div>
          <div className="content">{cartData.length}개 상품</div>
        </Header>
        <BodyWrapper>
          {!userId || undefined ? (
            <div>empty</div>
          ) : (
            <Body>
              {cartData.map((e, i) => {
                return (
                  <CartContainer key={i}>
                    <div className="imgWrapper">
                      <img src={e.url} alt={e.name} />
                    </div>
                    <div>
                      <div>{e.name}</div>
                      <div>{e.style_code}</div>
                      <div>{e.size}</div>
                      <div>{e.quantity}</div>
                    </div>
                    <div>
                      <div>위시리스트에 추가</div>
                      <div>나중에 구매하기</div>
                    </div>
                    <div>옵션 변경</div>
                    <div>
                      <div>{e.price}</div>
                    </div>
                    <div>X</div>
                  </CartContainer>
                );
              })}
            </Body>
          )}
          <Aside>
            <div>총액</div>
          </Aside>
        </BodyWrapper>
      </CartWrapper>
      <Footer />
    </>
  );
}

const CartWrapper = styled.div`
  font-family: ${({ theme }) => theme.fontContent};
  margin: 3vw 10vw;
  text-align: center;
`;
const Header = styled.div`
  border-bottom: 1px solid #dedede;
  .title {
    font-size: 30px;
    font-weight: 900;
    margin-bottom: 20px;
  }
  .content {
    margin-bottom: 30px;
  }
`;
const BodyWrapper = styled.div``;
const Body = styled.div``;
const CartContainer = styled.div`
  .imgWrapper {
    width: 100px;
    height: 100px;
    object-fit: contain;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid black;
    }
  }
`;
const Aside = styled.div``;

export default Cart;
