import { api } from "./JornadaCertaApi";



const Auth = {
    signIn: async (userName, password) => {

        //api.get("/swagger/index.html")
            //.then(r => console.log("Conectou"))
            //.catch(e => console.log("Erro conexão", e.message));

        try {

            const response = await api.post("/Account/Login", {
                userName,
                password
            });

            console.log("Resposta API:", response.data);

            return response.data;

        } catch (error) {

            console.log("Erro no login:", error.message);

            throw error; 

        }
    },

    signUp: async (userName, email, password) => {

        console.log("Entrou no signUp do Auth.js")
        try{
            console.log("Entrou no try do signUp do Auth.js")
            console.log(`userName, email, password: ${userName}, ${email}, ${password}`)
            const response = await api.post("/Account/Register", {
                userName,
                email,
                password
            });

            console.log("Resposta API Register:", response.data);

            return response.data;

        } catch (error) {
            console.log("STATUS:", error.response?.status);
            console.log("DATA:", error.response?.data);
            console.log("FULL ERROR:", error);

            throw error;
        }
        
    },

}




export default Auth;