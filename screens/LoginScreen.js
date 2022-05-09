import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'

const LoginScreen = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const navigation = useNavigation()

  useEffect(() => {
    const unsubcribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace("Рецепты")
      }
    })

    return unsubcribe
  }, [])

  const handleSignUp = () => {
    setError('')
    const trimmedEmail = email.trim()
    createUserWithEmailAndPassword(auth, trimmedEmail, password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
    });
  }

  const handleLogin = () => {
    setError('')
    const trimmedEmail = email.trim()
    signInWithEmailAndPassword(auth, trimmedEmail, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
    });
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <View style={styles.passwordInp}>
          <TextInput 
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            secureTextEntry={showPassword ? false : true}
          />
          <TouchableOpacity
            style={styles.showBtn}
            onPress={() => {setShowPassword(prevState => !prevState)}}
          >
            <Text>{showPassword ? 'Hide' : 'Show'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.mrgTop}>{error}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.button} 
        >
          <Text style={styles.buttonText}>Войти</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]} 
        >
          <Text style={styles.buttonOutlineText}>Зарегистрироваться</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9" ,
    fontWeight: "700",
    fontSize: 16,
  },
  mrgTop: {
    marginTop: 10
  },
  showBtn: {
    position: 'absolute',
    right: 15,
  },
  passwordInp: {
    justifyContent: "center"
  }
})