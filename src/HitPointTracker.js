import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import classNames from 'classnames' //I have no idea what this does.

//Remember that you can name this whatever as long as you import from the right
//place. That's because the place you're importing from uses "export default," I think.
import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

function HitPointTrackerFunction(props) {
  return (
    <div className = "hp-tracker">
      <p> HP for <b> { props.name } </b>: { props.currentHp }/{ props.maxHp } </p>

      <Button
        variant="fab"
        color = "primary"
        aria-label="Remove"
        className={ props.button }
        onClick={ props.onClickSubtract }
        >
        <RemoveIcon/>
      </Button>

      <Button
        variant="fab"
        color = "primary"
        aria-label="Add"
        className={ props.button }
        onClick={ props.onClickAdd }
        >
        <AddIcon/>
      </Button>
    </div>
  )
}

export default HitPointTrackerFunction;
export { HitPointTrackerFunction } ;