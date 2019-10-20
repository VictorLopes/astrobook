import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';

import {
    Calendar as CalendarBase,
    LocaleConfig
} from 'react-native-calendars'

import 'moment/locale/pt-br';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import { connect } from 'react-redux'

// Constants
import COLORS from '@constants/colors'

LocaleConfig.locales['pt-br'] = {
    monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
    monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul.','Ago','Set.','Out','Nov','Dez'],
    dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'],
    dayNamesShort: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab']
};

LocaleConfig.defaultLocale = 'pt-br';

const moment = extendMoment(Moment);

class Calendar extends Component {

    constructor(props) {
      super(props);

      this.state = {
        initiated: false,
        ranged: false,
        resetSelected: false,
        firstSelection: false,
        date_withdrawal: '',
        date_devolution: '',
        minDate: moment().format("YYYY-MM-DD"),
        current: moment().format("YYYY-MM-DD"),
        markedDates: {},
        whenInitiated: false,
        untilInitiated: false,
        operations: [
            {
                "id": 1,
                "day_week": "DOMINGO",
                "opened": "06:00:00",
                "closed": "22:00:00"
            },
            {
                "id": 2,
                "day_week": "SEGUNDA-FEIRA",
                "opened": "06:00:00",
                "closed": "22:00:00"
            },
            {
                "id": 3,
                "day_week": "TERÇA-FEIRA",
                "opened": "06:00:00",
                "closed": "22:00:00"
            },
            {
                "id": 4,
                "day_week": "QUARTA-FEIRA",
                "opened": "06:00:00",
                "closed": "22:00:00"
            },
            {
                "id": 5,
                "day_week": "QUINTA-FEIRA",
                "opened": "06:00:00",
                "closed": "22:00:00"
            },
            {
                "id": 6,
                "day_week": "SEXTA-FEIRA",
                "opened": "06:00:00",
                "closed": "22:00:00"
            },
            {
                "id": 7,
                "day_week": "SÁBADO",
                "opened": "06:00:00",
                "closed": "22:00:00"
            }
        ]
      };

    }

    renderCalendarDisabledDays = (date) => {
      let calendarHilight = {}
      let operations = this.state.operations
      let startMonth = {}
      let endMonth = {}

      if(date) {
        let month = {}
        if(date.timestamp) {
          month = moment(date.timestamp).set({ day:1, hour:0, minute:0, second:0, millisecond:0 })
        } else {
          month = moment(date).set({ day:1, hour:0, minute:0, second:0, millisecond:0 })
        }

        startMonth = moment(month).startOf('month')
        endMonth = moment(month).endOf('month')
      } else {
        startMonth = moment().startOf('month')
        endMonth = moment().endOf('month')
      }

      let calendarRange = moment.range(startMonth, endMonth);
      let calendarDays = Array.from(calendarRange.by('day'))

      calendarDays = calendarDays.map(day => {
        let index = moment(day).format("YYYY-MM-DD")

        // Check the garage operational days
        let check = operations.some(operation => {
          let _operationDay = operation.day_week.toUpperCase()
          let _day = moment(day).format('dddd')
          _day = _day.toUpperCase()
          let today = moment()
          let dayDiff = moment(today).diff(day, 'days')

          return ((_operationDay == _day) && ( dayDiff <= 0))
        })

        // TODO: To enable Operations Days verification
        if(check) {
          calendarHilight[index] = { disabled: false }
        } else {
          calendarHilight[index] = { disabled: true }
        }

        // TODO: To disable Operations days verification
        // calendarHilight[index] = { disabled: false }

        return index
      })

      this.setState({
        current: moment(endMonth).format("YYYY-MM-DD")
      })

      return calendarHilight
    }

    calendarHilighter = (date, _date_withdrawal, _date_devolution) => {

      let calendarDays = []

      // Hilight the while month with the operational days
      if(date) {
        calendarDays = this.renderCalendarDisabledDays(date)
      } else {
        calendarDays = this.renderCalendarDisabledDays()
      }

      let date_withdrawal = moment(_date_withdrawal).format("YYYY-MM-DD")
      let date_devolution = moment(_date_devolution).format("YYYY-MM-DD")

      // Set the range between the dates
      let range = moment.range(date_withdrawal, date_devolution);
      // Create an array to iterate and find the between dates
      let days = Array.from(range.by('day'))

      calendarDays[date_withdrawal] = {startingDay: true, color: COLORS.PRIMARY};
      calendarDays[date_devolution] = {endingDay: true, color: COLORS.PRIMARY};

      days.filter(_date => {
        let item = moment(_date).format("YYYY-MM-DD")
        if(item != date_withdrawal && item != date_devolution) {
          calendarDays[item] = {color: COLORS.PRIMARY}
        }

        return item
      })

      this.setState({
        markedDates: calendarDays,
      })
    }

