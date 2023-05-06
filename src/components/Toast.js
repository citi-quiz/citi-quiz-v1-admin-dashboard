import React from 'react';
import Alert from '@mui/material/Alert';

function Toast({
    props
}) {
  return (
    <div>
        <Alert severity="success" color="info" style={{ zIndex:100, position:'absolute',marginTop:-60, marginLeft:25 }}>
            This is a success alert — check it out!
        </Alert>
    </div>
  )
}

export default Toast