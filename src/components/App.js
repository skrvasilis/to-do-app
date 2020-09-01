import React from "react";
// for scss files we first have to install sass (npm install node-sass)
import "../css/App.scss";
import Navigation from "./Navigation";
import ToDosContainer from "./ToDosContainer";
import ToDonesContainer from "./ToDonesContainer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Help from "./Help";
import NotFound from "./NotFound";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }
  // getting the data from the locale storage as string and we convert them to an object
  // executes only once when we open or refresh the page
  componentDidMount() {
    let storedItems = localStorage.getItem("to-do-app");
    let convertedToOriginal = JSON.parse(storedItems);
    if (storedItems !== null) {
      this.setState({
        items: convertedToOriginal,
      });
    }
  }

  /* this method will change the done property of the item and move it to the toDones container and opposite*/
  updateItem = (id) => {
    let UpdatedItems = this.state.items.map((item) => {
      if (item.id === id) {
        item.done = !item.done;
        return item;
      } else {
        return item;
      }
    });
    this.setState(
      {
        items: UpdatedItems,
      },
      () => {
        localStorage.setItem(
          "to-do-app",
          JSON.stringify(this.state.items)
        ); /* local storage will update as well */
      }
    );
  };

  deleteItem = (id) => {
    console.log("delete");
    const updatedItems = this.state.items.filter((item) => item.id !== id);

    this.setState(
      {
        items: updatedItems,
      },
      () => {
        localStorage.setItem(
          "to-do-app",
          JSON.stringify(this.state.items)
        ); /* local storage will update as well */
      }
    );
  };

  addItem = (inputText) => {
    const item = {
      id: this.state.items.length,
      text: inputText,
      done: false,
    };
    this.setState(
      {
        /* this is the best way to add new items inside the state array */

        // we are setting our items inside the localStorage
        items: [...this.state.items, item],
      },
      () => {
        localStorage.setItem("to-do-app", JSON.stringify(this.state.items));
      }
    );
  };

  render() {
    //we put the filter methods in the render cause render executes every time somethings change inside the state
    const toDones = this.state.items.filter((item) => {
      return item.done;
    });
    const toDos = this.state.items.filter((item) => {
      return !item.done;
    });
    return (
      <BrowserRouter>
        <div className="app">
          <Navigation />

          {/* this way we pass only custom props */}
          {/*  <Route exact path='/'>
        <ToDosContainer
          toDosProps={toDos}
          addItemProps={this.addItem}
          updateItemProps={this.updateItem}
          deleteItem={this.deleteItem}
        />
        <ToDonesContainer
          toDonesProps={toDones}
          updateItemProps={this.updateItem}
          deleteItem={this.deleteItem}
        />
        </Route> */}

          {/* this way we can pass custom props and browser props as well */}
          <Switch>
            {" "}
            <Route
              exact
              path="/"
              render={(props) => {
                return (
                  <div>
                    <ToDosContainer
                      {...props}
                      toDosProps={toDos}
                      addItemProps={this.addItem}
                      updateItemProps={this.updateItem}
                      deleteItem={this.deleteItem}
                    />
                    <ToDonesContainer
                      {...props}
                      toDonesProps={toDones}
                      updateItemProps={this.updateItem}
                      deleteItem={this.deleteItem}
                    />
                  </div>
                );
              }}
            />
            {/* this way we cannot pass custom props  */}
            <Route exact path="/help" component={Help} />
            <Route component={NotFound}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
