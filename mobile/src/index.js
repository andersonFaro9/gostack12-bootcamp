import React, {useEffect, useState} from 'react';

import { Text,  SafeAreaView,FlatList, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import api from './services/api';

export default function App () {

    const  [repositories, setProjects] = useState([]);
    useEffect(()=>{
        api.get('repositories').then(response => {
            //console.log(response.data);
            setProjects(response.data);
        });
    },[]);

    async function addProject() {
        const response = await api.post('repositories', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Faro'
        });
        const project = response.data;

        setProjects ([...repositories, project]) ;

    }
    
    return (
        <>
        <StatusBar barStyle = "light-content" backgroundColor= "#7159c1"/>
        
        <SafeAreaView  style={styles.container}>
            <FlatList
                data={repositories}
                keyExtractor = {project =>  project.id}
                renderItem = {({item: project})=>(
                <Text style = {styles.project}>{project.title}</Text>
                )}
            />
            <TouchableOpacity 
            activeOpacity= {0.6}
            style= {styles.button}
            onPress = {addProject}>
                <Text style= {styles.buttonText} >Adicionar projeto</Text>
            </TouchableOpacity>
         </SafeAreaView> 
        </>
    )

    
   
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#7159c1',
        
    },
    title: {
        color: 'yellow',
        fontSize: 32,
        fontWeight: 'bold'
    },
    project: {
        color: '#FFF',
        fontSize: 20
       
    },
    button: {
        
        backgroundColor: '#fff',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,

    },

});