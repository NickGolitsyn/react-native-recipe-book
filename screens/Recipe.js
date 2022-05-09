import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { useRoute } from '@react-navigation/native'
import { doc, getDoc } from "firebase/firestore";

const Recipe = () => {

  const route = useRoute()

  const [data, setData] = useState({})

  useEffect(() => {
    const fetchDoc = async () => {
      const docRef = doc(db, "recipes", route.params?.id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data())
        console.log("Document data:", docSnap.data());
        console.log(data);
      } else {
        console.log("No such document!");
      }
    }
    
    fetchDoc()
      .catch(console.error)
  }, [])

  const minutes = (t) => {
    let n = Math.abs(t) % 100; 
    let n1 = n % 10;
    if (n > 10 && n < 20) { return "минут" }
    if (n1 > 1 && n1 < 5) { return "минуты" }
    if (n1 == 1) { return "минута" }
    return "минут";
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.time}>Время готовки: {data.time} {minutes(data.time)}</Text>
        <View style={styles.box}>
          <Text style={styles.exp}>Как готовить:</Text>
          <Text style={styles.mrg}>{data.method}</Text>
        </View>
        <View style={styles.box}>
          <Text style={styles.exp}>Ингредиенты:</Text>
          {data?.ingredients?.map((i) => (
            <Text style={styles.mrg} key={i}>{`\u2022`} {i}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

export default Recipe

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10
  },
  title: {
    fontWeight: "700",
    fontSize: 32,
  },
  time: {
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "500"
  },
  box: {
    width: '80%',
    marginVertical: 10
  },
  exp: {
    fontWeight: "500",
    fontSize: 14,
  },
  mrg: {
    marginHorizontal: 10
  },
})