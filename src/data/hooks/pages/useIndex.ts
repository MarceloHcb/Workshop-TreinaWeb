import { useEffect, useState } from "react";
import { ApiService } from "../../services/ApiService";
import { Pet } from "../../@types/Pet";
import { AxiosError } from "axios";
export function useIndex() {
    const [listaPets, setListaPets] = useState<Pet[]>([]),
        [petSelecionado, setPetselecionado] = useState<Pet | null>(null),
        [email, setEmail] = useState(""),
        [valor, setValor] = useState(""),
        [mensagem, setMensagem] = useState("");
    useEffect(() => {
        ApiService.get("/pets")
            .then((resposta) => {
                setListaPets(resposta.data)
            })
    }, [])

    useEffect(() => {
        if(petSelecionado === null){
            limparFormulario()
        }
    }, [petSelecionado])
    function adotar() {
        if (petSelecionado !== null) {
            if (validarDadosAdocao()) {
                ApiService.post('/adocoes', {
                    pet_id: petSelecionado.id,
                    email,
                    valor
                })
                    .then(() => {
                        setPetselecionado(null);
                        setMensagem("Pet adotado com sucesso!!");                        
                    })
                    .catch((error: AxiosError) => {
                        setMensagem(error.response?.data.message);
                    })
            } else {
                setMensagem("Prencha todos os campos corretamente")
            }

        }
    }
    function validarDadosAdocao() {
        return email.length > 0 && valor.length > 0;
    }
    function limparFormulario(){
        setEmail("")
        setValor("")
    }
    return {
        listaPets,
        petSelecionado,
        setPetselecionado,
        email,
        setEmail,
        valor,
        setValor,
        mensagem,
        setMensagem,
        adotar
    };
}