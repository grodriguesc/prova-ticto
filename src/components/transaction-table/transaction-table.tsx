import styled from "styled-components";
import { DeleteIcon } from "../svg-components/delete-icon";
import {
  useTransaction,
  TransactionType,
} from "@/app/context/transaction-context";

type MoneyCellProps = {
  value: TransactionType;
};

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 20px;
  padding: 0 20px;
  font-size: 18px;

  @media (min-width: 768px) {
    padding: 51px 362px;
  }
`;

const TableRow = styled.tr`
  background-color: #fff;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    margin-bottom: 20px;
    border-radius: 8px;
    align-items: center;
  }
`;

const HeaderRow = styled.tr`
  color: var(--gray-text);
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 15px 10rem 10px 10px;
  font-weight: 400;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableCell = styled.td`
  padding: 10px;
  text-align: left;
  width: 30%;
  height: 4rem;
  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 40px;
    border-radius: 0;
    text-align: center;

    &:before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      color: var(--gray-text);
    }
  }
`;

const DeleteCell = styled.td`
  max-width: 30px;
  padding: 15px 20px;
  text-align: right;
  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }
  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const DeleteButton = styled.button`
  cursor: pointer;
  border: none;
  background: transparent;

  @media (max-width: 768px) {
    border-radius: 100%;
    background: var(--primary-color);
    width: 30px;
    height: 30px;
  }
`;

const MoneyCell = styled(TableCell)<MoneyCellProps>`
  color: ${(props) =>
    props.value === TransactionType.Outcome
      ? "var(--negative-income)"
      : "var(--positive-income)"};

  @media (max-width: 768px) {
    &:before {
      content: "Valor: ";
      color: var(--gray-text);
      font-weight: bold;
    }
  }
`;

export default function TransactionTable() {
  const { transactions, deleteTransaction } = useTransaction();

  return (
    <Table>
      <thead>
        <HeaderRow>
          <TableHeader>Descrição</TableHeader>
          <TableHeader>Valor</TableHeader>
          <TableHeader>Categoria</TableHeader>
          <TableHeader>Data</TableHeader>
          <TableHeader></TableHeader>
        </HeaderRow>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <TableRow key={index}>
            <TableCell data-label="Descrição">{transaction.name}</TableCell>
            <MoneyCell value={transaction.type} data-label="Valor">
              <b>{transaction.price}</b>
            </MoneyCell>
            <TableCell data-label="Categoria">{transaction.category}</TableCell>
            <TableCell data-label="Data">
              {formatDate(transaction.date)}
            </TableCell>
            <DeleteCell data-label="Ação">
              <DeleteButton onClick={() => deleteTransaction(index)}>
                <DeleteIcon />
              </DeleteButton>
            </DeleteCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}

function formatDate(date: Date) {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Intl.DateTimeFormat("pt-BR", options)
    .format(date)
    .replace(/:/g, "h")
    .replace(", ", " às ");
}
