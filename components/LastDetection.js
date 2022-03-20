import * as React from 'react';
import { useState, useEffect, Fragment } from 'react';
import styled from '@mui/material/styles';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { elements } from './../pages/index.js';



/*
id: (Number),
date: 'MM/DD/YYYY' (String),
time: "00:00:00"*/

export default class LastDetection extends React.Component{
	constructor(props){
	
		super(props);

		this.state = {
			year: 0,
			month: 0,
			day: 0,
			hour: 0,
			minute: 0,
			second: 0,
			id: 1,
			date: this.props.month + "-" + this.props.day + "-" + this.props.year +"T",
			time: this.props.hour + ":" + this.props.minute + ":" + this.props.second
		}


	}



	render(props){
		//Variables for isolating date data from state logs (MM/DD/YYYY and HH:MM:SS)
		const lastDetectYear = parseInt(this.state.date.substr(6,10))
		const lastDetectMonth = parseInt(this.state.date.substr(0,2) - 1)
		const lastDetectDay = parseInt(this.state.date.substr(3,5))
		const lastDetectHour = parseInt(this.state.time.substr(0,3))
		const lastDetectMinute = parseInt(this.state.time.substr(3,5))
		const lastDetectSecond= parseInt(this.state.time.substr(6,8))

		//console.log(typeof lastDetectYear, typeof lastDetectYear, typeof lastDetectMonth, typeof lastDetectDay,typeof lastDetectHour, typeof lastDetectMinute, typeof lastDetectSecond)
		//Current Date variable
		const currentDate = new Date()
		console.log("currentDate" + currentDate)
		//Last Detected Date variable
		const lastDate = 
		new Date(lastDetectYear, lastDetectMonth, lastDetectDay, + "T" + lastDetectHour, lastDetectMinute, lastDetectSecond)
		console.log("LastDate: " + lastDate)
		//Difference between current date and last detected date
		const dateDifference = currentDate.getTime() - lastDate.getTime()
		
		//Difference in days (Milliseconds / Days)
		const dateDiffDays =  Number(Math.round(Math.abs(dateDifference / 86400000))) //number = milliseconds in a day
		//Difference in hours (Milliseconds / Hours)
		
		const dateDiffHours = Math.round(Math.abs(dateDifference / 3600000))
		
		//Date formats to "Days" or "Hours" depending on how big of a date difference exists.
		return (
			<React.Fragment>
				<Button variant="contained">
				Time Since Last Detection: {dateDiffDays > 1 ? dateDiffDays + " Days" : dateDiffHours + " Hours"}
				</Button>
				
			</React.Fragment>
			)
	}
}


//{dateDiffDays >1 ? " " + dateDiffDays + " Days" : " " + dateDiffHours + "Hours"}
