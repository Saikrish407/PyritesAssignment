import React from 'react';
import { connect } from 'react-redux';
import '../App.css';

import firebase from '../FireBase';
import NavBar from '../fireBaseAuthentication/NavBar';
import { handleTodoInputOnSubmit, handleTodoInputOnChange, handleTodoInputRemoveAll, handleRemoveTodoOutPutText, handleEditTodoOutputText } from '../Store/Actions/todoInput';


import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";

import Column2D from "fusioncharts/fusioncharts.charts";

import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);
const chartConfigs = {
  type: "line",
  width: "350",
  height: "250",
  dataFormat: "json",
  dataSource: {
    chart: {
      anchorradius: "5",
      showHoverEffect: "1",
      showvalues: "0",
      theme: "fusion",
      anchorBgColor: "#72D7B2",
      paletteColors: "#72D7B2"
    },
    
    data: [{
      label: "10",
      value: "10"
    }, {
      label: "20",
      value: "5"
    }, {
      label: "30",
      value: "10"
    }, {
      label: "40",
      value: "12"
    }, {
      label: "50",
      value: "14"
    }, 
    ]
  }
};

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    }
  }
  handleLogout = () => {
    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem("user");
        this.props.history.push("/sign-in")
      })
  }


  handleOnSubmit = (e) => {
    e.preventDefault()

    this.props.dispatchHandleOnSubmitForm();
    this.setState({
      count: this.state.count + 1
    })

  }

  handleTodoInputOnChange = (e) => {
    this.props.dispatchHandleTodoInputOnChange(e.target.value);
  }

  handleRemoveAll = () => {
    this.props.dispatchHandleRemoveAll();
    this.setState({
      count: 0
    })
  }

  handleRemoveTodoOutPutText = (ind) => {
    this.props.dispatchHandleRemoveOutputTodoText(ind)
    this.setState({
      count: this.state.count - 1
    })
  }

  handleEditTodoOutputText = (val, ind) => {
    this.props.dispatchHandleEditTodoOutputText(val, ind);
  }


  render() {

    return (
      <div>
        <div className="float-right" id="buttonstyle">
          <button className=" btn btn-sm btn-danger" onClick={this.handleLogout}>Logout</button>
        </div>
        <div className='container mt-5 float-left ' id="leftSideMove">

          <div className='row'>
            <div className='col-lg-6 text-center shadow p-5 bg-light ' id="leftSide">
              <h2 className='text-info'>Please Enter the Value</h2>
              <form onSubmit={this.handleOnSubmit}>
                <input
                  id='todoInput'
                  onChange={this.handleTodoInputOnChange}
                  className='form-control mt-3 text-center'
                  type='text' value={this.props.input}
                  placeholder='enter your todo text' />


                {this.props.Editable ? <button
                  className='btn btn-sm btn-info float-right mt-2'>
                  update
                </button> : <button
                    className='btn btn-sm btn-info float-right mt-2'>
                    submit
                </button>}

              </form>
              <button
                onClick={this.handleRemoveAll}
                className='btn btn-sm btn-danger float-left mt-2'>
                Remove All
                </button>
              {this.props.RemoveAllError && <p className='mt-2 text-danger'>There Is Nothing To Remove</p>}
              {this.props.SameInputTextError && <p className='mt-2 text-danger'>Input Text Already Exists</p>}
              {this.props.InputEmptyError && <p className='mt-2 text-danger'>Please Enter Some TodoText</p>}

            </div>
          </div>
          {this.props.TodoInput && (
            <div className='row mt-5'>
              <div className='col-lg-6 text-center shadow ' id="todoleft">
                <h4>Todo-Output</h4>
                <ul className='list-group'>
                  {this.props.TodoInput.map((val, ind) => {
                    return (
                      <React.Fragment key={ind}>
                        <li
                          style={{ textAlign: 'start' }}
                          className='list-group-item'

                        >
                          {val}
                          <button
                            onClick={() => this.handleRemoveTodoOutPutText(ind)}
                            className='btn btn-sm btn-danger float-right'
                          >
                            Remove
                        </button>
                          <button
                            onClick={() => this.handleEditTodoOutputText(val, ind)}
                            className='btn btn-sm btn-info float-right mr-1'>
                            edit
                          </button>
                        </li><br></br>
                      </React.Fragment>
                    )
                  })}
                </ul>
              </div>
            </div>
          )}


        </div>
        <div className="card shadow text-center" id="rightSide">
          <h2>count:{this.state.count}</h2>
          <ReactFC {
            ...chartConfigs
          } />;
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({

  TodoInput: state.TodoInput,
  input: state.input,
  Editable: state.editable,
  RemoveAllError: state.RemoveAllError,
  SameInputTextError: state.SameInputTextError,
  InputEmptyError: state.InputEmptyError,
})


const mapDispatchToProps = (dispatch) => ({
  dispatchHandleOnSubmitForm: () => dispatch(handleTodoInputOnSubmit()),
  dispatchHandleTodoInputOnChange: (eve) => dispatch(handleTodoInputOnChange(eve)),
  dispatchHandleRemoveAll: () => dispatch(handleTodoInputRemoveAll()),
  dispatchHandleRemoveOutputTodoText: (ind) => dispatch(handleRemoveTodoOutPutText(ind)),
  dispatchHandleEditTodoOutputText: (val, ind) => dispatch(handleEditTodoOutputText(val, ind))
}
)
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
