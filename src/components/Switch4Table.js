import React from 'react';
//import CheckBox from '@material-ui/core/Checkbox';

export default class extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			checked: props.checked,
		};
	}
	handleChange = event => {
		const target = event.target;
		this.setState({ checked: target.checked });
		this.props.onClick(target);
	};

	render() {
		const { id } = this.props;
		return (
			<div>
                <input type="checkbox" id={id} checked={this.state.checked} onChange={this.handleChange}/>
                <label htmlFor={id}/>
            </div>
		);
	}
}