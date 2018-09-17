// eslint-disable-next-line
import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {withRouter} from 'react-router-dom';
import SwitchRoute from './SwitchRoute';
import queryString from 'query-string';
import GeneSearchForm from 'scxa-gene-search-form'
import ExperimentCard from './ExperimentCard';
import uri from 'urijs'
import _ from 'lodash'


class SearchApp extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      value: '' ,
      species: '',
      category: '',
      routepath: `test`,
      nextSelectedFacets: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.speciesSelectOnChange = this._speciesSelectOnChange.bind(this)
    this.handleSelections = this.handleSelections.bind(this)
  }

  async handleSubmit(val){
    await this.setState({
      value : val.term,
      category: val.category,
      routepath : `test`
    });

    if(this.state.species===undefined){
     await this.setState({
        species: ''
      })
    }
   
    this.props.history.push({
      pathname: `/gxa/sc/search?${val.category}=${this.state.value}&species=${this.state.species}`,
    })
    
  }


  _speciesSelectOnChange(value) {
    //event.persist();
    this.setState({ 
      species: value.replace(' ','+'),
      routepath : `test`
    });

    this.props.history.push({
        pathname:  `/gxa/sc/search?${this.state.category}=${this.state.value}&species=${value.replace(' ','+')}`
    })
  }

  handleSelections(routepath, nextSelectedFacets){
    const host = new uri(this.props.history.location.pathname);

    const queryURL = host.query(routepath).addQuery(this.state.category,this.state.value).addQuery('species',this.state.species).toString().replace(/\%2B/g,'+')
    console.log(routepath,queryURL)
    
    this.setState({
      routepath: queryURL,
      nextSelectedFacets: nextSelectedFacets
    });
    this.props.history.push({
      pathname: queryURL
    })
  }


  componentWillMount() {
    const values = queryString.parse(this.props.location.search);
    let category =Object.keys(values).filter(val => val==='symbol'||val==='q'||val==='mgi_symbol'||val==='hgnc_symbol')[0];
    let value = values[category];
    //Object.values(values).forEach(val=>typeof val=== `string` ? [val]:val);
    const parseQuery =(term, values)=>{
      let termValue = term===`Species`? `selectedspecies`: term.toLowerCase().replace(/\s/g,``)
      return (
        values[termValue] ?
                  typeof values[termValue] === `string` ? 
                   [{
                    group: term,

                    label: values[termValue].split().map(value=>value.charAt(0).toUpperCase()+ value.replace(/\+/g,' ').substr(1)),

                    value: values[termValue].split().map(value=>value.replace(/\+/g,' '))[0],
                    disabled : false
                  }] :
                  values[termValue].map(
                    val=>{
                      return {group: term,
                    label: val.charAt(0).toUpperCase()+ val.replace(/\+/g,' ').substr(1),
                    value: val.replace(/\+/g,' '),
                    disabled : false}
                  }
                    )
                :[]
        )
    }

    this.setState({
      category: category,
      species: values.species?values.species.replace(' ','+'):'',
      value: value,
      routepath: _.isEmpty(values)?`test`:this.props.history.location.pathname+this.props.history.location.search,
      
      nextSelectedFacets: 
        {
          "Inferred cell type": parseQuery(`Inferred cell type`,values),
          "Marker genes": parseQuery(`Marker genes`, values),
          "Organism part" : parseQuery(`Organism part`,values),
          "Species" : parseQuery(`Species`,values)
        } 
     
    },()=>console.log(`nextSelectedFacets-top`,this.state.nextSelectedFacets))

    if(Object.keys(values)[1]){
      this.props.history.push({
          pathname: this.props.history.location.pathname+this.props.history.location.search
      })
    }

  }

  render() {

    return (     
      <div className="App">
        <div className={props.wrapperClassName}>
            <GeneSearchForm {...props} currentValue ={this.state.value} currentSpecies={this.state.species?this.state.species.replace('+',' '):this.state.species}
             onChange={this.handleSubmit} speciesSelectOnChange={this.speciesSelectOnChange}/>
        </div>
        
        <SwitchRoute {...props} nextSelectedFacets={this.state.nextSelectedFacets} routepath={this.state.routepath} handleSelections={this.handleSelections} 
        ResultElementClass={ExperimentCard} value={this.state.value} species={this.state.species} category={this.state.category}/>
      </div>
    );
  }
}

export default withRouter(SearchApp);
