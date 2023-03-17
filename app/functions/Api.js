import { set } from "react-hook-form";
import api from "../services/api";

async function UserSession(token){
    let setData = null;
    let status = null;
    await api.get('sessions', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) =>{
        setData = response.data;
        status = response.status;
    })
    .catch((err) => {
        setData = err.response.status;        
        status = err.response.status;
    });

    return {setData, status};
}

async function UserPost(token, full_name, user_name, type_user, medico_id, password){
    let setData = null;
    let status = null;
    await api.post('users',{
        full_name,
        user_name,
        type_user,
        medico_id,
        password
    }, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) =>{
        setData = response.data;
        status = response.status;
    })
    .catch((err) => {
        setData = err.response.status;        
        status = err.response.status;
    });

    return {setData, status};
}

async function UserIndex(token, nome){
    let setData = null;
    let status = null;
    await api.get('users',{nome}, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) =>{
        setData = response.data;
        status = response.status;
    })
    .catch((err) => {
        setData = err.response.status;        
        status = err.response.status;
    });

    return {setData, status};
}

async function AgendamentosIndex(token, userData){
    let setData = null;
    let status = null;
    if(userData.user.type_user === 'gerente'){
        await api.get('agendamentos', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) =>{
            setData = response.data;
            status = response.status;
        })
        .catch((err) => {
            setData = err.response.status;        
            status = err.response.status;
        });
    
    }
    else{
        await api.get(`agendamentos/medico/${userData.medico_id}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then((response) =>{
            setData = response.data;
            status = response.status;
        })
        .catch((err) => {
            setData = err.response.status;        
            status = err.response.status;
        });
    
    }

    return {setData, status};
}

async function AgendamentoPost(token, data, hora, medicoID, pacienteID, medicoNome, pacienteNome){
    let setData = null;
    let status = null;
    await api.post('agendamentos',
    {
        data,
        hora,
        medicoID,
        pacienteID,
        medicoNome,
        pacienteNome
    },
    {                
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) =>{
        setData = response.data;
        status = response.status;
    })
    .catch((err) => {
        setData = err.response.status;        
        status = err.response.status;
    });

    return {setData, status};
}

async function MedicosIndex(token){
    let setData = null;
    let status = null;
    await api.get('medicos', {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) =>{
        setData = response.data;
        status = response.status;
    })
    .catch((err) => {
        setData = err.response.status;        
        status = err.response.status;
    });

    return {setData, status};
}

async function MedicosPost(token, nome, cpf, nascimento, email, telefone, especializacao, diasAtendimento,
horaInicio, horaFim, tempoConsulta, cep, rua, bairro, cidade, estado){

    let setData = null;
    let status = null;
    await api.post('medicos',{
        nome,
        cpf,
        nascimento,
        email,
        telefone ,
        especializacao,
        diasAtendimento,
        horaInicio,
        horaFim,
        tempoConsulta,
        cep,
        rua,
        bairro,
        cidade,
        estado,
    }, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) =>{
        setData = response.data;
        status = response.status;
    })
    .catch((err) => {
        setData = err.response.status;        
        status = err.response.status;
    });

    return {setData, status};
}

async function PacientesIndex(token){
    let setData = null;
    let status = null;
    await api.get('pacientes', {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) =>{
        setData = response.data;
        status = response.status;
    })
    .catch((err) => {
        setData = err.response.status;        
        status = err.response.status;
    });

    return {setData, status};
}

async function PacientesPost(token, nome, cpf, nascimento, email, telefone, convenio, convenioNome, cep, rua, bairro, cidade, estado){
    let setData = null;
    let status = null;
    await api.post('pacientes', {
        nome, cpf, nascimento, email, telefone, convenio, convenioNome, cep, rua, bairro, cidade, estado
    }, {
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((response) =>{
        setData = response.data;
        status = response.status;
    })
    .catch((err) => {
        setData = err.response.status;        
        status = err.response.status;
    });

    return {setData, status};
}

export { AgendamentosIndex, MedicosIndex, PacientesIndex, AgendamentoPost, MedicosPost, PacientesPost, UserSession, UserPost, UserIndex };