import { Airplane, MagnifyingGlass } from "phosphor-react";
import { SearchFormContainer } from "./styles";

export default function SearchForm() {
  return (
    <SearchFormContainer>
      <input type="text" placeholder="Procurar uma transação" />
      <button>
        <MagnifyingGlass size={20} />
        Procurar
      </button>
    </SearchFormContainer>
  );
}
