
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { useNavigation , useRoute} from '@react-navigation/native'

function useBasicImport() {
    const navigation = useNavigation();
    const route = useRoute();
    return {
        Colors, navigation, route
    }
}

export default useBasicImport;