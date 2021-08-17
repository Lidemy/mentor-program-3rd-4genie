import styled from 'styled-components';

const Root = styled.div`
  width: 80%;
  margin: 0 auto;
  text-align: center;
`;
const AboutTitle = styled.div`
  margin: 40px 0;
  font-size: 36px;
`;
const AboutContent = styled.div`
  font-size: 24px;
  padding: 30px;
`;

export default function AboutPage() {
  return (
    <Root>
      <AboutTitle>This Blog</AboutTitle>
      <AboutContent>
        Build up with React , and only for practicing use
      </AboutContent>
    </Root>
  );
}
