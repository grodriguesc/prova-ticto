import styled from "styled-components";
import styles from "./summary-cards.module.scss";
import IncomeArrow from "../svg-components/income-arrow";
import OutcomeArrow from "../svg-components/outcome-arrow";
import {
  useTransaction,
  TransactionType,
} from "@/app/context/transaction-context";

const Card = styled.div`
  border-radius: 8px;
  background-color: ${(props) => props.color || "#ffffff"};
  padding: 16px;
  width: 24rem;
  height: 11rem;
  font-size: 24px;
  flex-direction: column;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 20px;
  }
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const MoneyText = styled.div`
  font-size: 42px;
  color: ${(props) => props.color || "var(--income-text)"};
  font-weight: 500;
  position: absolute;
  bottom: 27px;
`;

const StyledCard = ({ isNegativeBalance = false, ...props }) => {
  const bgColor = isNegativeBalance
    ? "var(--negative-income)"
    : "var(--positive-income)";

  return <Card color={bgColor} {...props} />;
};

const StyledMoneyText = ({ isTotalIncome = false, ...props }) => {
  const color = isTotalIncome
    ? "var(--total-income-text)"
    : "var(--income-text)";

  return <MoneyText color={color} {...props} />;
};

export default function SummaryCards() {
  const { transactions } = useTransaction();

  const totalIncome = transactions
    .filter((transaction) => transaction.type === TransactionType.Income)
    .reduce((total, transaction) => total + transaction.rawPrice, 0);

  const totalOutcome = transactions
    .filter((transaction) => transaction.type === TransactionType.Outcome)
    .reduce((total, transaction) => total + transaction.rawPrice, 0);

  const totalBalance = totalIncome - totalOutcome;

  const isNegativeBalance = totalBalance < 0;

  return (
    <div className={`${styles.customContainer} container`}>
      <Card>
        <CardHeader>
          Entradas <IncomeArrow />
        </CardHeader>
        <MoneyText> {formatPrice(totalIncome.toFixed(2))}</MoneyText>
      </Card>
      <Card>
        <CardHeader>
          Saídas <OutcomeArrow />
        </CardHeader>
        <MoneyText> {formatPrice(totalOutcome.toFixed(2))}</MoneyText>
      </Card>
      <StyledCard
        isNegativeBalance={isNegativeBalance}
        className={`${styles.totalIncomeCard} ${
          isNegativeBalance ? styles.negativeBalance : ""
        }`}
      >
        <CardHeader>Saldo Total</CardHeader>
        <StyledMoneyText isTotalIncome>
          {formatPrice(totalBalance.toFixed(2))}
        </StyledMoneyText>
      </StyledCard>
    </div>
  );
}

function formatPrice(value: string) {
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
    "R$ " + (wholePart !== "" ? wholePart : "0") + "," + decimalPart;

  return formattedValue;
}
