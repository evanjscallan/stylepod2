import React, {useState} from "react";
import { request, gql } from "graphql-request"
import LastDetection from './LastDetection'

export default class DetectionAPI extends React.Component{
  constructor(props){
    super(props)
    //state defaults as the number 0 until graphQL pulls data
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

  //data pull from graphQL database (will update as page refreshes)
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
          date: splitChars[1] + "-" + splitChars[2] + "-" + splitChars[0],
          time: splitHrMinSec[0] + ":" + splitHrMinSec[1] + ":" + splitHrMinSec[1]
        }) 
        })
      }


  
  render(variables){
    const { detectionData, year, month, day, hour, minute, second, date, time } = this.state

    //For double checking date number values
  return ( 
  
    <div>
       <h1>Year: {year}</h1>
       <h1>Month: {month} </h1>
       <h1>Day: {day} </h1>
       <h1>Hour: {hour}</h1>
       <h1>Minute: {minute}</h1>
       <h1>Second: {second}</h1>
     <LastDetection date={this.state.date} time={this.state.time} timestamp={this.state.detectionData} year={year} month={this.state.month} day={this.state.day} hour={this.state.hour} minute={this.state.minute} second={this.state.second}/>
    </div>
    ) 
  }
}

