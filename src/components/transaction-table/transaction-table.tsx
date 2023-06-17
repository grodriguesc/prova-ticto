import styled from "styled-components";
import { DeleteIcon } from "../svg-components/delete-icon";
import {
  useTransaction,
  TransactionType,
} from "@/app/context/transaction-context";

interface TransactionTableProps {}

const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 20px;
  padding: 51px 362px;
  font-size: 18px;
`;

const TableRow = styled.tr`
  background-color: #fff;
`;

const HeaderRow = styled.tr`
  color: var(--gray-text);
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 15px 10rem 10px 10px;
  font-weight: 400;
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

const MoneyCell = styled(TableCell)`
  color: ${(props) =>
    props.value === TransactionType.Outcome
      ? "var(--negative-income)"
      : "var(--positive-income)"};
`;

export default function TransactionTable(props: TransactionTableProps) {
  const { transactions } = useTransaction();

  let data = [
    {
      description: "item",
      value: 1000,
      category: "teste",
      date: new Date(),
      type: TransactionType.Income,
    },
  ];

  data = data.map((item) => ({
    ...item,
    formattedDate: formatDate(item.date),
  }));

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
            <TableCell>{transaction.name}</TableCell>
            <MoneyCell value={transaction.type}>
              <b>{transaction.price}</b>
            </MoneyCell>
            <TableCell>{transaction.category}</TableCell>
            <TableCell>{formatDate(transaction.date)}</TableCell>
            <DeleteCell>
              <DeleteIcon />
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