    static getDerivedStateFromProps(props, state) {
        if (props.reservation && props.reservation && props.reservation.garage && props.reservation.garage.operations) {
          state = {
            ...state,
            operations: props.reservation.garage.operations,
          };
        }

        if (props.reservation && !state.initiated) {
          state = {
            ...state,
            date_withdrawal: props.reservation.date_withdrawal,
            date_devolution: props.reservation.date_devolution,
            minDate: moment(props.reservation.minDate).format("YYYY-MM-DD"),
            current: moment(props.reservation.current).format("YYYY-MM-DD"),
            initiated: true
          };
        }

      return state
    }

    validateDateSelection = (date) => {

      let operations = this.state.operations
      let validate = false

      // Check the garage operational days
      let check = operations.some(operation => {
        let _operationDay = operation.day_week.toUpperCase()
        let _day = moment(date).format('dddd')
        _day = _day.toUpperCase()

        return _operationDay == _day
      })

      return check
    }

    validateInitialDateSelection = (date) => {

      let operations = this.state.operations
      let month = moment(date.timestamp).set({ day:1, hour:0, minute:0, second:0, millisecond:0 })
      let startMonth = moment(month).startOf('month')
      let endMonth = moment(month).endOf('month')
      let validate = false

      let calendarRange = moment.range(startMonth, endMonth);
      let calendarDays = Array.from(calendarRange.by('day'))

      validate = calendarDays.filter(day => {
        let index = moment(day).format("YYYY-MM-DD")

        // Check the garage operational days
        let check = operations.some(operation => {
          let _operationDay = operation.day_week.toUpperCase()
          let _day = moment(day).format('dddd')
          _day = _day.toUpperCase()
          let today = moment()
          let dayDiff = moment(today).diff(day, 'days')

          return ((_operationDay == _day) && (dayDiff < 1))
        })

        return check && (index == moment(date).format("YYYY-MM-DD"))
      })

      if(validate && validate.length > 0) {
        validate = true
      } else {
        validate = false
      }

      return validate
    }

    handleSelection = (day) => {

      // Validate if the selected day is in the garage operational days
      let validate = this.validateDateSelection(day)
      if(!validate) {
        return
      }

      let date_withdrawal = ''
      let date_devolution = ''

      // The first selection
      if(this.state.firstSelection && !this.state.resetSelected) {
        date_withdrawal = moment(day)
        date_devolution = moment(day)
        this.setState({
          date_withdrawal: moment(day),
          date_devolution: moment(day),
          minDate: moment(day).format("YYYY-MM-DD"),
          firstSelection: false,
        })
      // The second selection
      } else if (!this.state.firstSelection && !this.state.resetSelected){
        date_withdrawal = this.state.date_withdrawal
        date_devolution = moment(day)
        this.setState({
          date_devolution: moment(day),
          resetSelected: true,
          minDate: moment().format("YYYY-MM-DD"),
        })
      // Reset on the third selection
      } else if (!this.state.firstSelection && this.state.resetSelected){
        date_withdrawal = moment(day)
        date_devolution = moment(day)
        this.setState({
          date_withdrawal: moment(day),
          date_devolution: moment(day),
          minDate: moment(day).format("YYYY-MM-DD"),
          resetSelected: false,
          firstSelection: false,
        })
      }

      this.calendarHilighter(day._i, date_withdrawal, date_devolution)

      // Get the interval
      this.setReservationInterval(date_withdrawal, date_devolution)
    }

