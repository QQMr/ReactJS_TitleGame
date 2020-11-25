import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var basicStyle = {
  width: '200px',
  height: '200px',
  font: '64pt',
  border: '2px solid #aaa',
  textAlign: 'center',
  margin: '10px',
  padding: '10px',
  float: 'left',
  cursor: 'pointer'
};

var matchStyle = {
  backgroundColor: "#fefbd8",
};

var notFlipedStyle = {
  backgroundColor: "#778899",
};

var FlipedStyle = {
  backgroundColor: "#FFFFFF",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.titleCount = 16;
    this.state = {
      titlelist : []
    };

    this.buildTitle = this.buildTitle.bind(this);
    this.displayTitle = this.displayTitle.bind(this);
    this.RenderTitles = this.RenderTitles.bind(this);
    this.clickflip = this.clickflip.bind(this);
    this.checkMatch = this.checkMatch.bind(this);

    let width = 100/Math.sqrt(this.titleCount)/1.4;
    width = width+"%";
    basicStyle.width = width;
    basicStyle.height = width;

    this.buildTitle();
  }

  generateRandomSeq(totlalSize)
  {
    var randomarray = [];
    
    var i;
    
    for (i = 0; i < totlalSize; i=i+2) {     
      var number = Math.floor(Math.random() * 100);
      while( randomarray.includes(number) == true )
          number = Math.floor(Math.random() * 100);

      if( i+1 < totlalSize )
      {
        randomarray.push(number);
        randomarray.push(number);
      }
      else
        randomarray.push(number);
    }
    randomarray.sort(() => Math.random() - 0.5);
    return randomarray;
  }
  buildTitle()
  {
    var randomSeq = this.generateRandomSeq(this.titleCount);
    var titlelist = []
    var i;
    for (i = 0; i < this.titleCount; i++) {     
      var title = { 
        number: randomSeq[i],
        isMatch: false,
        isFliped: false 
      }
      titlelist.push(title);
    }
    console.log(titlelist)
    this.setState( {titlelist: titlelist} ,() => console.log(this.state.titlelist));
  }

  checkMatch()
  {
    var alltile = this.state.titlelist;
    var filters = alltile.filter( q => (q.isMatch==false && q.isFliped==true) );
    var indices = alltile.map((q, i) => (q.isMatch==false && q.isFliped==true) ? i : '').filter(String)
    console.log("check",filters.length,indices);
    if(filters.length ==2)
    {
      if( filters[0].number ==  filters[1].number )
      {
       
        console.log("match");
        alltile[indices[0]].isMatch=true; 
        alltile[indices[1]].isMatch=true; 
        this.setState({titlelist:alltile})
      }

    }
  }
  clickflip(index)
  {
    
    var alltile = this.state.titlelist;
    var tile = this.state.titlelist[index];

    console.log('index',index)
    console.log(alltile.filter(q => (q.isFliped == true) && (q.isMatch == false  )   ).length);
    
    if( alltile[index].isMatch ==true )
      return;
    if( alltile[index].isFliped == true )
    {
      tile.isFliped = !tile.isFliped;
      alltile[index] = tile;
    }
    else if( alltile.filter(q => (q.isFliped == true) && (q.isMatch == false  )   ).length >1 )
    {  
     
    }
    else
    {

      tile.isFliped = !tile.isFliped;
      alltile[index] = tile;
      
    }

    this.setState({titlelist:alltile},()=> this.checkMatch());

  }

  displayTitle(index) {
    var title = this.state.titlelist[index];
    var tmpStyte  = basicStyle;
    var tmpStyte2 = title.isFliped == true ? FlipedStyle : notFlipedStyle ;
    tmpStyte2 = title.isMatch? matchStyle : tmpStyte2;
    var tmpText= title.isFliped? title.number: "_";
    return(
    <div className="Tile" key={`t-${index}`} style={Object.assign({},tmpStyte,tmpStyte2)} onClick={() => this.clickflip(index)} >
      { tmpText}
    </div>
    )
  }

  RenderTitles(){

    
    return (
      this.state.titlelist.map( (obj,index) => this.displayTitle(index)
           
         )
    )
  }

  render()
  {
    return(
      <div>
      <h1 >Memory Game</h1>     
      <button onClick={ this.buildTitle }> new game </button>
      <hr />
      { this.RenderTitles() }
     
      </div>
    )
  }
}

export default App;
