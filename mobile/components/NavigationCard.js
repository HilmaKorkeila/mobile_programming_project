import { View, Text, StyleSheet, Pressable } from 'react-native';
import { globalStyles as gs } from '../styles/globalStyles';

export default function NavigationCard({ title, description, onPress }) {
  return (
    // Navigation card with title and description, and acts as a navigation button/link
    <Pressable style={[gs.buttonPrimary, styles.card]} onPress={onPress}>
      <View style={styles.cardInfo}>
        {/* Card title */}
        <Text style={[gs.colorSecondary, styles.cardTitle]}>{title}</Text>
        {/* Card description */}
        <Text style={[gs.colorSecondary, styles.description]}>
          {description}
        </Text>
      </View>

      {/* Arrow indicating navigation to the dashboard */}
      <Text style={[gs.colorSecondary, styles.arrow]}>›</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  // Main navigation card container
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardInfo: {
    flex: 1,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
  },

  description: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 4,
  },

  arrow: {
    fontSize: 28,
  },
});
