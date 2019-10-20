const axios = require('axios')

export const searchCep = async (cep) => {

    if (cep.length < 9)
        return
    else {
        var cep = cep.replace(/\D/g, '');

        console.log(cep)
        if (cep != "") {
            let url = `https://viacep.com.br/ws/${cep}/json`
            let response = await axios(url)

            console.log('[RESPONSE SEARCH_CEP]',response.data)
            return response.data

        } //end if.
        else {
            //cep é inválido.
            // limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    }
};