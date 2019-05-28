import React from "react";
import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingDate: "",
      buttonColor: "red",
      startTime: "",
      endTime: "",
      AvailableSlots: [],
      slots: null
    };
    this.updateState = this.updateState.bind(this);
    //this.handleSlots = this.handleSlots.bind(this);
  }

  onButtonPress() {
    this.setState({
      buttonColor: "#123eee"
    });
  }

  parseIn(date_time) {
    var d = new Date();
    d.setHours(date_time.substring(11, 13));
    d.setMinutes(date_time.substring(14, 16));

    return d;
  }

  getTimeSlots(time1, time2) {
    var arr = [];
    let slot = {};
    // var hours = date.getHours();
    // var minutes = date.getMinutes();
    // var ampm = hours >= 12 ? 'pm' : 'am';
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    // minutes = minutes < 10 ? '0'+minutes : minutes;

    for (let z = 1; z <= 5; z++) {
      slot[z] = false;
    }
    while (time1 < time2) {
      arr.push({
        time: time1.toTimeString().substring(0, 5),
        slots: slot,
        producyID: "123",
        particulaAmount: "250",
        sub_amount: ""
        // slots: slots
      });
      time1.setMinutes(time1.getMinutes() + 30);
    }

    return arr;
  }

  updateState() {
    var startTime = "2019-05-06T10:30:00+05:30";
    var endTime = "2019-05-06T22:00:00+05:30";

    startTime = this.parseIn(startTime);
    endTime = this.parseIn(endTime);
    var intervals = this.getTimeSlots(startTime, endTime);
    console.log(intervals, "intervals");
    this.setState({
      AvailableSlots: intervals
    });
  }

  componentDidMount() {
    this.updateState();
  }

  componentWillReceiveProps(props) {
    this.setState({ slots: props.SlotsData });
    console.log(this.state.slots);
  }

  handleClick(i, item, index) {
    console.log(i, item, index);
    const selected = this.state.AvailableSlots[index].slots[i.toString()];
    console.log(selected);

    const slots = Object.assign({}, this.state.AvailableSlots[index].slots, {
      [i.toString()]: !selected
    });

    this.setState({
      AvailableSlots: [
        ...this.state.AvailableSlots.slice(0, index),
        Object.assign({}, this.state.AvailableSlots[index], {
          slots: slots,
          time: item.time
        }),
        ...this.state.AvailableSlots.slice(index + 1)
      ]
    });
  }

  addToCart = () => {
    var data = [];
    this.state.AvailableSlots.map(function(item) {
      console.log(item.slots, "item slots we are getting");
      var slotsObj = item.slots;
      var timeogj = item.time;
      var product_id = item.producyID;
      var noOfSelected = 0;
      Object.keys(slotsObj).forEach(key => {
        if (slotsObj[key] === true) {
          noOfSelected = noOfSelected + 1;
          // delete slotsObj[key];
        }
      });
      var test = {
        time: timeogj,
        slot: noOfSelected,
        productId: product_id
      };
      data.push(test);
      var booking_items = data.filter(obj => obj.slot > 0);
      console.log(booking_items, "booking_items");
    });
  };

  render() {
    const AvailableSlots = this.state.AvailableSlots;
    console.log(AvailableSlots);

    const handleSlots = (max_slot, item, index) => {
      let slots = [];
      for (let counter = 1; counter <= max_slot; counter++) {
        slots.push(
          <div
            className="col"
            onClick={() => this.handleClick(counter, item, index)}
            style={{
              margin: 5,
              backgroundColor: item.slots[counter.toString()]
                ? "#28d4ee"
                : "#575756",
              height: "28px"
            }}
          />
        );
      }
      // console.log(slots);
      return slots;
    };

    const RowData = AvailableSlots.map(function(item, index) {
      //max_slot wold come from API
      var max_slot = 4;
      if (max_slot == 4) {
        return (
          <div className="data">
            <div className="row test">
              <div className="slot">{item.time}- </div>
              {handleSlots(max_slot, item, index)}
            </div>
          </div>
        );
      }
    });

    return (
      <div className="container">
        <div className="col-md-9 slot-window product-details">{RowData}</div>
        <button
          name="button"
          type="submit"
          onClick={this.addToCart}
          class="add-to-cart-btn"
        >
          Add to cart
        </button>
      </div>
    );
  }
}

export default App;