import React from "react";
import {Card, Typography} from "@material-ui/core";
import { CardContent } from "@material-ui/core";

class HouseDescription extends React.Component<HouseDescriptionProps, any> {
    render() {
        return (
            <Card className={this.props.classname} elevation={10}>
                <CardContent>
                    <Typography variant="h4" component="h4">
                        House Description
                    </Typography>
                    <Typography>
                        &nbsp;&nbsp;&nbsp;&nbsp;{this.props.description}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export default HouseDescription;

interface HouseDescriptionProps {
    classname: string,
    description: string
}