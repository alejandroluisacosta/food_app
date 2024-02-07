 import { StyleSheet } from "react-native";


 const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    imageBackground: { //Image properties
        width: '100%',
        height: '100%',
        opacity: 0.7,
        bottom: '30%'
    },
    form: { // Login form
        width: '100%',
        height: '40%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        padding: 30
    },
    formInput: { // Login form: Outer content box
        flexDirection: 'row',
        marginTop: 30
    },
    formIcon: { // Icons inside login form
        width: 25,
        height: 25,
        marginTop: 5
    },
    formText: { // Login form: Text properties
        fontWeight: 'bold',
        fontSize: 16,
    },
    formTextInput: { // Login form: Text input fields
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: "#AAAAAA",
        marginLeft: 15
    },
    formRegister: { // Register text under main button: Alignment
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30
    },
    formRegisterText: { // Register text under main button: Text properties
        fontStyle: 'italic',
        color: 'orange',
        borderBottomWidth: 1,
        borderBottomColor: 'orange',
        fontWeight: 'bold',
        marginLeft: 10
    },
    logoContainer: { // App's logo: Alignment
        position: 'absolute',
        alignSelf: 'center',
        top: '15%'
    },
    logoImage: { // App's logo: Dimensions
        width: 100,
        height: 100
    },
    logoText: { // App's name
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold'
    }
});

export default HomeStyles;