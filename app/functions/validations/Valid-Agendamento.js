import * as yup from 'yup';

export default ValidarAgendamento = (medico, paciente, date, horario) =>{    

    if(!medico){
        return "Escolha o medico responsável"
    }
    else if(!paciente){
        return "Escolha o paciente"
    }
    else if(!date || date === "Escolha a data:"){
        console.log(date)
        return "Escolha uma data para a consulta"        
    }
    else if(!horario){
        return "Escolha horario para a consulta"        
    }

    return null;
};