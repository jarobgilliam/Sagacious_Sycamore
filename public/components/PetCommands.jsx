var PetCommand = (props) => (
  <div className="pet-commandbar">
    <img className='command' src={props.cmdImg.food} onClick={() => {props.executeCommand('eating')}}/>
    <img className='command' src={props.cmdImg.love} onClick={() => {props.executeCommand('playing')}}/>
    <img className='command' src={props.cmdImg.code} onClick={() => {props.executeCommand('codingButton')}}/>
    <img className='command' src={props.cmdImg.sleep} onClick={() => {props.executeCommand('sleeping')}}/>
    <img className='command' src={props.cmdImg.question} onClick={() => {props.executeCommand('question')}}/>
    <a href='/game'><img className='command' src='../other/img/gude_big.png' /></a>

  </div>
);

window.PetCommand = PetCommand;
