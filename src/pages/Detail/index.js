import { View, Text, StyleSheet } from "react-native";

export default Detail = () => {
  return (
    <View style={styles.container}>
      <Text>Pagina Detalhes do post</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#121212',
    alignItems: "center",
    justifyContent: "center",
  },
  // title: {
  //   color: '#fff',
  //   fontSize: 22,
  // }
});
