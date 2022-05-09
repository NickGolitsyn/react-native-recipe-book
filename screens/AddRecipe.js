import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { collection, addDoc } from "firebase/firestore"; 
import { db, timestamp, auth } from '../firebase';

const AddRecipe = () => {

  const navigation = useNavigation()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [time, setTime] = useState(null)
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState([])

  const addIngredient = () => {
    const ing = newIngredient.trim()
    if (ing && !ingredients.includes(ing)) {
      setIngredients(prevIngredients => [...prevIngredients, ing])
    }
    console.log(newIngredient);
    console.log(ingredients);
    setNewIngredient('')
  }

  const handleSubmit = async () => {
    const docRef = await addDoc(collection(db, "recipes"), {
      title,
      method,
      time,
      ingredients,
      timestamp,
      uid: auth.currentUser.uid
    });
    console.log("Document written with ID: ", docRef.id);
    setTitle('')
    setMethod('')
    setTime(null)
    setNewIngredient('')
    setIngredients([])
    navigation.goBack()
  }

  const handleCancel = () => {
    navigation.replace("Рецепты")
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior="padding"  
    >
      <View style={styles.inputContainer}>
        <TextInput 
          placeholder="Title"
          value={title}
          onChangeText={text => setTitle(text)}
          style={styles.input}
        />
        <TextInput 
          placeholder="Method"
          multiline
          value={method}
          onChangeText={text => setMethod(text)}
          style={styles.input}
        />
        <TextInput 
          placeholder="Time"
          keyboardType="numeric"
          value={time}
          onChangeText={text => setTime(text)}
          style={styles.input}
        />
        <View style={styles.ingBox}>
          <TextInput 
            placeholder="Ingredients"
            value={newIngredient}
            onChangeText={text => setNewIngredient(text)}
            style={[styles.input, styles.ingInput]}
          />
          <TouchableOpacity
            onPress={addIngredient}
            style={styles.ingButton}
          >
            <Text style={styles.buttonText}>Добавить</Text>
          </TouchableOpacity>
        </View>
        <Text>
          {ingredients.map((i) => (
            i + ", "
          ))}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleCancel}
          style={[styles.button, styles.red]}
        >
          <Text style={styles.buttonText}>Отменить</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSubmit}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Добавить</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default AddRecipe

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 40
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    marginTop: 15,
    maxHeight: 150,
  },
  buttonContainer: {
    width: "80%",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    flexDirection: "row"
  },
  button: {
    backgroundColor: "#0782F9",
    width: "45%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  red: {
    backgroundColor: "#d10404"
  },
  ingBox: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  ingButton: {
    backgroundColor: "#0782F9",
    // width: "45%",
    paddingHorizontal: 15,
    borderRadius: 10,
    marginTop: 15,
    // alignItems: "center",
    justifyContent: "center",
  },
  ingInput: {
    width: "60%",
  }
})