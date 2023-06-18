import { styled } from "styled-components";
import { animated } from "@react-spring/web";
import IncomeModalArrow from "../svg-components/income-modal-arrow";
import OutcomeModalArrow from "../svg-components/outcome-modal-arrow";
import React, { useState, useRef, useEffect } from "react";
import {
  TransactionType,
  useTransaction,
  TransactionData,
} from "@/app/context/transaction-context";
import "@/app/assets/animation.scss";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled.div`
  background: white;
  padding: 52px;
  border-radius: 10px;
  position: relative;
  width: 43rem;
  height: 39rem;

  @media (max-width: 768px) {
    width: 90%;
    height: auto;
    padding: 20px;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  right: 26px;
  top: 26px;
  border: none;
  background: transparent;
  font-size: 24px;
  cursor: pointer;
  color: var(--income-text);

  @media (max-width: 768px) {
    right: 10px;
    top: 10px;
  }
`;
const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Input = styled(animated.input)<{ hasError: boolean }>`
  background: var(--input-color);
  border: 1px solid ${({ hasError }) => (hasError ? "red" : "#d9d9d9")};
  border-radius: 7px;
  height: 66px;
  padding: 0 26px;

  &::placeholder {
    opacity: 0.5;
    font-size: 20px;
  }
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

const TypeButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TypeButton = styled.button<{ isSelected: boolean }>`
  flex: 1;
  margin-right: 10px;
  font-size: 20px;
  height: 66px;
  &:last-child {
    margin-right: 0;
  }
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  background-color: transparent;
  transition: all 0.2s ease-in-out;
  box-shadow: ${({ isSelected }) =>
    isSelected ? "inset 0px 2px 2px rgba(0, 0, 0, 0.25)" : ""};
  transform: ${({ isSelected }) => (isSelected ? "translateY(2px)" : "none")};
`;

const RegisterButton = styled.button`
  background: var(--primary-color);
  color: var(--total-income-text);
  height: 66px;
  width: 100%;
  border-radius: 8px;
  border: none;
`;

const TransactionTypeDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalHeader = styled.h2`
  margin-bottom: 2rem;
  font-size: 28px;
  color: var(--income-text);
