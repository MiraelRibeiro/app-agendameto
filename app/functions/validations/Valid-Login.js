import * as yup from 'yup';

export default ValidarLogin = yup.object({
    user: yup.string().min(4, "Usuário deve ter no minimo 4 caractres!").required("Informe o seu usuário!"),
    password: yup.string().min(6, "Senha deve ter no minimo 6 digitos!").required("Informe sua senha!")
});