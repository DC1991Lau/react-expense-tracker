import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Close,
  Content,
  Overlay,
  TransationTypeButton,
  TransationTypeContainer,
} from "./styles";
import { Controller, useForm } from "react-hook-form";
import { useContext } from "react";
import { TransactionsContext } from "../../context/TransactionsContext";

const newTransactionSchema = z.object({
  description: z.string(),
  type: z.enum(["income", "outcome"]),
  category: z.string(),
  price: z.number(),
});

type NewTransactionFormInput = z.infer<typeof newTransactionSchema>;

export function NewTransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<NewTransactionFormInput>({
    resolver: zodResolver(newTransactionSchema),
  });

  const { createTransaction } = useContext(TransactionsContext);

  async function handleNewTransaction(data: NewTransactionFormInput) {
    const { category, description, price, type } = data;
    await createTransaction({
      category,
      description,
      price,
      type,
    });
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <form onSubmit={handleSubmit(handleNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register("category")}
          />
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransationTypeContainer
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <TransationTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} color="#00B37E" /> Entrada
                  </TransationTypeButton>
                  <TransationTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} color="#F75A68" /> Saída
                  </TransationTypeButton>
                </TransationTypeContainer>
              );
            }}
          />
          <button type="submit" disabled={isSubmitting}>
            Criar
          </button>
        </form>
        <Close>
          <X />
        </Close>
      </Content>
    </Dialog.Portal>
  );
}
