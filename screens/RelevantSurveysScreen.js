import React from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import 'firebase/firestore';


export default class RelevantSurveyScreen extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          surveyList: [
            
          ]
        }
    };

    //update button
    readFromDB = async () => {

        let db = firebase.firestore();
        let tempList = []

        db.collection("surveys").get().then((snapshot) => {
            // console.log(snapshot.docs);
            snapshot.docs.forEach(doc => {
                console.log(doc.id)

                let str = doc.id;
                tempList.push(str);
                console.log(tempList);
            })
            
            console.log("out of foreach: ");
            console.log(tempList);

            //Data is still here
            tempList.map(elem => {
                console.log("element is: " + elem);
            })

            //update state
            this.setState({
                surveyList: tempList
            })
        })
    };

    //fix page navigation issue (bug)
    displayData = async () => {
        await this.readFromDB();
        return(
            <View>
                {this.state.surveyList.map(elem => (
                    <LabelAndRedir 
                    labeltext={elem} 
                    uponpress1={this.props.navigation.navigate('ViewSurvey')}
                    uponpress2={this.props.navigation.navigate('GeneralSurvey')}
                    />
                ))}
            </View>
        );
    }
    
        // this.readFromDB(db);

        //print elements (ARRAY DATA GONE?? WHY??)
        // console.log('out of db loop');
        // console.log(tempList);

        // return(
        //     <View>
        //         {tempList.map((val, ndx) => (
        //             <LabelAndRedir 
        //             labeltext={ndx} 
        //             uponpress1={this.props.navigation.navigate('ViewSurvey')}
        //             uponpress2={this.props.navigation.navigate('GeneralSurvey')}
        //             />
        //         ))}
        //     </View>
        // );

//   async readFromDB(db){

    // tempList = [];
    // await db.collection("surveys").get().then((snapshot) => {

    //     // console.log(snapshot.docs);
    //     snapshot.docs.forEach(doc => {
    //         console.log(doc.id)

    //         let str = doc.id;
    //         tempList.push(str);
    //         console.log(tempList);
    //     })
        
    //     console.log("out of foreach: ");
    //     console.log(tempList);

    //     //Data is still here
    //     tempList.map(elem => {
    //         console.log("element is: " + elem);
    //     })
    // })


    // let arr = [];
    // db.collection("surveys").get().then((snapshot) => {

    //     // console.log(snapshot.docs);
    //     snapshot.docs.forEach(doc => {
    //         console.log(doc.id)

    //         let str = doc.id;
    //         arr.push(str);
    //         console.log(arr);
    //     })
        
    //     console.log("out of foreach: ");
    //     console.log(arr);

    //     //Data is still here
    //     arr.map(elem => {
    //         console.log("element is: " + elem);
    //     })
    // })
    

    // console.log(tempList);


    // return(
    //         <View>
    //             {tempList.map((val, ndx) => (
    //                 <LabelAndRedir 
    //                 labeltext={ndx} 
    //                 uponpress1={this.props.navigation.navigate('ViewSurvey')}
    //                 uponpress2={this.props.navigation.navigate('GeneralSurvey')}
    //                 />
    //             ))}
    //         </View>
    //     );
//   }

  render() {
    return (
        <View style={styles.container}>    

            <View style={styles.container}>
                <Text style={styles.optionSubheadingText}>Location-Relevant Surveys</Text>
            </View>

            {/* Fix bug with eye and pen button (navigation broken) */}
            <View>
                {this.state.surveyList.map(elem => (
                    <LabelAndRedir 
                    labeltext={elem} 
                    uponpress1={this.props.navigation.navigate('ViewSurvey')}
                    uponpress2={this.props.navigation.navigate('GeneralSurvey')}
                    />
                ))}
            </View>

            {/* Fix stack navigation issue */}
            <View>
                <Button title="display surveys" onPress={e => this.displayData()}/>
            </View>

            <View>
                <Button
                    style={styles.optionButton}
                    title="Back To Map"
                    onPress={() =>
                        this.props.navigation.navigate('Map')
                    }
                />
                <Button
                    style={styles.optionButton}
                    title="Back To Profile"
                    onPress={() =>
                        this.props.navigation.navigate('Profile')
                    }
                />
            </View>
        </View>
    );
  }
}

function LabelAndRedir({labeltext,uponpress1,uponpress2}) {
    return (
        <View>
            <View style={styles.optionMultipleButtons}>
                {/* <View> */}
                    <Text style={styles.optionsTitleText}>{labeltext}</Text>
                    <Button
                        type="outline"
                        icon={
                            <Icon
                            name='eye'
                            size={15}
                            color='black'
                            />
                        }
                        onPress={uponpress1}
                        iconLeft
                        title=''
                        />
                    <Button
                        type="outline"
                        icon={
                            <Icon
                            name='pencil'
                            size={15}
                            color='black'
                            />
                        }
                        onPress={uponpress2}
                        iconRight
                        title=''
                        />
                {/* </View> */}
            </View>
        </View>
    );
  }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
      paddingBottom: 70,
    },
    optionsTitleText: {
      fontSize: 20,
      marginLeft: 25,
      marginTop: 10,
      marginBottom: 15,
      color: 'black',
    },
    optionIconContainer: {
      paddingTop: 15,
      justifyContent: 'flex-start',
    },
    option: {
      backgroundColor: '#fdfdfd',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: '#EDEDED',
    },
    optionText: {
      fontSize: 15,
      marginTop: 1,
    },
    optionSubheadingText: {
        textAlign: 'center',
        fontSize: 30,
        marginTop: 30,
        marginBottom: 15,
        textDecorationLine: 'underline',
        fontWeight: 'bold',
    },
    optionButton: {
        fontSize: 15,
        paddingBottom: 20,
        paddingTop: 20,
        textAlign: 'center',
        padding: 50
    },
    optionSurveyButton: {
        fontSize: 20,
        marginTop: 20,
        paddingTop: 20,
        textAlign: 'left',
        color: 'blue',
    },
    optionMultipleButtons: {
        flexDirection: "row",  
        justifyContent: 'space-evenly',
        paddingLeft: 25,
        paddingRight: 25,
    },
    containerStacked: {
        flexDirection: 'row',
        padding: 20,
        textAlign: 'left'
    },
});