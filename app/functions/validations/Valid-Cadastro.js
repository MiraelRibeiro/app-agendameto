import * as yup from 'yup';
import { parse } from 'date-fns'; 

export default ValidarCadastro = yup.object({
    nome: yup.string().required("Informe o seu nome!"),
    cpf: yup.string().min(11, "Deve informar os 11 números do cpf").required("Informe o seu CPF!"),
    nascimento: yup.date().transform((value, originalValue) => parse(originalValue, 'dd/MM/yyyy', new Date())).required("Informe a sua data de nascimento!"),
    email: yup.string().email("E-mail inválido").required("Informe o seu email!"),
    phone: yup.string().required("Informe o seu Telefone!"),
    cep: yup.string().min(5, "CEP deve ter no minimo 5 digitos!").required("Informe o CEP!"),
    rua: yup.string().required("Informe o nome da rua!"),
    bairro: yup.string().required("Informe o nome do bairro!"),
    cidade: yup.string().required("Informe o nome da cidade!"),
    uf: yup.string().max(2, "Apenas dois Digitos").required("Informe o codigo do estado!"),
    convenio: yup.string().notRequired("Informe o nome do convênio!")
});