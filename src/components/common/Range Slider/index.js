// import React, { memo } from 'react'
// import Slider from '@material-ui/core/Slider'
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
// import { makeStyles } from '@material-ui/core/styles'
//
// const useStyles = makeStyles({
//     root: { width: 400 },
// })
//
// const theme = createMuiTheme({
//     overrides: {
//         MuiSlider: {
//             root: { color: '#00805f', fontSize: '4rem' },
//             rail: { height: '4px', backgroundColor: '#ddd' },
//             track: { height: '4px', backgroundColor: '#00805f' },
//             mark: { height: '0px' },
//             markLabel: { fontSize: '4rem', color: 'black' },
//             thumb: {
//                 height: '14px',
//                 width: '14px',
//                 border: '1px solid grey',
//                 backgroundColor: '#ffffff',
//             },
//         },
//         PrivateValueLabel: {
//             offset: { fontSize: '2rem' },
//             circle: { height: '7rem', width: '7rem' },
//         },
//     },
// })
//
// export const RangeSlider = memo(({ marks, value, handleChange }) => {
//     const classes = useStyles()
//     return (
//         <MuiThemeProvider theme={theme}>
//             <div className={classes.root}>
//                 <Slider
//                     marks={marks}
//                     value={value}
//                     onChange={handleChange}
//                     valueLabelDisplay="auto"
//                     aria-labelledby="range-slider"
//                 />
//             </div>
//         </MuiThemeProvider>
//     )
// })
