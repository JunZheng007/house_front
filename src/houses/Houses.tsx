import React, {ChangeEvent} from "react";
import {connect} from "react-redux";
import {bindActionCreators, Dispatch} from "redux";
import {getHousesOfPage} from "../actions/house.action";
import {House as HouseModel} from "../shared/model/House";
import House from "./house/House";
import {ReduxState} from "../shared/constants/appConstants";
import Pageable from "../shared/model/Pageable";
import Pagination from '@material-ui/lab/Pagination';

class Houses extends React.Component<HousesProps, any>{
    constructor(props: HousesProps) {
        super(props);
        this.props.getHousesOfPage(0);
    }

    componentDidMount() {
        this.props.houses === null && this.props.getHousesOfPage(0);
    }

    handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
        this.props.getHousesOfPage(page - 1);
    }

    render() {
        console.log(this.props.houses);
        return (
            <div className="d-flex flex-column align-items-center">
                {this.props.houses?.content.map(house =>
                        <House house={house} key={house.id}/>
                )}
                <Pagination
                    className="m-3"
                    count={this.props.houses?.totalPages}
                    color="primary"
                    size="large"
                    showFirstButton
                    showLastButton
                    onChange={this.handleChangePage}
                />
            </div>
        );
    }
}

function mapStateToProps({houses}: ReduxState) {
    console.log('mapStateToProps', houses)
    return {
        houses: houses
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return bindActionCreators({getHousesOfPage}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Houses);

interface HousesProps {
    houses: Pageable<HouseModel>,
    getHousesOfPage: (page: number) => object
}