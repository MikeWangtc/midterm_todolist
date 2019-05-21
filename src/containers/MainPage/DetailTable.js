import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import AllTodoIcon from '@material-ui/icons/List';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import UndoneIcon from '@material-ui/icons/Help';
import { lighten } from '@material-ui/core/styles/colorManipulator';


function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'context', numeric: false, disablePadding: true, label: 'TODO' },
  { id: 'location', numeric: true, disablePadding: false, label: 'Location' },
  { id: 'date', numeric: true, disablePadding: false, label: 'Date' },
  { id: 'time', numeric: true, disablePadding: false, label: 'Time(24hr)' },
  { id: 'edit/delete', numeric: false, disablePadding: false, label: 'edit/delete'}
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'justify'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, onFilter, onClear } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subtitle1">
            {numSelected} tasks have done!
          </Typography>
        ) : (
          <Typography variant="h6" id="tableTitle">
            TODO list
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <div style={{display: 'flex'}}>
                {numSelected > 0 ? (
                <Tooltip title="Clear all completed Todos">
                    <IconButton aria-label="Clear Todo" onClick={onClear}>
                    <DeleteIcon />
                    </IconButton>
                </Tooltip>
                ) : (<div />)}
                <Tooltip title="All of the Todos">
                    <IconButton aria-label="All Todo" onClick={(event) => onFilter(event, 'all')}>
                    <AllTodoIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Active Todo">
                    <IconButton aria-label="Active Todo" onClick={(event) => onFilter(event, 'active')}>
                    <UndoneIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Completed Todo">
                    <IconButton aria-label="Completed Todo" onClick={(event) => onFilter(event, 'completed')} >
                    <CheckCircleIcon />
                    </IconButton>
                </Tooltip>
        </div>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onFilter: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
    height: 'auto'
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class EnhancedTable extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            order: 'asc',
            orderBy: 'date',
            selected: (props.itemList.filter(task => task.isDone)).map(task => task.id),
            data: props.itemList,
            page: 0,
            rowsPerPage: 5,
        };
    }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);

    if(selectedIndex === -1) this.props.onClick_check(true, id);
    else this.props.onClick_check(false, id);
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;


  render() {
    const { classes, onClick_clear, onClick_delete, onClick_filter, displayMode } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    let filteredData = Array;
    switch(displayMode){
        case 'all': filteredData = data; break;
        case 'active': filteredData = data.filter(todo => !todo.isDone); break;
        case 'completed': filteredData = data.filter(todo => todo.isDone); break;
    }
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredData.length - page * rowsPerPage);

    return (
        <section>
            <div style={{margin: '10px auto', padding:'10px'}}>
            <Paper className={classes.root}>
                <EnhancedTableToolbar numSelected={selected.length} onFilter={onClick_filter} onClear={onClick_clear}/>
                <div className={classes.tableWrapper}>
                <Table className={classes.table} aria-labelledby="tableTitle">
                    <EnhancedTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={this.handleSelectAllClick}
                    onRequestSort={this.handleRequestSort}
                    rowCount={filteredData.length}
                    />
                    <TableBody>
                    {stableSort(filteredData, getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(n => {
                        const isSelected = this.isSelected(n.id);
                        return (
                            <TableRow
                            hover
                            onClick={event => this.handleClick(event, n.id)}
                            role="checkbox"
                            aria-checked={isSelected}
                            tabIndex={-1}
                            key={n.id}
                            selected={isSelected}
                            >
                            <TableCell padding="checkbox">
                                <Checkbox checked={isSelected}/>
                            </TableCell>
                            <TableCell component="th" scope="row" padding="none">{n.context}</TableCell>
                            <TableCell align='justify'>{n.location.address}</TableCell>
                            <TableCell align="right">{n.date}</TableCell>
                            <TableCell align="right">{n.time}</TableCell>
                            <TableCell>
                                <IconButton aria-label="Edit" >
                                    <EditIcon />
                                </IconButton>
                                <IconButton aria-label="Delete" onClick={event => onClick_delete(event, n.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                            </TableRow>
                        );
                        })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                        <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
                </div>
                <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={filteredData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
            </div>
        </section>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  itemList: PropTypes.array.isRequired,
  displayMode: PropTypes.string.isRequired,
  onClick_clear: PropTypes.func.isRequired,
  onClick_check: PropTypes.func.isRequired,
  onClick_delete: PropTypes.func.isRequired,
  onClick_filter: PropTypes.func.isRequired,
};

export default withStyles(styles)(EnhancedTable);