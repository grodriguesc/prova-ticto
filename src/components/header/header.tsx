import { useState } from "react";
import styled from "styled-components";
import { Logo } from "../svg-components/logo";
import ModalRegisterTransaction from "@/components/modal-transaction/modal-transaction";

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--primary-color);
  height: 11rem;
  margin-bottom: -5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    padding: 20px;
    margin-bottom: -4rem;
  }
`;

const TransactionButton = styled.button`
  background-color: var(--secondary-color);
  color: var(--gray-text);
  border: none;
  border-radius: 8px;
  width: 245px;
  height: 3.5rem;
  font-weight: bold;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
  }
`;

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <HeaderStyled className="container">
      <Logo></Logo>
      <TransactionButton onClick={openModal}>NOVA TRANSAÇÃO</TransactionButton>
      {isModalOpen && <ModalRegisterTransaction closeModal={closeModal} />}
    </HeaderStyled>
  );
}
