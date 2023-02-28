import * as yup from 'yup';

export default ValidarAgendamento = yup.object({
    paciente: yup.string().required("Informe o seu usuário!").min(5, "Nome deve ter no mínimo 5 letras!").required("Informe o nome do paciente!"),
});