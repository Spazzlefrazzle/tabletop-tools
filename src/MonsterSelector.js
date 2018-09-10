import React, { Component } from 'react';
import Button from '@material-ui/core/Button'
import classNames from 'classnames' //I have no idea what this does.
import DetailsIcon from '@material-ui/icons/Details'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'

import {HitPointTrackerFunction} from './HitPointTracker'

import { getModifyHpAction } from './Actions'

class MonsterSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monsterId : 1,
      tempMonsterName : 'DEFAULT_NAME',
      tempMonsterMaxHp : '100',
      tempMonsterCurrentHp : '100'
    };

    //Are these lines necessary?
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.importMonster = this.importMonster.bind(this);
  }


  handleSelectionChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  }

  importMonster(event) {
    this.fetchMonsterStats(this.state.monsterId);
  }

  //I feel like there's a more elegant way to write this.
  handleModifyHp(changeValue) {
      let newCurrentHp = this.state.tempMonsterCurrentHp + changeValue;
      this.setState( { tempMonsterCurrentHp: newCurrentHp });
    }

  onClickSubtract = () => {
    this.handleModifyHp(-1);
  }

  onClickAdd = () => {
      this.props.onModifyHp(
        { monsters: { 1: { name: "DefaultName", maxHp: 5, currentHp:5 }}},
        getModifyHpAction(1, 1)
     );
      //this.handleModifyHp(+1);
  }

  fetchMonsterStats(monsterId) {
     fetch(`http://www.dnd5eapi.co/api/monsters/${monsterId}`) //Call the endpoint, get the HTTP response
     .then(response => response.json())                        //From the HTTP response, pull out the JSON
     .then(responseData => {                                   //From the JSON, pull out the stuff we need.
       this.setState(
         {
           tempMonsterName : responseData.name,
           tempMonsterMaxHp : responseData.hit_points,
           tempMonsterCurrentHp : responseData.hit_points
         }
       )
     })
   }

  render() {
    let hitPointTracker;

    return (
      <div>
        <TextField
          label="Monster ID"
          id="simple-start-adornment"
          className={classNames(this.props.margin, this.props.textField)}
          InputProps={{
            endAdornment: <Button variant="fab"
                            color = "secondary"
                            aria-label="Import"
                            className={ this.props.button }
                            onClick={ this.importMonster }
                            mini
                          >
                            <DetailsIcon/>
                          </Button>,
          }}
          onChange = { this.handleSelectionChange('monsterId') }
        />

        <HitPointTrackerFunction
            name={this.state.tempMonsterName}
            maxHp={this.state.tempMonsterMaxHp}
            currentHp={this.state.tempMonsterCurrentHp}
            onClickAdd={ this.onClickAdd }
            onClickSubtract={ this.onClickSubtract }
        />

      </div>
    )
  }
}

export default MonsterSelector;
