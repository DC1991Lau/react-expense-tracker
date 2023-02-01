import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import {
  Close,
  Content,
  Overlay,
  TransationTypeButton,
  TransationTypeContainer,
} from "./styles";

export function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <form action="">
          <input type="text" placeholder="Descrição" />
          <input type="number" placeholder="Preço" />
          <input type="text" placeholder="Categoria" />
          <TransationTypeContainer>
            <TransationTypeButton variant="income" value="income">
              <ArrowCircleUp size={24} color="#00B37E" /> Entrada
            </TransationTypeButton>
            <TransationTypeButton variant="outcome" value="outcome">
              <ArrowCircleDown size={24} color="#F75A68" /> Saída
            </TransationTypeButton>
          </TransationTypeContainer>
          <button type="submit">Criar</button>
        </form>
        <Close>
          <X />
        </Close>
      </Content>
    </Dialog.Portal>
  );
}
