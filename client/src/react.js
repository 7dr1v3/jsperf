import React from "react"
import ReactDOM from "react-dom"
import Counter from "./counter"
import _ from "lodash"

const counter = new Counter()
counter.load_display()

const Cell = ({ value }) => {
  return React.createElement("div", { className: "cell" }, value)
}

class Row extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.values != this.props.values
  }

  render() {
    const { values, id } = this.props
    const cells = values.map((value, key) => React.createElement(Cell, { value, key }))
    cells.unshift(React.createElement(Cell, { value: `id: ${id}`, key: -1 }))
    return React.createElement("div", { className: "row" }, cells)
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props)
    this.state = {data: {}}
  }
  render() {
    const rows = _.map(this.state.data, (values, key) => {
      return React.createElement(Row, { values, id: key, key })
    })
    return React.createElement("div", { className: "table" }, rows)
  }
}

const app = ReactDOM.render(React.createElement(Table, null), document.getElementById('root'))

let data = {}

counter.start((event) => {
  if(event.action == "ADD") {
    data = _.assign({}, data, { [event.id]: event.data })
  }
  else {
    data = _.omit(data, event.id)
  }
  app.setState({ data })
})
