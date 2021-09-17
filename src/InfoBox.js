import React from 'react'
import "./InfoBox.css";
import {Card, CardContent, Typography} from "@material-ui/core"

function InfoBox({title, cases,isRed, active, total,...props }) {
    return (
        <Card 
        onClick={props.onClick}
        className={`infoBox ${active && 'info__selected'} ${isRed && 'info__red'}`}>
            <CardContent>
                <Typography color="textSecondary"  className="infoBox__title"> 
                    {title}
                </Typography>
                <h2 className={`infoBox__cases ${!isRed && 'info__green'}`}>{cases}</h2>
                <Typography className="infoBox__total" color="textSecondary"> 
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
