import styled from "styled-components";
import { DeleteIcon } from "../svg-components/delete-icon";

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

  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
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
    props.value < 0 ? "var(--negative-income)" : "var(--positive-income)"};
`;

export default function TransactionTable(props: TransactionTableProps) {
  let data = Array.from({ length: 20 }, () => ({
    description: `Item ${Math.floor(Math.random() * 1000)}`,
    value: getRandomInt(-1000, 1000),
    category: getRandomCategory(),
    date: new Date(getRandomInt(new Date(2022, 0, 1).getTime(), Date.now())),
  }));

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
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.description}</TableCell>
            <MoneyCell value={item.value}>
              <b>{formatMoney(item.value)}</b>
            </MoneyCell>
            <TableCell>{item.category}</TableCell>
            <TableCell>{item.formattedDate}</TableCell>
            <DeleteCell>
              <DeleteIcon />
            </DeleteCell>
          </TableRow>
        ))}
      </tbody>
    </Table>
  );
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomCategory() {
  const categories = [
    "Alimentação",
    "Transporte",
    "Lazer",
    "Saúde",
    "Educação",
    "Outros",
  ];
  return categories[getRandomInt(0, categories.length - 1)];
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
