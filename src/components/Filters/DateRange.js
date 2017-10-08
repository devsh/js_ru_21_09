import React, { Component } from 'react'
import DayPicker, { DateUtils } from 'react-day-picker'
import { connect } from 'react-redux'
import { articleFilterRangeChanged } from '../../AC'

import 'react-day-picker/lib/style.css'

class DateRange extends Component {
    handleDayClick = (day) => this.props.articleFilterRangeChanged(DateUtils.addDayToRange(day, this.props))

    render() {
        const { from, to } = this.props
        
        const selectedRange = from && to && `${from.toDateString()} - ${to.toDateString()}`
        return (
            <div className="date-range">
                <DayPicker
                    selectedDays={ day => DateUtils.isDayInRange(day, { from, to }) }
                    onDayClick={ this.handleDayClick }
                />
                {selectedRange}
            </div>
        )
    }

}

export default connect((state) => {
    return {
        from: state.articles.filter.from,
        to: state.articles.filter.to
    }
}, {
    articleFilterRangeChanged
})(DateRange)