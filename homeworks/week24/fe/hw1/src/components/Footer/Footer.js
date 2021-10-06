import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  margin: 30px 0;
  font-family: '微軟正黑體';
  font-weight: 500;
  text-align: center;
  letter-spacing: 1.2px;
`;

export default function Footer() {
  return (
    <FooterContainer>
      <div>- React Blog Homework from Lidemy {' ♥ '} -</div>
    </FooterContainer>
  );
}
