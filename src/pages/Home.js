// import React from 'react';
// import {
//   Typography,
// } from '@material-ui/core';

// export default () => (
//   <Typography variant="display1">Welcome Home!</Typography>
// );

import React, {Component} from 'react';
import Modal from 'react-modal';
//import Validation from 'react-validation';
//import "../components/validation.js";

export default class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            modalIsOpen: false,
            name: '',
            email: '',
            msg: '',
            id: 0
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        //this.logChange = this.logChange.bind(this); // We capture the value and change state as user changes the value here.
        this.changeName = this.changeName.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    openModal(user) {
        this.setState({
            modalIsOpen: true,
            name: user.name,
            email: user.email,
            id: user.id_user
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

  

    componentDidMount() {
        let self = this;
        fetch('/users', {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            self.setState({
                users: data
            });
        }).catch(err => {
            console.log('caught it!', err);
        })
    }

    deleteMember(member) {
      var data = {
          id: member.id_user
      }
      fetch("/users/delete", {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
      }).then(function(response) {
          if (response.status >= 400) {
            throw new Error("Bad response from server");
          }
          return response.json();
      }).then(function(data) {
          if(data === "success"){
             this.setState({msg: "User has been deleted."});  
          }
      }).catch(function(err) {
          console.log(err)
      });
    }

    changeName(event) {
        this.setState({
          name: event.target.value
        });
      }

    changeEmail(event) {
        this.setState({
            email: event.target.value
        });
    }

    handleSubmit(event) {
          //Edit functionality
        // event.preventDefault();
          var data = {
              name: this.state.name,
              email: this.state.email,
              id: this.state.id
          }
          fetch("/users/edit", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
          }).then(function(response) {
              if (response.status >= 400) {
                  throw new Error("Bad response from server");
              }
              return response.json();
          }).then(function(data) {
              console.log(data)
              if (data === "success") {
                  this.setState({
                      msg: "User has been edited."
                  });
              }
          }).catch(function(err) {
              console.log(err)
          });
          this.closeModal();
          this.componentDidMount();
      }

    render() {
        return ( 
        <div className="container"> 
            <div className="panel panel-default p50 uth-panel">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>User name</th>
                            <th>User email</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.users.map(user =>
                            <tr key={user.id_user}>
                                <td>{user.name} </td>
                                <td>{user.email}</td>
                                <td><button onClick={() => this.openModal(user)}>Edit</button>|<button onClick={() => this.deleteMember(user)}>Delete</button></td>
                            </tr>
                        )}
                        {/* Modal to edit the user data */}
                        <Modal
                            isOpen={this.state.modalIsOpen}
                            onRequestClose={this.closeModal}
                            contentLabel="Example Modal" >
                            <input required type="text" onChange={this.changeName}
                            defaultValue={this.state.name} placeholder="Ex: Join" /><br /><br />
                            <input required type="text" onChange={this.changeEmail}
                            defaultValue={this.state.email} placeholder="email@email.com" /><br /><br />
                            <button onClick={this.handleSubmit}>Update</button>
                        </Modal>
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}