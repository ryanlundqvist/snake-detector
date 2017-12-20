import React from "react";
import _ from "lodash";
import moment from "moment";
import { Row, Col } from "react-bootstrap";
import DateHistogram from "./date_histogram";
import TorqueMap from "./torque_map";

const Observations = ( { data, user, year } ) => {
  const series = {};
  if ( data.month_histogram ) {
    series.month = {
      title: "Per Month",
      data: _.map( data.month_histogram, ( value, date ) => ( { date, value } ) ),
      style: "bar",
      color: "rgba( 80%, 80%, 80%, 0.5 )",
      label: d => `<strong>${moment( d.date ).format( "MMMM" )}</strong>: ${d.value}`
    };
  }
  if ( data.week_histogram ) {
    series.week = {
      title: "Per Week",
      data: _.map( data.week_histogram, ( value, date ) => ( { date, value } ) ),
      color: "#a8cc09",
      style: "bar",
      label: d => `<strong>Week of ${moment( d.date ).format( "LL" )}</strong>: ${d.value}`
    };
  }
  if ( data.day_histogram ) {
    series.day = {
      title: "Per Day",
      data: _.map( data.day_histogram, ( value, date ) => ( { date, value } ) ),
      color: "#74ac00"
    };
  }
  const comparisonSeries = {};
  if ( data.day_histogram && data.day_last_year_histogram ) {
    comparisonSeries.this_year = {
      title: "This Year",
      data: _.map( data.day_histogram, ( value, date ) => ( { date, value } ) ),
      color: "#74ac00"
    };
    comparisonSeries.last_year = {
      title: "Last Year",
      data: _.map( data.day_last_year_histogram, ( value, date ) => {
        const year = parseInt( date.match( /\d{4}/ )[0], 0 );
        const newYear = year + 1;
        const newDate = date.replace( year, newYear );
        return { date: newDate, value };
      } ),
      color: "rgba( 80%, 80%, 80%, 1 )"
    };
  }
  return (
    <div className="Observations">
      <h2>{ I18n.t( "observations" ) }</h2>
      <h3>Verifiable Observations By Observation Date</h3>
      <DateHistogram series={ series } />
      <h3>This Year vs. Last Year</h3>
      <DateHistogram series={ comparisonSeries } />
      <h3>Animated Map</h3>
      <TorqueMap user={ user } year={ year } interval={ user ? "weekly" : "monthly" } />
    </div>
  );
};

Observations.propTypes = {
  user: React.PropTypes.object,
  year: React.PropTypes.number,
  data: React.PropTypes.object
};

export default Observations;