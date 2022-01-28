
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

function renderWithRouter(Component) {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{Component}</Router>),
    history,
  };
}
// Função que automatiza a renderização dos componentes com Router, para facilitar os testes. Peguei do repositório das aulas.
export default renderWithRouter;