import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckBox from '../../components/Switch4Table';
import { geocoder, geoDecoder, getDirection } from './../../models/utils'

const styles = theme => ({
    root: {
      width: '100%',
      height: '40vh',
      padding: '10px',
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
});


class SimpleTable extends React.Component {
	handleClick = task => target => {
		const { userLocation, activeList, displayList, updateLocation, updateTrafficInfo, onClick_check } = this.props;
		let prevTask = {
			id: 0,
			context: 'My location',
			location: userLocation,
		}

		if(displayList.length !== 0){
			const last = activeList.filter(task => task.id === displayList[displayList.length - 1].id);
			prevTask = last[0];
		}
		geocoder(task, updateLocation);

		if(target.checked) getDirection(prevTask, task, updateTrafficInfo);
		else updateTrafficInfo(false, task.id, []);

		onClick_check(target.checked, task.id, task.date, task.time);
	}
	render() {
		const { classes, activeList, displayList } = this.props;
		return(
		<div style={{margin: '20px',}}>
			<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
				<TableRow>
					<TableCell>Display on Map</TableCell>
					<TableCell>Task Description</TableCell>
					<TableCell>Location</TableCell>
					<TableCell align="right">Date</TableCell>
					<TableCell align="right">Time(24hr)</TableCell>
				</TableRow>
				</TableHead>
				<TableBody>
				{activeList.map(task => {
					// Whether the task has been selected to display on the map
					const isSelected = displayList.filter(elem => elem.id === task.id).length === 0 ? false : true;
					return(
						<TableRow key={task.id}>
						<TableCell> 
							<CheckBox onClick={this.handleClick(task)} id={task.id} checked={isSelected} />
						</TableCell>
						<TableCell component="th" scope="row">
							{task.context}
						</TableCell>
						<TableCell>{task.location.address}</TableCell>
						<TableCell align="right">{task.date}</TableCell>
						<TableCell align="right">{task.time}</TableCell>
						</TableRow>
					);
					}
				)}
				</TableBody>
			</Table>
			</Paper>
		</div>
		)
	};
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
  activeList: PropTypes.array.isRequired,
  displayList: PropTypes.array.isRequired,
  userLocation: PropTypes.object.isRequired,
  onClick_check: PropTypes.func.isRequired,
  updateLocation: PropTypes.func.isRequired,
  updateTrafficInfo: PropTypes.func.isRequired,
};

export default withStyles(styles)(SimpleTable);