import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import { query, getDocs, doc, deleteDoc, collection, orderBy, where  } from "firebase/firestore";

const HomeScreen = () => {

  const isFocused = useIsFocused();
  const navigation = useNavigation()
  const [data, setData] = useState([])
  const [rerun, setRerun] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "recipes"), where("uid", "==", auth.currentUser.uid), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      setData(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    fetchData()
      .catch(console.error)
  }, [rerun, isFocused])

  const minutes = (t) => {
    let n = Math.abs(t) % 100; 
    let n1 = n % 10;
    if (n > 10 && n < 20) { return "минут" }
    if (n1 > 1 && n1 < 5) { return "минуты" }
    if (n1 == 1) { return "минута" }
    return "минут";
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  const handleAddData = () => {
    navigation.navigate("Добавить Рецепт")
  }

  const handleRecipe = (id) => {
    navigation.navigate('Рецепт', { id })
  }

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "recipes", id));
    setRerun(prevState => !prevState)
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={handleSignOut}
            style={[styles.button, styles.red]}
          >
            <Text style={styles.buttonText}>Выйти</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleAddData}
            style={styles.button}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.docBox}>
          {data.map((doc) => (
            <View style={styles.docContainer} key={doc.id}>
              <Text style={styles.docTitle}>{doc.title}</Text>
              <Text>{doc.time} {minutes(doc.time)}</Text>
              <View style={styles.itemButtons}>
                <TouchableOpacity 
                  onPress={() => {handleDelete(doc.id)}}
                  style={[styles.buttonMini, styles.red]}
                >
                  <Text style={styles.buttonTextMini}>Удалить</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => {handleRecipe(doc.id)}}
                  style={styles.buttonMini}
                >
                  <Text style={styles.buttonTextMini}>Открыть</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        {/* <Text>Email: {auth.currentUser?.email}</Text>  */}
      </View>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  button: {
    backgroundColor: "#0782F9",
    width: "45%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  docTitle: {
    fontWeight: "700",
  },
  docBox: {
    width: "60%",
  },
  docContainer: {
    alignItems: "center",
    marginVertical: 20,
    width: "100%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
  },
  plusSign: {
    width: 15,
    height: 15,
  },
  buttons: {
    flexDirection: "row",
    width: "60%",
    justifyContent: 'space-between',
  },
  red: {
    backgroundColor: "#d10404"
  },
  itemButtons: {
    width: "100%",
    margin: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonMini: {
    backgroundColor: "#0782F9",
    // width: "45%",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonTextMini: {
    color: "white",
    fontWeight: "700",
  },
})