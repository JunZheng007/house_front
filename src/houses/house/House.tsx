import React from "react";
import {House as HouseModel} from "../../shared/model/House";
import "./House.scss"
import {Card, CardContent, Typography} from "@material-ui/core";
import Image from 'material-ui-image';
import {Link} from "react-router-dom";
import {appConstants} from "../../shared/constants/appConstants";

class House extends React.Component<HouseProps, any> {
    render() {
        console.log(this.props.house)
        return (
            <Link className="link" to={`${appConstants.houseInfoRoute}/${this.props.house.id}`}>
                <Card className="House" variant="outlined">
                    <CardContent>
                        <Image style={{"width": "300px"}} src={this.props.house.photos[0].path} aspectRatio={(16 / 9)}/>
                        {/*<img className="house-img" src={this.props.house.image} alt=""/>*/}
                    </CardContent>
                    <CardContent>
                        <h4>{this.props.house.name}</h4>
                        <Typography>
                            room: {this.props.house.room}
                        </Typography>
                        <Typography>
                            capacity: {this.props.house.capacity}
                        </Typography>
                        <Typography>
                            style: {this.props.house.style}
                        </Typography>
                        <Typography>
                            address: {this.props.house.address}
                        </Typography>
                    </CardContent>
                </Card>
            </Link>
        );
    }
}

export default House;

interface HouseProps {
    house: HouseModel,
}