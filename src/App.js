import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Inicio from './Inicio';
import Informacion from './Informacion';
import Resumen from './Resumen';
import Resultado from './Resultado';

import { Provider } from "./Context";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'Safe House',
      page: 0,
      solutions: [],
      data: {}
    };
  }

  updateData = (name,newData) => {
      this.state.data[name]=newData;
  };


  render() {


    return (
      <Provider value={this.state}>
          <Router>

          {/* Aqui se configuran las rutas de la aplicacion */}

            {/* Ruta al Home de la aplicacion */}
            <Route exact path = "/" render = { () => {
                return (
                  <Informacion data={this.state.data} updateData={this.updateData}/>
                )
              }
              }>
            </Route>

            {/* Ruta a la pagina de informacion/preguntas */}
            <Route exact path = "/informacion" render = { () => {
                return (
                  <Informacion/>
                )
              }
              }>
            </Route>

            {/* Ruta a la pagina de los resultados */}
            <Route exact path = "/resultado" render = {() => {
              return (
                <Resultado/>
              )
            }
            }>
            </Route>

            {/* Ruta a la pagina de resumen */}
            <Route exact path = "/resumen" render = {() => {
              return (
                <Resumen/>
              )
            }
            }>
            </Route>
          </Router>
      </Provider>
    );
  }

}

export default App;
