import { useActiveProject } from '../db/ActiveProjectContext';
import { globalStyles as gs } from '../styles/globalStyles';
import { StyleSheet, Text, View, Pressable } from 'react-native';

export default function ExpensesScreen({ route, navigation }) {
  const { activeProject } = useActiveProject();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expenses</Text>
      <Pressable
        style={[gs.button, gs.buttonSecondary]}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={[gs.colorTextMain, gs.buttonText]}>Back to Dashboard</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
