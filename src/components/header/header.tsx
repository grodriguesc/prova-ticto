import { useState } from "react";
import { styled } from "styled-components";
import { Logo } from "../svg-components/logo";
import ModalRegisterTransaction from "@/components/modal-transaction/modal-transaction";

const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
