import { useEffect, useState, useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Share,
  Modal,
} from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import api from '../../services/api';
import LinkWeb from '../../components/LinkWeb';

export default Detail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [post, setPost] = useState({});
  const [links, setLinks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [openLink, setOpenLink] = useState({});

  useEffect(() => {
    async function getPost() {
      const response = await api.get(
        `api/posts/${route.params?.id}?populate=cover,category,Opcoes`
      );
      setPost(response.data.data);
      setLinks(response?.data?.data?.attributes?.Opcoes);
      // console.log({
      //   links: JSON.stringify(
      //     response?.data?.data?.attributes?.Opcoes,
      //     null,
      //     4
      //   ),
      // });
    }
    getPost();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleShare}>
          <Entypo name="share" size={25} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, post]);

  async function handleShare() {
    try {
      const result = await Share.share({
        message: `
        confere esse post: ${post?.attributes?.title}

        ${post?.attributes?.description}

        Vai lá no app devpost
        `,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Activity type');
        } else {
          console.log('Compartilhado com sucesso!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Modal fechado');
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleOpenLink(link) {
    setModalVisible(true);
    setOpenLink(link);
  }

  function handleCloseModal() {
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.cover}
        source={{
          uri: `${api.defaults.baseURL}${post?.attributes?.cover?.data?.attributes?.url}`,
        }}
        resizeMode="cover"
      />
      <Text style={styles.title}>{post?.attributes?.title}</Text>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.description}>{post?.attributes?.description}</Text>
        {links.length !== 0 && <Text style={styles.subTitle}>Links</Text>}
        {links.map((link) => (
          <TouchableOpacity
            style={styles.linkButton}
            key={String(link.id)}
            onPress={() => handleOpenLink(link)}
          >
            <Feather name="link" color="#1e4647" size={14} />
            <Text style={styles.linkText}>{link?.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <Modal animationType="slide" visible={modalVisible} transparent={true}>
        <LinkWeb
          title={openLink?.name}
          link={openLink?.url}
          closeModal={handleCloseModal}
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  cover: {
    width: '100%',
    height: 230,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 14,
    marginTop: 18,
    paddingHorizontal: 12,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
  },
  description: {
    lineHeight: 20,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    marginTop: 14,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  linkText: {
    color: '#1e4687',
    fontSize: 16,
    marginLeft: 6,
  },
});
