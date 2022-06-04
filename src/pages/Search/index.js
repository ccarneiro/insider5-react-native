import { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Keyboard,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import api from '../../services/api';
import PostItem from '../../components/PostItem';
import NotFoundMessage from '../../components/NotFoundMessage';

export default Search = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [empty, setEmpty] = useState(false);

  async function handleSearchPosts() {
    console.log(`Search by: ${searchText}`);
    if (!searchText) {
      alert('Digite alguma texto para a busca!');
      return;
    }
    const response = await api.get(
      `api/posts?populate=cover,category&filters[title][$containsi]=${searchText}`
    );
    const responsePosts = response.data?.data;

    setEmpty(!responsePosts?.length);
    setPosts(responsePosts || []);
    // console.log(responsePosts);
    setSearchText('');
    Keyboard.dismiss();
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          placeholder="O que está buscando?"
          onChangeText={setSearchText}
          value={searchText}
          onSubmitEditing={handleSearchPosts}
        />
        <TouchableOpacity onPress={handleSearchPosts}>
          <Feather name="search" size={25} color="#000" />
        </TouchableOpacity>
      </View>
      {empty && <NotFoundMessage message="Nenhum post encontrado!" />}
      {!empty && (
        <FlatList
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <PostItem data={item} />}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#121212',
    padding: 18,
  },
  containerInput: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#C4C4C4',
    padding: 8,
    borderRadius: 4,
  },
  input: {
    width: '90%',
    height: 45,
    fontSize: 16,
  },
  // title: {
  //   color: '#fff',
  //   fontSize: 22,
  // }
});
