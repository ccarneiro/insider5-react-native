import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useLayoutEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NotFoundMessage from '../../components/NotFoundMessage';
import api from '../../services/api';

export default CategoryPosts = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [posts, setPosts] = useState([]);
  const [empty, setEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params?.title || 'Categoria',
    });
  }, []);

  useEffect(() => {
    getListPosts();
  }, []);

  async function getListPosts() {
    setLoading(true);
    // const response = await api.get(
    //   `api/posts?populate=cover&sort=createdAt:desc&filters[category][id][$eq]=${route.params?.id}`
    // );
    const response = await api.get(
      `api/categories/${route.params?.id}?fields=name&populate=posts,posts.cover&sort=posts.createdAt:desc`
    );
    const responsePosts = response.data.data?.attributes?.posts?.data;
    setLoading(false);
    setEmpty(!responsePosts?.length);
    setPosts(responsePosts);
  }

  function handleBack() {
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      {empty && (
        <NotFoundMessage message="Essa categoria não possui nenhum post!">
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.textButton}>Encontrar posts</Text>
          </TouchableOpacity>
        </NotFoundMessage>
      )}
      {!empty && (
        <FlatList
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <PostItem data={item} />}
          onRefresh={() => getListPosts()}
          refreshing={loading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: '#162133',
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginTop: 12,
    borderRadius: 4,
  },
  textButton: {
    color: '#fff',
  },
  // title: {
  //   color: '#fff',
  //   fontSize: 22,
  // }
});
