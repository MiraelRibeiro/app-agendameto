import * as yup from 'yup';

export default ValidarCadastro = yup.object({
    name: yup.string().required("Informe o seu nome!"),
    cpf: yup.string().required("Informe o seu CPF!"),
    birth: yup.date().required("Informe a sua data de nascimento!"),
    email: yup.string().email("E-mail inválido").required("Informe o seu email!"),
    phone: yup.number().required("Informe o seu Telefone!"),
    cep: yup.number().min(5, "CEP deve ter no minimo 5 digitos!").required("Informe o CEP!"),
    street: yup.string().required("Informe o nome da rua!"),
    neighborhood: yup.string().required("Informe o nome do bairro!"),
    city: yup.string().max(2, "Apenas dois Digitos").required("Informe o nome da cidade!"),
    uf: yup.string().required("Informe o codigo do estado!"),
    country: yup.string().required("Informe o nome do país!"),
    convenio: yup.string().required("Informe o nome do convênio!"),
    specialization: yup.string().required("Informe a especialização!"),
    start: yup.string().required("Informe o horario de início!"),
    end: yup.string().required("Informe a horario de fim!"),
    time: yup.string().required("Informe media de tempo de uma consulta!"),
    password: yup.string().min(6, "Senha deve ter no minimo 6 digitos!").required("Informe sua senha!"),
    confPassword: yup.string().min(6, "Senha deve ter no minimo 6 digitos!").required("Informe sua senha!").oneOf([yup.ref('password'), null], "Senhas devem ser iguais!")
});