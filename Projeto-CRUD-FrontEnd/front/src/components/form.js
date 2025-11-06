import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 160px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Label = styled.label``;

const Form = ({ onEdit, setOnEdit, getUsers }) => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    fone: "",
    data_nascimento: "",
  });

  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      // Converter a data do banco para o formato yyyy-MM-dd aceito pelo input
      const dataISO = new Date(onEdit.data_nascimento)
        .toISOString()
        .split("T")[0];

      setForm({
        nome: onEdit.nome || "",
        email: onEdit.email || "",
        fone: onEdit.fone || "",
        data_nascimento: dataISO || "",
      });
    } else {
      setForm({
        nome: "",
        email: "",
        fone: "",
        data_nascimento: "",
      });
    }
  }, [onEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nome || !form.email || !form.fone || !form.data_nascimento) {
      toast.warn("Preencha todos os campos!");
      return;
    }

    try {
      if (onEdit) {
        await axios.put(`http://localhost:8800/${onEdit.id}`, form);
        toast.success("Usuário atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:8800", form);
        toast.success("Usuário adicionado com sucesso!");
      }

      setForm({ nome: "", email: "", fone: "", data_nascimento: "" });
      setOnEdit(null);
      getUsers();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar usuário!");
    }
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome"
        />
      </InputArea>

      <InputArea>
        <Label>E-mail</Label>
        <Input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="E-mail"
        />
      </InputArea>

      <InputArea>
        <Label>Telefone</Label>
        <Input
          name="fone"
          value={form.fone}
          onChange={handleChange}
          placeholder="Telefone"
        />
      </InputArea>

      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input
          name="data_nascimento"
          type="date"
          value={form.data_nascimento}
          onChange={handleChange}
        />
      </InputArea>

      <Button type="submit">Salvar</Button>
    </FormContainer>
  );
};

export default Form;
