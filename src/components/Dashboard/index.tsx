import { Summary } from "../Summary";
import { TransactionTables } from "../TransactionsTables";
import { Container } from "./style";

export function Dashboard(){
  return(
    <Container>
      <Summary />
      <TransactionTables/>
    </Container>
  )
}