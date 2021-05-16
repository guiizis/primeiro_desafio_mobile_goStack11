import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import api from "./services/api";

export default function App() {

  const [projects, setProjects] = useState([])

  async function handleLikeRepository(id) {

    const response = await api.post(`/repositories/${id}/like`)
    const likedRepo = response.data

    const newArrayWithLikedRepo = projects.map(repository => {
      if (repository.id == id) {
        return likedRepo
      } else {
        return repository
      }
    })
    setProjects(newArrayWithLikedRepo)
  }



  useEffect(() => {

    api.get('/repositories')
      .then(response =>
        setProjects(response.data)
      )
      .catch(error => {
        console.error(error)
      })
  }, [])



  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        <FlatList
          data={projects}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (
            <View key={repository.id} style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>

              {repository.techs.map(tech => {
                return (
                  <View key={tech} style={styles.techsContainer}>
                    <Text style={styles.tech}>
                      {tech}
                    </Text>
                  </View>
                )
              })}
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}

                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}

                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
