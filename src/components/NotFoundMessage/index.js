import { View, Text, StyleSheet } from 'react-native';

export default NotFound = ({ message, children }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {children && children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
