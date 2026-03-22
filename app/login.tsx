import { ScrollView, StyleSheet } from 'react-native';
import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  Button,
  ForgotPassword,
  Image,
  Text,
  TextInput,
  View
} from '@/components/customs';
import { useSession } from '@/providers/SessionContext';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TextInput as TIcon } from 'react-native-paper';

import { useModal } from '@/providers/ModalContext';
import { useSnackbar } from '@/providers/SnackbarContext';



export default function LoginScreen() {
  //const { signIn } = useSession() as { signIn: any };
  const router = useRouter();
  const [securityState, setSecurityState] = useState(true)
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { showModal, hideModal } = useModal() as { showModal: any, hideModal: any };
  const { showSnackbar } = useSnackbar() as { showSnackbar: any };
  const { signIn, isLoading, forgotPassword } = useSession() as { signIn: any, isLoading: boolean, forgotPassword: any };

  const handleLogin = async () => {
    try{
      await signIn(userName, password);
    } catch (error) {
      console.log('Erro no login: ', error);
    }
  }
  


  return <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
              <View style={styles.container}>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={require('@/assets/images/logo.png')} />
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>Insira seus dados para entrar</Text>
              </View>
              <View
                  style={styles.form}
              >
                <TextInput 
                  mode="flat"
                  label="Username"
                  value={userName}
                  onChangeText={(text: string) => setUserName(text)}
                />
              </View>
              <View>
                <TextInput
                  onChangeText={(text: string) => setPassword(text)}
                  value={password}
                  mode="flat"
                  label="Password"
                  secureTextEntry={securityState}
                  right={<TIcon.Icon icon={securityState ? "eye" : "eye-off"} onPress={() => setSecurityState(!securityState)}/>}
                  />
              </View>
              <View>
                <Button
                onPress={() => {
                  showModal(
                    <ForgotPassword 
                      forgotPassword={forgotPassword} hideModal={hideModal} showSnackbar={showSnackbar}
                    />
                  );
                }}
                style={styles.button}
                >Esqueci minha senha</Button>
              </View>
              <View>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={async () => {
                    const message = await signIn(userName, password);
                    showSnackbar(message);
                  }}
                >Entrar</Button>
              </View>
              <View>
                <Button
                  onPress={() => {
                    router.push('/register');
                  }}
                style={styles.button}
                >Cadastrar</Button>
              </View>
            </View>
            </ScrollView>
          </SafeAreaView>
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
    width: "100%",
    paddingHorizontal: 32,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 128,
    height: 128,
    alignSelf: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center"
  },
  subtitle : {
    fontSize: 16,
    color: "#666",
    marginBottom: 32,
    textAlign: "center"
  },
  form: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    borderRadius: 4,
  }
});