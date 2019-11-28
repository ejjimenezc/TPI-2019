import React from 'react';

class FormB extends React.Component {

  render() {
    var data = this.props.item;
    if(data.question_type=="IN"){
      return  <div>
                <label htmlFor={data.code}>{data.question}:</label><br/>
                <input id={data.code} type="number" name={data.code} min={data.min_value} max={data.max_value} defaultValue="1"/>
              </div>
    }else if(data.question_type=="BO"){
      var choices = data.boolean_choice.split(',');
      return  <div>
              <label htmlFor={data.code}>{data.question}:</label><br/>
              <p>
              <input type="radio" id={data.code} name={data.code} defaultChecked value="1"></input><label>{choices[0]}</label>
              </p>
              <p>
              <input type="radio" id={data.code} name={data.code} value="0"></input><label>{choices[1]}</label>
              </p>
              </div>
    }else if(data.question_type=="MC"){
      var choices = data.multiple_choice.split(',');
      let choicesList = choices.length > 0
      && choices.map(item => {
        return (<option key={data.multiple_choice.indexOf(item)} value={item}>{item}</option>);
      }, this);
      return  <div>
        <label htmlFor={data.code}>{data.question}:</label><br/>
        <select>{choicesList}</select>
      </div>
      
    }
    return <div>{data.code}</div>;
  }
}
  
export default FormB;