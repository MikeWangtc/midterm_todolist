import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { cleanString } from '../../models/utils'

const styles = theme => ({
    root: {
      width: '100%',
      height: '50vh',
      padding: '10px',
      overflow: 'auto',
    },
    table: {
      minWidth: 700,
    },
});


class SimpleTable extends React.Component {
	state = {
		list: this.props.list
	}

	static getDerivedStateFromProps(nextProps, prevState){
		if (prevState.list !== nextProps.list) {
      return {
        list: nextProps.list
      };
    }
    // Return null to indicate no change to state.
    return null;
	}

	render() {
		const { classes } = this.props;
		const { list } = this.state;
		return(
		<div style={{margin: '20px',}}>
			<Paper className={classes.root}>
			<Table className={classes.table}>
				<TableHead>
				<TableRow>
					<TableCell>Now</TableCell>
					<TableCell>Next TODO</TableCell>
					<TableCell>Location / Route Direction</TableCell>
					<TableCell>Distance</TableCell>
					<TableCell>Duration</TableCell>
				</TableRow>
				</TableHead>
				<TableBody>
				{list.map(elem => {
					let rtn = [<TableRow >
											<TableCell>{elem.prevTask.context}</TableCell>
											<TableCell>{elem.theTask.context}</TableCell>
											<TableCell>[{elem.prevTask.address}][{elem.theTask.address}]</TableCell>
											<TableCell></TableCell>
											<TableCell></TableCell>
										</TableRow>];
					let info = (elem.info.map(route => (
							<TableRow>
								<TableCell></TableCell>
								<TableCell></TableCell>
								<TableCell>{cleanString(route.instructions)}</TableCell>
								<TableCell>{cleanString(route.distance)}</TableCell>
								<TableCell>{cleanString(route.duration)}</TableCell>
							</TableRow>
					)));
					return rtn.concat(info);
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
  list: PropTypes.array.isRequired,
};

export default withStyles(styles)(SimpleTable);