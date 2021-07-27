import React, {SyntheticEvent} from "react";
import {Button, Card, CardContent, Snackbar} from "@material-ui/core";
import {DatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import "./ReserveForm.scss"
import {connect} from "react-redux";
import {addRentInfo} from "../../actions/rent.action";
import {RentInfo} from "../../shared/model/RentInfo";
import {House} from "../../shared/model/House";
import {User} from "../../shared/model/User";

class ReserveForm extends React.Component<ReserveFormProps, ReserveFormState> {

    constructor(props: ReserveFormProps) {
        super(props);
        const today = new Date();
        const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
        this.state = {
            checkInDate: today,
            checkOutDate: tomorrow,
            // open: false,
            isTenant: true
        }
    }

    handleCheckInDateChange = (date: MaterialUiPickersDate) => {
        this.setState({
            ...this.state,
            checkInDate: date,
            // open: true
        })
        this.props.setOpen(true);
    }

    handleCheckOutDateChange = (date: MaterialUiPickersDate) => {
        console.log(date)
        this.setState({
            ...this.state,
            checkOutDate: date,
            // open: !this.state.open
        });
        this.props.setOpen(!this.props.open);
        console.log(this.props.open);
    }

    handleCheckOutDateClick = (event: SyntheticEvent) => {
        const element = event.target as HTMLDataElement;
        console.log(element);
        if (element.id === 'check-out') {
            this.setState({
                ...this.state,
                // open: true
            })
            this.props.setOpen(true);
        }
    }

    minCheckOutDate = () => {
        const checkIn = this.state.checkInDate!;
        return new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate() + 1);
    }

    handleSubmitReserve = () => {
        const tenant = this.props.user;
        if (tenant && tenant.type === 'tenant') {
            const rentInfo = {
                tenant: tenant,
                house: this.props.house,
                enterDate: this.state.checkInDate!,
                leaveDate: this.state.checkOutDate!
            } as RentInfo;
            console.log(rentInfo);
            this.props.addRentInfo(rentInfo);
            this.props.goToUser();
        }
        else {
            this.setState({...this.state, isTenant: false});
        }
    }

    isDayBetween = (day: MaterialUiPickersDate, date1: Date, date2: Date) => {
        date1 = new Date(date1);
        date2 = new Date(date2);
        day = new Date(day!.getFullYear(), day!.getMonth(), day!.getDate());
        date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
        date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
        return day.getTime() >= date1.getTime() && day.getTime() <= date2.getTime();
    }

    disableDate(day: MaterialUiPickersDate) {
        for (const info of this.props.rentInfos) {
            if (this.isDayBetween(day, info.enterDate, info.leaveDate)) {
                return true;
            }
        }
        return false;
    }

    render() {
        console.log(this.props);
        console.log(this.state);
        return (
            <Card elevation={10} className={`${this.props.classname} reserve-form`}>
                <CardContent>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker
                            className="date-picker"
                            autoOk
                            disablePast
                            inputVariant="standard"
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="check-in"
                            label="CHECK-IN"
                            value={this.state.checkInDate}
                            onChange={this.handleCheckInDateChange}
                            shouldDisableDate={this.disableDate.bind(this)}
                        />
                        <span>
                            <DatePicker
                                autoOk
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="check-out"
                                label="CHECK-OUT"
                                open={this.props.open}
                                minDate={this.minCheckOutDate()}
                                value={this.state.checkOutDate}
                                onChange={this.handleCheckOutDateChange}
                                onClickCapture={this.handleCheckOutDateClick}
                                shouldDisableDate={this.disableDate.bind(this)}
                            />
                        </span>
                    </MuiPickersUtilsProvider>
                </CardContent>
                <CardContent>
                    <Button
                        onClick={this.handleSubmitReserve}
                        variant="contained"
                        color="primary"
                    >
                        Reserve
                    </Button>
                </CardContent>
                <Snackbar
                    open={!this.state.isTenant}
                    autoHideDuration={2000}
                    onClose={() => {this.setState({...this.state, isTenant: true})}}
                    message={'Please login as tenant!'}
                />
            </Card>
        );
    }
}

export default connect(null , {addRentInfo})(ReserveForm);

interface ReserveFormProps {
    classname: string,
    user: User,
    house: House,
    rentInfos: RentInfo[],
    open: boolean,
    setOpen: (state: boolean) => void,
    addRentInfo: (rentInfo: RentInfo) => object,
    goToUser: () => void
}

interface ReserveFormState {
    checkInDate: MaterialUiPickersDate,
    checkOutDate: MaterialUiPickersDate,
    // open: boolean | undefined,
    isTenant: boolean | undefined
}