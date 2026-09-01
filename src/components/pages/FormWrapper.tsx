import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { card } from '@/src/theme/card';

const styles = StyleSheet.create({
    card: {
        backgroundColor: card.backgroundColor,
        padding: card.padding,
        borderRadius: card.borderRadius,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    }
});

export const FormWrapper = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.card}>{children}</View>
);
