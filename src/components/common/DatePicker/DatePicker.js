import React, { memo } from 'react'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Proptypes from 'prop-types'

import { util } from '../../../util'

/**
 *
 * @param selectedDate {String} -> The date that is selected or null.
 * @param handleDateChange {Callback} -> Callback function that triggers on change of date
 * @param name {String} -> Uniquely identified name of date picker
 * @param label {String} -> Uniquely identified label of date picker
 * @param error {String} -> Custom error message that is displayed below date picker
 * @param size {String} -> Size of date picker
 * @returns {*}
 * @constructor
 */

const theme = createMuiTheme({
    overrides: {
        MuiPickersDay: {
            daySelected: {
                '&:hover': {
                    backgroundColor: 'rgb(0, 128, 95)',
                },
                backgroundColor: 'rgb(0, 128, 95)',
            },
            current: {
                color: 'rgb(0, 128, 95)',
                backgroundColor: '#f5f5f5',
            },
        },
        MuiPickersToolbar: {
            toolbar: {
                backgroundColor: 'rgb(0, 128, 95)',
            },
        },
        MuiButton: {
            textPrimary: {
                color: 'rgb(0, 128, 95)',
            },
            label: {
                fontSize: '4rem',
            },
        },
        MuiFormLabel: {
            root: {
                fontSize: '4rem',
                color: 'rgb(168,168,168)',
                fontWeight: 'bold',
            },
        },
        MuiFormControl: {
            root: {
                marginTop: 0,
                marginBottom: 0,
                width: 'inherit',
            },
            marginNormal: {
                marginTop: 0,
                marginBottom: 0,
            },
        },
        MuiOutlinedInput: {
            inputAdornedEnd: {
                fontSize: '3.5rem',
                paddingRight: '0rem !important',
                color: '#5b616b',
            },
            notchedOutline: {
                height: '14.3rem',
                borderStyle: 'solid',
                borderColor: '#d5d5d7',
            },
        },
        MuiPickersToolbarText: {
            toolbarTxt: {
                fontSize: '4rem',
            },
        },
        MuiTypography: {
            alignCenter: {
                fontSize: '4rem',
            },
            colorInherit: {
                fontSize: '3rem',
            },
            subtitle1: {
                fontSize: '3rem',
            },
            h5: {
                fontSize: '3rem',
            },
        },
        MuiPickersCalendarHeader: {
            dayLabel: {
                fontSize: '3rem',
            },
        },
        MuiPickersBasePicker: {
            pickerView: {
                minHeight: '40rem',
            },
        },
        MuiPickersCalendar: {
            transitionContainer: {
                minHeight: '54rem',
            },
        },
        MuiSvgIcon: {
            root: {
                fontSize: '5.5rem',
            },
        },
        MuiFormHelperText: {
            root: {
                fontSize: '3.5rem',
            },
        },
        MuiInputLabel: {
            outlined: {
                fontFamily: 'Roboto, sans-serif',
                color: '#5b616b',
                fontSize: '4.5rem',
            },
        },
    },
})

const useStyles = makeStyles(theme => ({
    outlinedRoot: {
        '&:hover $notchedOutline': {
            borderColor: '#d5d5d7',
        },
        '&$focused $notchedOutline': {
            borderColor: '#d5d5d7',
            borderWidth: 2,
        },
    },
    notchedOutline: {},
    focused: {},
}))

const DatePicker = ({ selectedDate, handleDateChange, name, label, error, size, ...rest }) => {
    const classes = useStyles()
    const InputProps = {
        classes: {
            root: classes.outlinedRoot,
            notchedOutline: classes.notchedOutline,
            focused: classes.focused,
            button: classes.textPrimary,
        },
    }

    return (
        <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <div className={util.joinClasses('picker', size)}>
                    <KeyboardDatePicker
                        name={name}
                        label={label}
                        variant={'inline'}
                        autoOk={true}
                        format={'MM/DD/YYYY'}
                        margin={'normal'}
                        placeholder={'Select Date'}
                        value={selectedDate}
                        // inputValue={moment(selectedDate).format('MM/DD/YYYY')}
                        onChange={(value, date) => handleDateChange(date, name)}
                        inputVariant={'outlined'}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        InputProps={InputProps}
                        {...rest}
                    />
                    <span className={'picker__error'}>{error}</span>
                </div>
            </MuiPickersUtilsProvider>
        </MuiThemeProvider>
    )
}

DatePicker.propTypes = {
    selectedDate: Proptypes.string,
    handleDateChange: Proptypes.func,
    name: Proptypes.string,
    label: Proptypes.string,
    error: Proptypes.string,
    size: Proptypes.string,
}

export default memo(
    DatePicker,
    (prevProps, nextProps) =>
        !(
            prevProps.selectedDate !== nextProps.selectedDate ||
            prevProps.disabled !== nextProps.disabled ||
            prevProps.minDate !== nextProps.minDate ||
            prevProps.error !== nextProps.error
        )
)
