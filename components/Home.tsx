import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Text, View, Button, TouchableOpacity } from "react-native";

import { TextInput } from "react-native-paper";

const Home = () => {
    
    const [name, setText] = React.useState("");
    const [disabled, setDisabled] = React.useState(true)
    const navigation = useNavigation();

    useEffect(() => {
        if (name) {
            setDisabled(false)
        }else {
            setDisabled(true)
        }
    }, [name])

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <View style={{ width: "100%", padding: 20 }}>
                <TextInput
                    label="Enter Country"
                    value={name}
                    onChangeText={(text) => setText(text)}
                    style={{ marginBottom: 20 }}
                />
                <TouchableOpacity style={{backgroundColor:disabled?"#ccc":'#6200ee', width:200, justifyContent:'center', alignItems:'center', borderRadius:10}} disabled={disabled} onPress={() => navigation.navigate("CountryInfo", { name })}>
                    <Text style={{color: disabled?"black":"white", padding:10}} >Submit</Text>
                </TouchableOpacity>
                {/* <Button
                    mode="contained"
                    title="Submit"
                >
                    
                </Button> */}
            </View>
        </View>
    );
};

export default Home;
