import React, {useState} from "react";
import { request, gql } from "graphql-request"
import LastDetection from './LastDetection'



export default class DetectionAPI extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      detectionData: 0,
      year: 0,
      month: 0,
      day: 0,
      hour: 0,
      minute: 0,
      second: 0,
      hrMinSec: 0,
    }
  }


  componentDidMount(){
    //future goal: make entries into changeable variables
    const detectionQuery = gql`
      query getDetections($pagination: Pagination!) {
        detections(pagination: $pagination) {
          meta {
            currentPage
            previousPage
            nextPage
            totalEntries
            totalPages
          }
          entries {
            timestamp
          }
        }
      }
    `
    const variables = {
        pagination: {
        "page": 1,
        "pageSize": 10
        }
      }

      //Data pull from graphql (async)
    request('https://live.orcasound.net/graphql', detectionQuery, variables)
      .then((data) => 
        {
        //Reformatting of time data for LastDetection component
        //Array time data
        const dateIsolate = data.detections.entries[0].timestamp
        //stringTimeStamp = stringified time data
        const stringTimestamp = JSON.stringify(data.detections.entries[0].timestamp)
       console.log(stringTimestamp)
        const replaceChars = ( 
          dateIsolate
          .replace("Z", "")
          .replace("T", "-")
          .replace("/-/g","/"))
        const dateTimeSeparate = String(replaceChars.split(""))
        const splitChars = replaceChars.split("-")
        const splitHrMinSec = String(splitChars[3]).split(":")
        //data set into state variables
        this.setState({
          detectionData: stringTimestamp,
          year: splitChars[0],
          month: splitChars[1],
          day: splitChars[2],
          hour: splitHrMinSec[0],
          minute: splitHrMinSec[1],
          second: splitHrMinSec[2],
          hrMinSec: splitChars[3],
        }) 
        })

      console.log(typeof this.state.second, typeof this.state.minute)
      }


  
  render(variables){
    const { detectionData, year, month, day, hour, minute, second } = this.state

    //For double checking date number values
      /*{console.log(
        "Year: " + this.state.year +
        " "
        +
        "Month: " + this.state.month +
        " "
        +
        "Day: " + this.state.day +
        " "
        +
        "Hour: " + this.state.hour +
        " "
        +
        "Minute: " + this.state.minute +
        " "
        +
        "Second: " + this.state.second +
        " "
        )}*/
  return ( 
  
    <div>
       <h1>Year: {year}</h1>
       <h1>Month: {month} </h1>
       <h1>Day: {day} </h1>
       <h1>Hour: {hour}</h1>
       <h1>Minute: {minute}</h1>
       <h1>Second: {second}</h1>
     <LastDetection timestamp={this.state.detectionData} year={year} month={this.state.month} day={this.state.day} hour={this.state.hour}/>
    </div>
    ) 
  }
}

