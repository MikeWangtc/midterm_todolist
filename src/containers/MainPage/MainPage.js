import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './assets/css/main.css'

import DashBoard from './DashBoard';
import Map from './Map';
import BriefTable from './BriefTable';
import DetailTable from './DetailTable';
import TrafficTable from './TrafficInfoTable'

import { myCompare } from './../../models/utils';

class MainPage extends Component{
    constructor(props){
        super(props); 
        this.state = {
            itemList  : [],             // {context, date, time, location, isDone, id}
            discardedItems: [],         // store id
            revisedItems: [],           // store object
            tasksDisplayOnMap: [],      // store {id, date, time} for sorting
            trafficInfoList: [],        // store {task1:{context, address, location}, task2:{...}, info}
            displayMode : "all",
            email: props.email,
            userName: props.userName,
            userLocation: props.userLocation
        };
    }
    async componentDidMount() {
        const option = {
            method: 'POST',
            body: JSON.stringify({email: this.state.email}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        try{
            const res = await fetch('/todolist', option);
            const resJSON = await res.json();
            this.setState({itemList: resJSON});
        }
        catch(err){
            console.log('failed to fetch data from DB to render TODOlist');
            console.log(err);
        }
    }
    handleAddTask = task => {
        let newTask = task;
        delete newTask['email'];
        this.setState(state => ({
            itemList: state.itemList.concat([task])
        }), () => console.log(this.state.itemList));
    }
    handleCheckBox = (mode, id) => {
        //console.log('revisedItems', this.state.revisedItems);
        const { revisedItems } = this.state;

        // The task hasn't been revised
        if(revisedItems.filter(task => task.id === id).length === 0){
            //console.log('first revision');
            this.setState(state => ({
                revisedItems: state.revisedItems.concat([{id: id, isDone: mode}])
            }))
            //}), () => console.log(`first : ${mode? 'check': 'uncheck'}`,this.state.revisedItems));
        }
        else{
            //console.log('has been revised');
            this.setState(state => {
                let newList = state.revisedItems.map(task => {
                    if(task.id === id) task.isDone = mode;
                    return task;
                })
                return { revisedItems: newList };
            })
            //}, () => console.log(`revised : ${mode? 'check': 'uncheck'}`,this.state.revisedItems));
        }

        this.setState(state => {
            let newItemList = state.itemList.map(task => {
                if (task.id === id) task.isDone = mode;
                return task;
            })
            return { itemList: newItemList };
        });
    }
    handleDeleteTask = (event, id) => {
        this.setState(state => ({
            discardedItems: state.discardedItems.concat([id])
        }));
        this.setState(state => ({
            itemList: state.itemList.filter(task => task.id !== id)
        }));
    };
    handleClearComleted = event => {
        const { itemList } = this.state;
        const taskAreDone = (itemList.filter(task => task.isDone)).map(task => task.id);
        if(taskAreDone.length > 0){
            this.setState(state => ({
                discardedItems: state.discardedItems.concat(taskAreDone)
            }));
            this.setState(state => ({ itemList: state.itemList.filter(task => !task.isDone) }));
        }
    }
    handleEditTask = (event, id) => {
        // TODOS
    }
    handleFilterDisplayMode = (event, mode) => {
        switch (mode){
          case 'all': this.setState({displayMode: 'all'}); break;
          case 'active': this.setState({displayMode: 'active'}); break;
          case 'completed': this.setState({displayMode: 'completed'}); break;
        }
    }


    handleTasksDisplayOnMap = (mode, id, date, time) => {
        // mode = true => ON, mode = false => OFF
        if(mode){
            this.setState(state => {
                const newList = state.tasksDisplayOnMap.concat([{id: id, date: date, time: time}]).sort(myCompare);
                return({ tasksDisplayOnMap: newList });
            });
        }
        else{
            this.setState(state => ({
                tasksDisplayOnMap: state.tasksDisplayOnMap.filter(elem => elem.id !== id)
            }));
        }
    }
    handleLocationUpdate = (location, id) => {
        const { revisedItems } = this.state;
        if(revisedItems.filter(task => task.id === id).length === 0){
            this.setState(state => ({
                revisedItems: state.revisedItems.concat([{ id: id, location:location }])
            }), () => console.log('revisedItems', this.state.revisedItems));
            //}));
        }
        else{
            this.setState(state => {
                let newList = state.revisedItems.map(task => {
                    if(task.id === id) task.location = location;
                    return task;
                })
                return { revisedItems: newList };
            }, () => console.log('revisedItems', this.state.revisedItems));
            //});
        }
        this.setState(state => {
            let newItemList = state.itemList.map(task => {
                if (task.id === id) task.location = location;
                return task;
            })
            return { itemList: newItemList };
        });
    }

    handleTasksTrafficInfo = (mode, theTaskID, info) => {
        console.log(this.state.trafficInfoList);
        if(mode){
            this.setState(state => ({
                trafficInfoList: state.trafficInfoList.concat([info])
            }));
        }
        else{
            this.setState(state => ({
                trafficInfoList: state.trafficInfoList.filter(
                    route => route.prevTask.id !== theTaskID && route.theTask.id !== theTaskID )
            }));
        }
    }


    handleLogOut = event => {
        console.log('discard items:', this.state.discardedItems);
        console.log('revised items:', this.state.revisedItems);
        this.saveRevisedTasksToDB();
    }
    saveRevisedTasksToDB = async () => {
        const { email, discardedItems, revisedItems } = this.state;
        const body = {
            email: email,
            discardedItems: discardedItems,
            revisedItems: revisedItems
        }
        const option = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        try{
            await fetch('/logout', option); 
        }catch(err){
            console.log('failed to save revised tasks to DB');
            console.log(err);
        }
    }


    render(){
        const { onPageChange } = this.props;
        const { email, userName, userLocation, itemList, displayMode, tasksDisplayOnMap, trafficInfoList} = this.state;
        return(
            <div>
                <div id="wrapper" style={{display:"flex", flexDirection:"column", height:"100%", overflow:"scroll"}}>
                    
                    <DashBoard email={email} userName={userName} onClick_add={this.handleAddTask} 
                                                                 onPageChange={onPageChange} 
                                                                 onLogOut={this.handleLogOut}
                    />
                    <Route path='/todolist' component={()=> <section id="one">
                                                                <div className="container" data-position="center">
                                                                    <header className="major">
                                                                        <h2> TODOS </h2>
                                                                    </header>
                                                                </div>
                                                            </section>}
                    />
                    <Route path='/todolist' component={() => <DetailTable itemList={itemList}
                                                                          displayMode={displayMode}
                                                                          onClick_clear={this.handleClearComleted}
                                                                          onClick_check={this.handleCheckBox}
                                                                          onClick_delete={this.handleDeleteTask}
                                                                          onClick_filter={this.handleFilterDisplayMode}
                                                             />} 
                    />
                    <Route path="/taskmap" component={() => <BriefTable activeList={itemList.filter(task => !task.isDone).sort(myCompare)}
                                                                        displayList={tasksDisplayOnMap}
                                                                        userLocation={userLocation}
                                                                        onClick_check={this.handleTasksDisplayOnMap}
                                                                        updateLocation={this.handleLocationUpdate}
                                                                        updateTrafficInfo={this.handleTasksTrafficInfo}
                                                            />} 
                    />
                    <Route path="/taskmap/map" component={() => <Map position={userLocation} 
                                                                     displayList={
                                                                        itemList.filter(task => {
                                                                            return (tasksDisplayOnMap.filter(elem => elem.id === task.id).length !== 0);
                                                                        })
                                                                     }
                                                            />}
                    />
                    <Route path="/taskmap/trafficinfo" component={() => <TrafficTable list={trafficInfoList}/>} />

                </div>
                
                <div id="titleBar">
                    <a href="#header" className="toggle"></a>
				    <span className="title"><a href="#">{userName}</a></span>
			    </div>
            </div>
        );
    }
}
export default MainPage;