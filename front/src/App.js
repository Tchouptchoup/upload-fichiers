import React, { Component } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      monfichier: ''
    }
    this.updateField = this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateField = (event) => {
    this.setState({
      [event.target.name]: event.target.files
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData()
    for (let i = 0; i < this.state.monfichier.length; i += 1) {
      formData.append('monfichier[]', this.state.monfichier.item(i))
      console.log(formData)
    }
    fetch('/uploaddufichier', {
      method: 'POST',
      body: formData
    }).then(function (response) {
      console.log(response.status)
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="file" name="monfichier" onChange={this.updateField.bind(this)} multiple accept="image/png"/>
          <button type="submit"> envoyer </button>
        </form>
      </div>
    );
  }
}

export default App;
