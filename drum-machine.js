const BankOne=[
  {id: 1,text: "Q",url: "https://www.fesliyanstudios.com/play-mp3/6698",title: "Hi Hat Closed Hit A1"},
  {id: 2,text: "W",url: "https://www.fesliyanstudios.com/play-mp3/6699",title: "Hi Hat Closed Hit A2"},
  {id: 3,text: "E",url: "https://www.fesliyanstudios.com/play-mp3/6711",title: "Hi Hat Closed Hit B1"},
  {id: 4,text: "A",url: "https://www.fesliyanstudios.com/play-mp3/6701",title: "Hi Hat Closed Hit B3"},
  {id: 5,text: "S",url: "https://www.fesliyanstudios.com/play-mp3/6702",title: "Hi Hat Closed Hit C1"},
  {id: 6,text: "D",url: "https://www.fesliyanstudios.com/play-mp3/6703",title: "Hi Hat Closed Hit C2"},
  {id: 7,text: "Z",url: "https://www.fesliyanstudios.com/play-mp3/6707",title: "Hi Hat Foot Pedal Close A"},
  {id: 8,text: "X",url: "https://www.fesliyanstudios.com/play-mp3/6708",title: "Hi Hat Foot Pedal Close B"},
  {id: 9,text: "C",url: "https://www.fesliyanstudios.com/play-mp3/6705",title: "Hi Hat Closed Hit E1"},

];
const BankTwo=[
  {id: 1,text: "Q",url: "https://www.fesliyanstudios.com/play-mp3/6764",title: "Snare Drum Hit Level 1a"},
  {id: 2,text: "W",url: "https://www.fesliyanstudios.com/play-mp3/6765",title: "Snare Drum Hit Level 1b"},
  {id: 3,text: "E",url: "https://www.fesliyanstudios.com/play-mp3/6766",title: "Snare Drum Hit Level 2a"},
  {id: 4,text: "A",url: "https://www.fesliyanstudios.com/play-mp3/6767",title: "Snare Drum Hit Level 2b"},
  {id: 5,text: "S",url: "https://www.fesliyanstudios.com/play-mp3/6768",title: "Snare Drum Hit Level 3a"},
  {id: 6,text: "D",url: "https://www.fesliyanstudios.com/play-mp3/6769",title: "Snare Drum Hit Level 3b"},
  {id: 7,text: "Z",url: "https://www.fesliyanstudios.com/play-mp3/6770",title: "Snare Drum Hit Level 4a"},
  {id: 8,text: "X",url: "https://www.fesliyanstudios.com/play-mp3/6771",title: "Snare Drum Hit Level 4b"},
  {id: 9,text: "C",url: "https://www.fesliyanstudios.com/play-mp3/6772",title: "Snare Drum Hit Level 5a"},

];


class DrumPad extends React.Component{
  constructor(props){
      super(props);
  }
  render(){
      const bank = this.props.bank;
      
      const listpad= bank.map((pad)=> 
          {return (
            <li key={pad.id}>
              <button  id={pad.id} title={pad.title} onClick={this.props.onClick} className="drum-pad" >{pad.text}
                  <audio  id={pad.text} className="clip" src={pad.url}></audio>
              </button>
          </li>)}
      );
      
      return(
          <div className="drumpad">
              <ul>{listpad}</ul>
          </div>
      );
  }
}

//REMAIN  VOLUME 

class App extends React.Component{
  constructor(props){
      super(props);
      this.state= {
          power: true,
          bankNum: BankOne,
          title: " ",
          playtext: " ",
      };
      this.handleClick=this.handleClick.bind(this);
      this.handlePlay=this.handlePlay.bind(this);
      this.handlePower=this.handlePower.bind(this);
      this.handleKeyPress=this.handleKeyPress.bind(this);
      this.handleBank=this.handleBank.bind(this);
      
  }
  
  // CLICK TO PLAY AUDIO
  handleClick(event){
      const choosetext=event.target.innerText;
      const choosetitle=event.target.title;
     this.setState({playtext: choosetext});
     if(this.state.power){
       this.handlePlay();
       this.setState({title: choosetitle});
     }else{
       this.setState({
         playtext: " ",
         title: " "})
     };            
  };
  
  handlePlay(){
    let textplay=this.state.playtext;
    const audioEle=document.getElementById(textplay);
  //   audioEle.currentTime=0;
    audioEle.play();
  }; 
  handlePower(){
    this.setState({power: !this.state.power})      
  };
  handleKeyPress(event){
    const keylist=document.querySelectorAll(".drum-pad").innerText;
    const keypress=event.key;
    if(keylist.includes(keypress)){
      const indexkey=keylist.indexOf(keypress);
      const chotitle=keylist[indexkey].title;
      document.getElementByTagName("button").filter((item)=> item.innerText==keypress).clicked();
    //   this.setState({playtext: keypress})        ;}
    // if(this.state.power){
    //    this.handlePlay();
    //    this.setState({title: chotitle});
    //  }else{
    //    this.setState({
    //      playtext: " ",
    //      title: " "})
     }; 
  };
  handleBank(){
    if(this.state.bankNum===BankOne){
      this.setState({bankNum: BankTwo});
      }
    else{
      this.setState({bankNum: BankOne})
    };
  };
 
  

  render(){
      let status = this.state.power ? "ON" :"OFF" ;
      let statusbank = this.state.bankNum=== BankOne ? "BankOne" : "BankTwo";
      this.handleKeyPress;
      return(
          <div id="drum-machine">
            <div id="drumbox">
              
                  <DrumPad onClick={this.handleClick} bank={this.state.bankNum} />
              
              <div className="info">
                  <div><p>Power</p> 
                      <button onClick={this.handlePower}>{status}</button>               
                  </div>
                  <div id="display">{this.state.title}</div>
                  <div>
                      <p>Change Bank</p> 
                      <button onClick={this.handleBank}>{statusbank}</button>               
                  </div>
              </div>
            </div>
          </div>
      );
  }
}


const container = document.getElementById("container");
const root = ReactDOM.createRoot(container);
root.render(<App />);