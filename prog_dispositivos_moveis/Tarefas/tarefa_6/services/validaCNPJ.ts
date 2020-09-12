import axios from 'axios';

const validaCNPJ = axios.create({
    baseURL: 'https://www.receitaws.com.br/v1/cnpj/',
});

export default validaCNPJ;