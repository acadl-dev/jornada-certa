import Auth from "@/services/Auth";
import Storage from "@/services/Storage";
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useState } from "react";

const SessionContext = createContext({});

export function SessionProvider({ children }) {
    const [user, setUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

  

    const signIn = async (userName, password) => {
        try {
            const data = await Auth.signIn(userName, password);
            
            // Exemplo de retorno da API:
            // data = { token: 'abc123', user: { ... } }
            // salva token
            await AsyncStorage.setItem('@token', data);

            // salva usuário (opcional)
            // await AsyncStorage.setItem('@user', JSON.stringify(data.user));
            // atualiza estado global
            setUser(data.user);

        } catch (e) {
            console.error('Erro no signIn:', e);
            throw e;
        }
    };

    const signUp = async (userName, email, password) => {
        console.log("Entrou no signUp...")
        try {
             console.log("Entrou no try do signUp...")
            setIsLoading(true);
            const { data, error } = await Auth.signUp(userName, email, password);
            setIsLoading(false);
            if (error) {
                if (error.message) {
                    switch (error.code) {
                        case "email_already_exists":
                            return "Este e-mail já está em uso. Tente outro.";
                        default:
                            return "Erro ao entrar. Tente novamente mais tarde.";

                    }
                } else {
                    return error;
                }
            } else {
                console.log("Criou o usuário com sucesso!");
                return "Registro realizado com sucesso!";
            }
        } catch (e) {
            console.log("Erro ao criar o usuário!");
            console.error(e);
            setIsLoading(false);
        }
    }

    const signOut = () => {
        try {
            setUser(null);
            Storage.clearData("@citysport_session");
        } catch (e) {
            console.error(e);
        }
    }

    const loadUser = async () => {
        try {
            const _user = await Storage.loadData("@citysport_session");
            setUser(_user)
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            setIsLoading(false);
        }
    }

    useState(() => {
        loadUser();
    }, [user, isLoading]);



    return <SessionContext.Provider value={{ user, isLoading, signIn, signOut, signUp }}>
        {children}
    </SessionContext.Provider>
}

export const useSession = () => useContext(SessionContext);