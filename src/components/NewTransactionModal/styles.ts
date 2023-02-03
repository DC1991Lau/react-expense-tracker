import styled from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";

export const Overlay = styled(Dialog.Overlay)`
  position: fixed;
  width: 100vw;
  height: 100vh;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background: ${(props) => props.theme["gray-800"]};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    input {
      padding: 1rem;
      border-radius: 6px;
      background: ${(props) => props.theme["gray-900"]};
      border: 0;
      color: ${(props) => props.theme.white};

      &::placeholder {
        color: ${(props) => props.theme["gray-300"]};
      }

      &:first-child {
        margin-top: 2rem;
      }
    }

    button[type="submit"] {
      height: 58px;
      border: 0;
      background: ${(props) => props.theme["green-500"]};
      color: ${(props) => props.theme.white};
      font-weight: bold;
      padding: 0 1.25rem;
      border-radius: 6px;
      margin-top: 1.5rem;
      cursor: pointer;

      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }

      &:not(:disabled):hover {
        background: ${(props) => props.theme["green-700"]};
        transition: background-color 0.2s;
      }
    }
  }
`;

export const CreateNewTransactionButton = styled(Dialog.Close)``;

export const Close = styled(Dialog.Close)`
  position: fixed;
  top: 3rem;
  right: 2rem;
  line-height: 0;

  background: transparent;
  color: ${(props) => props.theme["gray-500"]};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  cursor: pointer;
`;

export const TransationTypeContainer = styled(RadioGroup.Root)`
  width: 100%;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  margin-top: 0.5rem;
`;

interface TransationTypeButtonProps {
  variant: "income" | "outcome";
}

export const TransationTypeButton = styled(
  RadioGroup.Item
)<TransationTypeButtonProps>`
  height: 3.625rem;
  border: 0;
  border-radius: 6px;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  background: ${(props) => props.theme["gray-700"]};
  color: ${(props) => props.theme["gray-300"]};

  cursor: pointer;
  outline: 0;

  &[data-state="unchecked"]:hover {
    transition: background-color 0.2s;
    background: ${(props) => props.theme["gray-600"]};
  }

  &[data-state="checked"] {
    background: ${(props) =>
      props.variant === "income"
        ? props.theme["green-700"]
        : props.theme["red-700"]};
    color: ${(props) => props.theme.white};
  }
`;
