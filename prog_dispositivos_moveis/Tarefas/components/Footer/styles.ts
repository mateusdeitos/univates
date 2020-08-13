import styled from 'styled-components/native';

interface FooterProps {
  backgroundColor: string;
}

export const Container = styled.View<FooterProps>`
  width: 100%;
  height: 40px;
  position: absolute;
  bottom: 0;
  box-shadow: 1px 1px 1px black;
  background: ${(props) => props.backgroundColor};
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const FooterText = styled.Text`
  /* font-family: 'Roboto-Medium'; */
  margin-left: 8px;
  font-weight: bold;
  color: #fff;
  font-size: 12px;
`;

