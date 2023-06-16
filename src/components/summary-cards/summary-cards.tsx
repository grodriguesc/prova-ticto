import { styled } from "styled-components";
import styles from "./summary-cards.module.scss";
import IncomeArrow from "../svg-components/income-arrow";
import OutcomeArrow from "../svg-components/outcome-arrow";
import { Poppins } from "next/font/google";

const poppins = Poppins({ weight: ["400", "500", "700"], subsets: ["latin"] });
interface SummaryCardsProps {}

const Card = styled.div`
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 24rem;
  height: 11rem;
  font-size: 24px;
  flex-direction: column;
  position: relative;
`;

const CardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const MoneyText = styled.div`
  font-size: 42px;
  color: ${({ isTotalIncome }) =>
    isTotalIncome ? "var(--total-income-text)" : "var(--income-text)"};
  font-weight: 500;
  position: absolute;
  bottom: 27px;
`;

export default function SummaryCards(props: SummaryCardsProps) {
  return (
    <div className={`${styles.customContainer} container`}>
      <Card>
        <CardHeader>
          Entradas <IncomeArrow />
        </CardHeader>
        <MoneyText className={poppins.className}>R$ 1.529.289,52</MoneyText>
      </Card>
      <Card>
        <CardHeader>
          Saidas <OutcomeArrow />
        </CardHeader>
        <MoneyText className={poppins.className}>R$ 1.529.289,52</MoneyText>
      </Card>
      <Card className={`${styles.totalIncomeCard}`}>
        <CardHeader>Saldo Total</CardHeader>
        <MoneyText isTotalIncome className={poppins.className}>
          R$ 15.000.000,00
        </MoneyText>
      </Card>
    </div>
  );
}
