import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import CategoryItem from '../../components/CategoryItem';
import FavoritePost from '../../components/FavoritePost';
import PostItem from '../../components/PostItem';
import api from '../../services/api';
import { getFavorite, setFavorite } from '../../services/favorite';

const FlatListAnimated = Animatable.createAnimatableComponent(FlatList);

export default Home = () => {
  const navigation = useNavigation();
  const [categories, setCategories] = useState([]);
  const [favCategory, setFavCategory] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // https://www.youtube.com/watch?v=LNWxufBEkrA - 49:03

  useEffect(() => {
    async function loadData() {
      // console.log('======================================');
      await getListPosts();

      const response = (await api.get('/api/categories?populate=icon')).data;
      // console.log(response);
      setCategories(response.data);
    }
    loadData();
  }, []);

  useEffect(() => {
    async function favorite() {
      const response = await getFavorite();
      setFavCategory(response);
    }

    favorite();
  }, []);

  async function getListPosts() {
    setLoading(true);
    const response = await api.get(
      'api/posts?populate=cover&sort=createdAt:desc'
    );
    setLoading(false);
    setPosts(response.data.data);
  }

  async function handleFavorite(id) {
    const response = await setFavorite(id);
    setFavCategory(response);
    // console.log(response);
    // alert('Categoria favoritada!');
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Animatable.Text style={styles.name} animation="fadeInLeft">
          DevBlog
        </Animatable.Text>
        <TouchableOpacity onPress={() => navigation.navigate('Search')}>
          <Feather name="search" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatListAnimated
        animation="flipInX"
        delay={500}
        style={styles.categories}
        data={categories}
        keyExtractor={(item) => String(item.id)}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 12 }}
        renderItem={({ item }) => (
          <CategoryItem data={item} favorite={() => handleFavorite(item.id)} />
        )}
      />
      <View style={styles.main}>
        {favCategory.length !== 0 && (
          <FlatList
            style={{ marginTop: 50, maxHeight: 100, paddingStart: 18 }}
            contentContainerStyle={{ paddingEnd: 18 }}
            data={favCategory}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => <FavoritePost data={item} />}
          />
        )}

        <Text
          style={[
            styles.title,
            { marginTop: favCategory.length > 0 ? 14 : 46 },
          ]}
        >
          Conteúdos em alta
        </Text>

        <FlatList
          style={{ flex: 1, paddingHorizontal: 18 }}
          showsVerticalScrollIndicator={false}
          data={posts}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <PostItem data={item} />}
          onRefresh={() => getListPosts()}
          refreshing={loading}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#232630',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 24,
  },
  name: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  categories: {
    maxHeight: 115,
    backgroundColor: '#EFEFEF',
    marginHorizontal: 18,
    borderRadius: 8,
    zIndex: 9,
  },
  main: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -30,
    // paddingTop: 40,
  },
  title: {
    fontSize: 21,
    paddingHorizontal: 18,
    marginBottom: 14,
    fontWeight: 'bold',
    color: '#162133',
  },
});
