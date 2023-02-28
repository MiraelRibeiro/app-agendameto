import * as yup from 'yup';

export default ValidarCadastroAdmin = yup.object({
    name: yup.string().email('Informe um e-mail válido!').required("Informe seu e-mail!"),
    password: yup.string().min(6, "Senha deve ter no minimo 6 digitos!").required("Informe sua senha!"),
    confPassword: yup.string().min(6, "Senha deve ter no minimo 6 digitos!").required("Informe sua senha!").oneOf([yup.ref('password'), null], "Senhas devem ser iguais!")
});