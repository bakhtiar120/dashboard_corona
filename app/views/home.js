/*
 Date Created       : 19 Maret 2020
 Create Files       : M. Bakhtiar Hanafi
 Contributor        : M. Bakhtiar Hanafi
 modified           : 19 Maret 2020
*/
import React from 'react';

import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Button,
    Text,
    StatusBar,
    Dimensions,
    ActivityIndicator,
} from 'react-native';

import { PieChart } from "react-native-chart-kit";
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/id';

const Home = () => {
    const data = [
        {
            name: "Positif",
            population: 308,
            color: "#f2c94c",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
        {
            name: "Sembuh",
            population: 15,
            color: "#219653",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },

        {
            name: "Meninggal",
            population: 25,
            color: "red",
            legendFontColor: "#7F7F7F",
            legendFontSize: 15
        },
    ];

    const [response, setResponse] = React.useState([]);
    const [loading,setLoading]= React.useState(false);
    const [lasupdate,setLastUpdate] = React.useState(null);
    function get_api() {
        setLoading(true);
        axios.get('https://api.kawalcorona.com/indonesia/')
            .then(function (response) {
                setLoading(false);
                setResponse(
                    [
                        {
                            name: "Positif",
                            population: parseInt(response.data[0].positif),
                            color: "#f2c94c",
                            legendFontColor: "#7F7F7F",
                            legendFontSize: 15
                        },
                        {
                            name: "Sembuh",
                            population: parseInt(response.data[0].sembuh),
                            color: "#219653",
                            legendFontColor: "#7F7F7F",
                            legendFontSize: 15
                        },
                
                        {
                            name: "Meninggal",
                            population: parseInt(response.data[0].meninggal),
                            color: "red",
                            legendFontColor: "#7F7F7F",
                            legendFontSize: 15
                        },
                    ]
                )
                setLastUpdate(response.data[1].lastupdate);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }
    React.useEffect(() => {
        get_api();
       
	}, []);
    return (
        <View style={{
            alignItems: 'center',
            flex: 1,
        }}>
             {
                loading==true &&
                <View style = {{justifyContent: 'center',
                alignItems: 'center',}}>
                          <ActivityIndicator
                             animating = {loading}
                             color = {"red"}
                             size = "large"
                             style = {{flex: 1,
                              justifyContent: 'center',
                              alignItems: 'center',
                              height: 80}}/>
                       </View>
            }
            <View style={{ marginTop: 80 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Data Corona di Indonesia</Text>
            </View>
            <View>
                {
                    response!=[] &&
                    <PieChart
                    data={response}
                    height={220}
                    width={Dimensions.get("window").width - 50} // from react-native
                    height={220}
                    chartConfig={{
                        color: (opacity = 1) => `white`,
                        labelColor: (opacity = 1) => `white`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="15"
                    absolute
                />
                }
                
            </View>
            <View>
                {
                    lasupdate!=null &&
                    <Text style={{fontSize:16,fontWeight:'300'}}>Update Terakhir : {moment(lasupdate).format("DD MMMM YYYY HH:MM:SS").toString()}</Text>
                }   
                
            </View>
            <View style={{marginTop:10}}>
            <Button
            onPress={() => get_api()}
  title="Refresh"
/>
            </View>

        </View>
    );
}

export default Home;