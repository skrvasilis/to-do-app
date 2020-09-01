import React from "react";
import ToDoItem from "./ToDoItem";

export default class ToDosContainer extends React.Component {
  constructor(props) {
    super(props);

    // we store the value from the input here onChange
    this.state = {
      inputText: "",
    };
  }

 /*  we call the method from the app component, the method is executing in the app component we just give it the argument from our state here*/
  formSubmited=(e)=>{
      e.preventDefault()
      if(this.state.inputText.trim() !=='') {
      this.props.addItemProps(this.state.inputText)
    }
      this.setState({
        inputText: ''
      })
  }

  render() {
    // we are writing all the javascript code here and we are importing a new component for every single item so the jsx code after the return is cleaner 
    const todosItems = this.props.toDosProps.map((task) => {
      return <ToDoItem key={task.id} taskProps={task} updateItemProps={this.props.updateItemProps} deleteItem={this.props.deleteItem}/>;
    });
    return (
      <div className="todos-container">
        <form className="todo-form" onSubmit={this.formSubmited}>
          <label className="input-item">
            <input
              type="text"
              name="todo"
              value={this.state.inputText}
              onChange={(e) => this.setState({ inputText: e.target.value })}
            />
          </label>
          <input type="submit" className="btn" value="ADD" />
        </form>
        <div className="todos">
          <h3>TO DO</h3>
          {todosItems}
        </div>
      </div>
    );
  }
}