`;

interface ModalRegisterTransactionProps {
  closeModal: () => void;
}

export default function ModalRegisterTransaction({
  closeModal,
}: ModalRegisterTransactionProps) {
  const { addTransaction } = useTransaction();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Partial<Record<keyof TransactionData, string>> = {};
    let hasErrors = false;

    if (!formValues.name) {
      errors.name = "Este campo é obrigatório";
      hasErrors = true;
    }

    if (!formValues.price || formValues.price === "R$ ,") {
      errors.price = "Este campo é obrigatório";
      hasErrors = true;
    }

    if (!formValues.category) {
      errors.category = "Este campo é obrigatório";
      hasErrors = true;
    }

    if (!formValues.type) {
      errors.type = "Este campo é obrigatório";
      hasErrors = true;
    }

    if (hasErrors) {
      setFormErrors(errors);

      const firstInvalidField = getFirstInvalidField();
      if (firstInvalidField) {
        firstInvalidField.current?.focus();
      }

      shakeFields();

      return;
    }

    formValues.date = new Date(Date.now());

    addTransaction(formValues);
    setFormValues({
      name: "",
      price: "",
      rawPrice: 0,
      category: "",
      type: TransactionType.Income,
      date: new Date(),
    });
    closeModal();
  };

  const [formValues, setFormValues] = useState<TransactionData>({
    name: "",
    price: "",
    rawPrice: 0,
    category: "",
    type: TransactionType.Income,
    date: new Date(),
  });

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof TransactionData, string>>
  >({});

  type InputRefs = {
    name: React.RefObject<HTMLInputElement>;
    price: React.RefObject<HTMLInputElement>;
    category: React.RefObject<HTMLInputElement>;
    typeIncome: React.RefObject<HTMLButtonElement>;
    typeOutcome: React.RefObject<HTMLButtonElement>;
  };

  const inputRefs: InputRefs = {
    name: useRef<HTMLInputElement>(null),
    price: useRef<HTMLInputElement>(null),
    category: useRef<HTMLInputElement>(null),
    typeIncome: useRef<HTMLButtonElement>(null),
    typeOutcome: useRef<HTMLButtonElement>(null),
  };

  const INPUT_REF_MAP: Record<keyof TransactionData, keyof typeof inputRefs> = {
    name: "name",
    price: "price",
    category: "category",
    type: "typeIncome",
    date: "name",
    rawPrice: "price",
  };

  useEffect(() => {
    const firstInvalidField = getFirstInvalidField();
    if (firstInvalidField) {
      firstInvalidField.current?.focus();
    }

    shakeFields();
  }, []);

  const getFirstInvalidField = (): React.RefObject<
    HTMLInputElement | HTMLButtonElement
  > | null => {
    const fields: (keyof TransactionData)[] = [
      "name",
      "price",
      "category",
      "type",
    ];

    for (let i = 0; i < fields.length; i++) {
      const fieldName = fields[i];
      if (formErrors[fieldName]) {
        const inputRefName = INPUT_REF_MAP[fieldName];
        return inputRefs[inputRefName as keyof typeof inputRefs];
      }
    }

    return null;
  };

  const shakeFields = () => {
    const fields = Object.keys(formErrors) as (keyof TransactionData)[];

    fields.forEach((fieldName) => {
      if (formErrors[fieldName]) {
        const fieldElement = document.getElementById(fieldName as string);

        if (fieldElement) {
          fieldElement.classList.add("shake");

          setTimeout(() => {
            fieldElement.classList.remove("shake");
          }, 500);
        }
      }
    });
  };

  const handleTypeButtonClick = (type: TransactionType) => {
    if (
      type === TransactionType.Income &&
      formValues.type !== TransactionType.Income
    ) {
      setFormValues({ ...formValues, type });
    } else if (
      type === TransactionType.Outcome &&
      formValues.type !== TransactionType.Outcome
    ) {
      setFormValues({ ...formValues, type });
    }
  };

  const handleInputChange = (
    fieldName: keyof TransactionData,
    value: string
  ) => {
    if (fieldName === "price") {
      const rawValue = value.replace(/[^0-9]/g, "");
      let formattedValue = "";

      if (rawValue.length <= 2) {
        formattedValue = "0";
      } else {
        formattedValue = rawValue.slice(0, -2);
      }

      const wholePart = formattedValue.replace(/^0+/, "");
      const decimalPart = rawValue.slice(-2);
      formattedValue =
        "R$ " +
        wholePart.replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
        "," +
        decimalPart;

      setFormValues({
        ...formValues,
        [fieldName]: formattedValue,
        rawPrice: Number(rawValue) / 100,
      });

      if (formattedValue === "R$ ,") {
        setFormErrors({
          ...formErrors,
          [fieldName]: "Este campo é obrigatório",
        });
      } else {
        setFormErrors({ ...formErrors, [fieldName]: "" });
      }
    } else {
      setFormValues({ ...formValues, [fieldName]: value });
      setFormErrors({ ...formErrors, [fieldName]: "" });
    }
  };

  return (
    <ModalWrapper>
      <ModalContent>
        <CloseButton onClick={closeModal}>X</CloseButton>
        <ModalHeader>Cadastrar Transação</ModalHeader>
        <form onSubmit={handleSubmit}>
          <Label>
            <Input
              id="name"
              type="text"
              placeholder="Nome"
              value={formValues.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              hasError={!!formErrors.name}
              ref={inputRefs.name}
            />
            {formErrors.name && <ErrorMessage>{formErrors.name}</ErrorMessage>}
          </Label>
          <Label>
            <Input
              id="price"
              type="text"
              placeholder="Preço"
              value={formValues.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              hasError={!!formErrors.price}
              ref={inputRefs.price}
            />
            {formErrors.price && (
              <ErrorMessage>{formErrors.price}</ErrorMessage>
            )}
          </Label>

          <Label>
            <TypeButtons>
              <TypeButton
                id="typeIncome"
                type="button"
                isSelected={formValues.type === TransactionType.Income}
                onClick={() => handleTypeButtonClick(TransactionType.Income)}
                ref={inputRefs.typeIncome}
              >
                <TransactionTypeDiv>
                  <IncomeModalArrow />
                  Entrada
                </TransactionTypeDiv>
              </TypeButton>

              <TypeButton
                id="typeOutcome"
                type="button"
                isSelected={formValues.type === TransactionType.Outcome}
                onClick={() => handleTypeButtonClick(TransactionType.Outcome)}
                ref={inputRefs.typeOutcome}
              >
                <TransactionTypeDiv>
                  <OutcomeModalArrow />
                  Saída
                </TransactionTypeDiv>
              </TypeButton>
            </TypeButtons>
            {formErrors.type && <ErrorMessage>{formErrors.type}</ErrorMessage>}
          </Label>

          <Label>
            <Input
              id="category"
              type="text"
              placeholder="Categoria"
              value={formValues.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              hasError={!!formErrors.category}
              ref={inputRefs.category}
            />
            {formErrors.category && (
              <ErrorMessage>{formErrors.category}</ErrorMessage>
            )}
          </Label>
          <RegisterButton type="submit">Cadastrar</RegisterButton>
        </form>
      </ModalContent>
    </ModalWrapper>
  );
}
