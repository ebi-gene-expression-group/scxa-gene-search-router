import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import FetchLoader from 'react-faceted-search'

import NotFoundPage from './pages/NotFoundPage'
import AboutPage from './pages/AboutPage'

const SwitchRoute = ({routerEndpoint, atlasUrl, suggesterEndpoint, value, species, category, ResultElementClass, handleSelections, routepath, nextSelectedFacets, facetGroup}) => (
  <div>
    <Switch>
      <Route
        exact path={`${routerEndpoint}geneID=${value}&species=${species}`}
          render={
            props => (
              <FetchLoader {...props}
                searchID={value}
                nextSelectedFacets={{}}
                facetGroup={facetGroup}
                handleSelections={handleSelections}
                ResultElementClass={ResultElementClass}
                host={`${atlasUrl}${suggesterEndpoint}ensgene=`}
                resource={value}
                species={species ? species.replace(`+`, ` `) : species} />
              )} />

      <Route
        exact path={`${routerEndpoint}${category}=${value}&species=${species}`}
        render={
          props => (
            <FetchLoader {...props}
              searchID={value}
              nextSelectedFacets={{}}
              facetGroup={facetGroup}
              handleSelections={handleSelections}
              ResultElementClass={ResultElementClass}
              host={`${atlasUrl}${suggesterEndpoint}`}
              resource={`${category}=${value}&species=${species}`}
              species={species ? species.replace(`+`, ` `) : species} />
            )} />

      <Route
        exact path={routepath}
        render={
          props => (
            <FetchLoader {...props}
              searchID={value}
              facetGroup={facetGroup}
              nextSelectedFacets={nextSelectedFacets}
              handleSelections={handleSelections}
              ResultElementClass={ResultElementClass}
              host={`${atlasUrl}${suggesterEndpoint}`}
              resource={`${category}=${value}&species=${species}`}
              species={species ? species.replace(`+`, ` `) : species} />
            )} />

      <Route exact path={`/`} component={AboutPage} />

      <Route component={NotFoundPage} />
    </Switch>
  </div>
);

export default withRouter(SwitchRoute)
