import React from 'react';
import {Meteor} from 'meteor/meteor';
import Modal from 'react-modal';

export default class AddLink extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen:  false,
      url: '',
      error: '',
    }
  }

  onChange(e){
    this.setState({ url: e.target.value});
  }

  onSubmit(e) {
    const { url } = this.state;

    e.preventDefault();

      Meteor.call('links.insert', url, (err, res) =>{
        if(!err){
          this.handleModalClose();
        } else {
          this.setState({error: err.reason});
        }
      });
    }

    handleModalClose(){
      this.setState({
        isOpen: false,
        url:'',
        error:''});
    }


  render() {
    return (<div>
      <button className="button" onClick={() => this.setState({isOpen: true, error:''})}>+ Add Link</button>
      <Modal
        isOpen={this.state.isOpen}
        contentLabel="Add Link"
        ariaHideApp={false}
        onAfterOpen={() => this.refs.url.focus()}
        onRequestClose={this.handleModalClose.bind(this)}
        className="boxed-view__box"
        overlayClassName="boxed-view boxed-view--modal"
        >
        <h1>Add a Link</h1>
        {this.state.error ? <p>{this.state.error}</p>: undefined}
        <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
          <input type="text" ref="url" onChange={this.onChange.bind(this)}placeholder="URL" value={this.state.url}/>
          <button className="button">Add Link</button>
          <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
        </form>
      </Modal>
    </div>);
  }
}
