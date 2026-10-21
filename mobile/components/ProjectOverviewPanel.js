import { View, Text, StyleSheet } from 'react-native';
import { globalStyles as gs } from '../styles/globalStyles';
import { useActiveProject } from '../db/ActiveProjectContext';

export default function ProjectOverviewPanel() {
  const { activeProject } = useActiveProject();

  const centsToEuros = (amount) => {
    return (amount / 100).toFixed(2) + ' €';
  };

  return (
    // Panel displaying project overview: budget, expenses and tasks
    <View style={[gs.list, styles.card]}>
      <View style={styles.cardInfo}>
        {/* Title */}
        <Text style={[gs.colorTextMain, styles.title]}>Project overview</Text>

        {/* Budget */}
        <Text style={[gs.colorTextMain, styles.description]}>
          {activeProject?.budget
            ? 'Budget ' + centsToEuros(activeProject?.budget)
            : 'No budget'}
        </Text>

        {/* Expenses */}
        <Text style={[gs.colorTextMain, styles.description]}>
          {activeProject?.totalExpenses
            ? centsToEuros(activeProject?.totalExpenses)
            : 'No expenses'}
        </Text>

        {/* Tasks */}
        <Text style={[gs.colorTextMain, styles.description]}>
          {activeProject?.taskStats.total
            ? 'Tasks completed ' +
              activeProject?.taskStats.completed +
              '/' +
              activeProject?.taskStats.total
            : 'No tasks'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Main navigation card container
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardInfo: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },

  description: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },
});
