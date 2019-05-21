import 'date-fns';
import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker, DatePicker } from 'material-ui-pickers';

const styles = {
    grid: {
        width: '100%',
        height: '100%'
    },
};
class MaterialUIPickers extends React.Component {
    render() {
        const {classes, selectedDate, onChange} = this.props;
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container className={classes.grid} justify="space-around">
                <DatePicker
                    margin="normal"
                    label="Date"
                    value={selectedDate}
                    onChange={onChange}
                    disablePast
                />
                <TimePicker
                    margin="normal"
                    label="Time"
                    value={selectedDate}
                    onChange={onChange}
                    minutesStep={10}
                    disablePast
                />
                </Grid>
            </MuiPickersUtilsProvider>
        );
    }
}

MaterialUIPickers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MaterialUIPickers);