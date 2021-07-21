import React from "react";
import {House as HouseModel} from "../../shared/model/House";
import "./House.scss"
import {Card, CardContent, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import {appConstants} from "../../shared/constants/appConstants";

class House extends React.Component<HouseProps, any> {
    render() {
        return (
            // <div className="House">
            //     <img className="house-img" src={this.props.house.image}/>
            //     <div className="house-info">
            //         <h5>{this.props.house.name}</h5>
            //         <p>{`room: ${this.props.house.room}`}</p>
            //     </div>
            // </div>
            <Link className="link" to={`${appConstants.houseInfoRoute}/${this.props.house.id}`}>
            <Card className="House" variant="outlined">
                    <CardContent>
                        <img className="house-img" src={this.props.house.image} alt=""/>
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

// function mapDispatchToProps(dispatch: Dispatch) {
//     return bindActionCreators({
//         // openHouseDetail
//     }, dispatch);
// }

export default House;

interface HouseProps {
    house: HouseModel,
}