    setReservationInterval = (date_withdrawal, date_devolution, initialValidation) => {
      let day = {}
      let operations = this.state.operations
      let withdrawalDay = date_withdrawal
      let devolutionDay = date_devolution

      // Validate the initial date on component starts
      if(initialValidation) {
        let validateWithdrawal = this.validateInitialDateSelection(withdrawalDay)

        // Gets the first valide date considering the selected garage operatinal days
        if(!validateWithdrawal) {
          day = this.getTomorrow(operations, withdrawalDay)
          withdrawalDay = day
          devolutionDay = day
        }

        this.setState({
          date_withdrawal: withdrawalDay,
          date_devolution: devolutionDay
        })

        // Makes the calendar first render
        this.calendarHilighter(withdrawalDay, withdrawalDay, devolutionDay)
      }

      // Create the ranges to the slider
      let withdrawalRange = this.getSliderInterval(operations, withdrawalDay)
      let devolutionRange = this.getSliderInterval(operations, devolutionDay)

      let payload = {
        date_withdrawal: moment(withdrawalDay).set({ hour:moment(withdrawalRange.min).format('HH'), minute:0, second:0, millisecond:0 }),
        date_devolution: moment(devolutionDay).set({ hour:moment(devolutionRange.min).format('HH'), minute:0, second:0, millisecond:0 }),
        withdrawalRange: withdrawalRange,
        devolutionRange: devolutionRange,
        whenInitiated: true,
        untilInitiated: true,
      }

      this.props.setReservationInterval(payload)
    }

    // validateSliderInterval = (withdrawalRange, _date_withdrawal) => {
    //   console.log('RANGE ON VALIDATE');
    //
    //   let min = withdrawalRange.min
    //   let max = withdrawalRange.max
    //   let selected = moment(_date_withdrawal).format('YYYY-MM-DD HH:mm:ss')
    //
    //   let now = moment()
    //   let selectedDay = moment(_date_withdrawal)
    //   todayCheck = now.isSame(selectedDay, 'd')
    //
    // }

    getTomorrow = (operations, _selectedDay) => {

      let dayInOperations = false
      let selectedDay = moment(_selectedDay).format("dddd")
      let tomorrow = moment(_selectedDay).add(1, 'days')

      dayInOperations = operations.filter(operation => {
        return operation.day_week.toUpperCase() == selectedDay.toUpperCase()
      })

      if(dayInOperations && dayInOperations.length > 0) {
        return _selectedDay
      } else {
        return this.getTomorrow(operations, tomorrow)
      }
    }

    getSliderInterval = (operations, _selectedDay) => {

      let selectedDay = moment(_selectedDay).format("dddd")
      let dayInOperations = operations.filter(operation => {
        return operation.day_week.toUpperCase() == selectedDay.toUpperCase()
      })

      let openHour = dayInOperations[0].opened.substring(0, 2)
      let closeHour = dayInOperations[0].closed.substring(0, 2);

      let opened = moment(_selectedDay).set({ hour:openHour, minute:0, second:0, millisecond:0 })
      let closed = moment(_selectedDay).set({ hour:closeHour, minute:0, second:0, millisecond:0 })
      opened = moment(opened).format("YYYY-MM-DD HH:mm")
      closed = moment(closed).format("YYYY-MM-DD HH:mm")

      // Set the range between opened and closed
      let range = moment.range(opened, closed);

      // Create an array to iterate and find the between opened and closed
      let hours = Array.from(range.by('hour'));
      hours = hours.map(hour => {
        let hourTitle = parseInt(moment(hour).format('HH'))
        hourTitle = hourTitle < 10 ? parseInt(`0${hourTitle}`) : hourTitle
        let value = hourTitle

        let name = ''
        if(parseInt(openHour) % 2 == 0) {
          name = hourTitle % 2 ? '' : `${hourTitle}h`
        } else {
          name = hourTitle % 2 ? `${hourTitle}h` : ''
        }

        return {name: name, value: value}
      })

      let data = {
        min: opened,
        max: closed,
        hours: hours,
      }

      return data
    }

    componentDidMount = () => {
      this.setReservationInterval(this.state.date_withdrawal, this.state.date_devolution, true)
    }

    render() {
      return (
        <CalendarBase
          {...this.props}
          markedDates={ this.state.markedDates }
          current={ this.state.current }
          minDate={ this.state.minDate }
          onDayPress={ (day) => { this.handleSelection(moment(day).subtract(1, 'month')) } }
          onMonthChange={ (month) => { this.calendarHilighter(month, this.state.date_withdrawal, this.state.date_devolution) }}
        />
      )
    }
}

const mapStateToProps = state => ({
    reservation: state.reservation.reservation,
});

const mapDispatchToProps = dispatch => ({
    setReservationInterval(payload) {
        dispatch({
            type: 'RESERVATION_SET_INTERVAL_TRIGGER',
            payload: payload
        });
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(Calendar));
