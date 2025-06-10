import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function CardPais({ nome_pais }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("User")}>
            <Image style={styles.image} source={require("../../assets/brasil.png")} />
            <Text style={styles.text}>{nome_pais}</Text>
        </TouchableOpacity>
    )
}
