"use client";

import { styled } from "styled-components";
import { Logo } from "../svg-components/logo";

const HeaderStyled = styled.header`
  justify-content: space-between;
  background: var(--primary-color);
  height: 177px;
  margin-bottom: -5rem;
`;
const TransactionButton = styled.button`
  background-color: var(--secondary-color);
  color: var(--gray-text);
  border: none;
  border-radius: 8px;
  width: 245px;
  height: 53px;
  font-weight: bold;
  cursor: pointer;
`;

export function Header() {
  return (
    <HeaderStyled className="container">
      <Logo></Logo>
      <TransactionButton
        onClick={() => {
          console.log("click");
        }}
      >
        NOVA TRANSAÇÃO
      </TransactionButton>
    </HeaderStyled>
  );
}
