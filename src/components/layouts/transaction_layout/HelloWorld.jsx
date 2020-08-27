import React, {Component} from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import Modal from 'react-modal';

export default class HelloWorld extends Component {

  constructor(props) {
    super(props);

    this.state = {
      alert: null
    };
  } 

  customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  state = {
    modalIsOpen: false
  }

  deleteThisGoal = () => {
    const getAlert = () => (
      <SweetAlert 
        success 
        title="Woot!" 
        onConfirm={() => this.hideAlert()}
      >
        Hello world!
      </SweetAlert>
    );

    this.setState({
      alert: getAlert()
    });
  }

  hideAlert() {
    console.log('Hiding alert...');
    this.setState({
      alert: null
    });
  }

  openModal = () => {
    this.setState ({
      modalIsOpen: true
    })
  }

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    })
  }
  render() {
    return (
      <div style={{ padding: '20px' }}>
          <a 
            onClick={() => this.deleteThisGoal()}
            className='btn btn-danger'
          >
            <i className="fa fa-trash" aria-hidden="true"></i> Delete Goal
        </a>
        {this.state.alert}

        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          // onAfterOpen={afterOpenModal}
          onRequestClose={this.closeModal}
          style={this.customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
 
          
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
            <img className="card-img-top" src="..." alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </Modal>
      </div>
    );
  }
}