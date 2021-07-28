import './HouseInfo.scss';
import React, {SyntheticEvent} from "react";
import {Card, CardMedia, Paper} from "@material-ui/core";
import {House} from "../../shared/model/House";
import {RentInfo} from "../../shared/model/RentInfo";
import {connect} from "react-redux";
import {ReduxState} from "../../shared/constants/appConstants";
import {RouteComponentProps} from "react-router-dom";
import HouseDescription from "../houseDescription/HouseDescription";
import ReserveForm from "../../reserve/reserveForm/ReserveForm";
import Reviews from "../../reviews/Reviews";
import {getHouseById} from "../../actions/house.action";
import {getRentInfoByHouseId} from "../../actions/rent.action";
import {Review} from "../../shared/model/Review";
import {getReviewsByHouseIdOfPage} from "../../actions/review.action";
import {User} from "../../shared/model/User";
import {checkLogin} from "../../actions/user.action";
import Pageable from "../../shared/model/Pageable";
import Carousel from "react-material-ui-carousel";
import {HouseFile} from "../../shared/model/HouseFile";

class HouseInfo extends React.Component<HouseInfoProps, HouseInfoState> {

    constructor(props: HouseInfoProps) {
        super(props);
        props.getHouseById(+props.match.params.id);
        props.getRentInfoByHouseId(+props.match.params.id);
        props.getReviewsByHouseIdOfPage(+props.match.params.id, 0);
        props.checkLogin();
        this.state = {
            datePickerOpen: false
        }
    }

    componentDidMount() {
        this.props.house === null && this.props.getHouseById(+this.props.match.params.id);
        this.props.rentInfos === null && this.props.getRentInfoByHouseId(+this.props.match.params.id);
        this.props.reviews === null && this.props.getReviewsByHouseIdOfPage(+this.props.match.params.id, 0);
        this.props.house?.photos.sort((a, b) => b.id - a.id);
    }

    goToUser = () => {
        this.props.history.push('/user');
    }

    handleClick = (event: SyntheticEvent) => {
        const element = event.target as HTMLDivElement;
        element.getAttribute('aria-hidden') && this.setState({datePickerOpen: false})
    }

    setOpen = (open: boolean) => {
        this.setState({datePickerOpen: open});
    }

    render() {
        return (
            this.props.house && this.props.rentInfos && this.props.reviews ?
                <Paper className="house-info" elevation={5} onClick={this.handleClick}>
                    <h2>{this.props.house.name}</h2>
                    <Carousel className="image-card" animation="slide">
                        {this.props.house.photos.map((photo, i) => <HousePhoto photo={photo} key={i}/>)}
                    </Carousel>
                    <div className="description-reserve">
                        <HouseDescription classname="description" description={this.props.house.description}/>
                        <ReserveForm
                            classname="reserve-box"
                            user={this.props.user}
                            house={this.props.house}
                            rentInfos={this.props.rentInfos}
                            goToUser={this.goToUser}
                            open={this.state.datePickerOpen}
                            setOpen={this.setOpen}
                        />
                    </div>
                    <Reviews house_id={this.props.house.id} reviews={this.props.reviews}/>
                </Paper> :
                <h2>The house doesn't exist</h2>
        );
    }
}

function mapStateToProps({user, house, rentInfos, reviews}: ReduxState, ownProps: HouseInfoProps) {
    const id = +ownProps.match.params.id;
    const rentInfoOfHouse = rentInfos?.content.filter(info => info.house.id === id);
    return {
        user: user ? user : null,
        house: house ? house : null,
        rentInfos: rentInfos ? rentInfoOfHouse : null,
        reviews: reviews ? reviews : null
    } as HouseInfoProps;
}

export default connect(mapStateToProps, {
    checkLogin,
    getHouseById,
    getRentInfoByHouseId,
    getReviewsByHouseIdOfPage
})(HouseInfo);

interface HouseInfoProps extends RouteComponentProps<{ id: string }> {
    user: User,
    house: House,
    rentInfos: RentInfo[],
    reviews: Pageable<Review>,
    checkLogin: () => object,
    getHouseById: (id: number) => object,
    getRentInfoByHouseId: (id: number) => object,
    getReviewsByHouseIdOfPage: (house_id: number, page: number) => object
}

interface HouseInfoState {
    datePickerOpen: boolean
}

const HousePhoto = (props: HousePhotoProps) => {
    return (
        <Card elevation={10}>
            <CardMedia
                className="house-img"
                image={props.photo.path}
            />
        </Card>
    )
}

interface HousePhotoProps {
    photo: HouseFile
}