var Modal = ReactBootstrap.Modal;
var Button = ReactBootstrap.Button;
var FormGroup = ReactBootstrap.FormGroup;
var ControlLabel = ReactBootstrap.ControlLabel;
var FormControl = ReactBootstrap.FormControl;
var HelpBlock = ReactBootstrap.HelpBlock;
var FieldGroup = ReactBootstrap.FieldGroup;
var Radio = ReactBootstrap.Radio;

class AddQuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.question = '';
    this.state.choice1 = '';
    this.state.choice2 = '';
    this.state.choice3 = '';
    this.state.choice4 = '';
    this.state.answer = '1';
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('Question submitted', this.state);
    $.ajax({
      method: 'POST',
      url: '/api/question',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: this.state
    })
    .success(function() {
      console.log('Question submitted');
    })
    this.props.toggleModalClick();
  }

  handleChange(name, e) {
    console.log(name, e.target.value)
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
  }

  render() {

    return (
      <div>
        <div>
          <Modal show={this.props.showModal} onHide={this.props.toggleModalClick}>

              <form onSubmit={this.handleSubmit.bind(this)} >
                <FormGroup>
                  <ControlLabel>Question</ControlLabel>
                  <FormControl componentClass="textarea" onChange={this.handleChange.bind(this, 'question')} value={this.state.question} placeholder="Question" />
                </FormGroup>
                <FormGroup >
                  <ControlLabel>Answer 1</ControlLabel>
                  <FormControl componentClass="textarea" onChange={this.handleChange.bind(this, 'choice1')} value={this.state.choice1} placeholder="Answer 1" />
                </FormGroup>
                <FormGroup >
                  <ControlLabel>Answer 2</ControlLabel>
                  <FormControl componentClass="textarea" onChange={this.handleChange.bind(this, 'choice2')} value={this.state.choice2} placeholder="Answer 2" />
                </FormGroup>
                <FormGroup >
                  <ControlLabel>Answer 3</ControlLabel>
                  <FormControl componentClass="textarea" onChange={this.handleChange.bind(this, 'choice3')} value={this.state.choice3} placeholder="Answer 3" />
                </FormGroup>
                <FormGroup >
                  <ControlLabel>Answer 4</ControlLabel>
                  <FormControl componentClass="textarea" onChange={this.handleChange.bind(this, 'choice4')} value={this.state.choice4} placeholder="Answer 4" />
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Select</ControlLabel>
                  <FormControl componentClass="select" value={this.state.answer} onChange={this.handleChange.bind(this, 'answer')} >
                    <option value={1}>Answer 1</option>
                    <option value={2}>Answer 2</option>
                    <option value={3}>Answer 3</option>
                    <option value={4}>Answer 4</option>
                  </FormControl>
                </FormGroup>

                <Button type="submit">
                  Submit
                </Button>
              </form>

          </Modal>
        </div>
      </div>
    );
  }
}

window.AddQuestionModal = AddQuestionModal;
