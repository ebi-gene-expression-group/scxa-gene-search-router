# Single-page application search container for Single Cell Expression Atlas

[![Build Status](https://travis-ci.org/ebi-gene-expression-group/scxa-gene-search-router.svg?branch=master)](https://travis-ci.org/ebi-gene-expression-group/scxa-gene-search-router) [![Coverage Status](https://coveralls.io/repos/github/ebi-gene-expression-group/scxa-gene-search-router/badge.svg?branch=master)](https://coveralls.io/github/ebi-gene-expression-group/scxa-gene-search-router?branch=master)

A conatiner component wraps the [scxa-gene-search-form](https://github.com/ebi-gene-expression-group/scxa-gene-search-form) component and the [scxa-facets-search-results](https://github.com/ebi-gene-expression-group/scxa-faceted-search-results) component together, to make it a RESTful single-page application. The URL changes based on search form including `geneID/gene marker` and `species`, and facets selections including `Marker genes`, `Species`, `Organism parts` and `Inferred cell type`. The detailed URL design is published in [Conflunce](https://www.ebi.ac.uk/seqdb/confluence/pages/viewpage.action?pageId=78920365).

Users may bookmark and share the a meaningful URL link to see specific searching results.

# Try it out
Just run [webpack-serve](https://github.com/webpack-contrib/webpack-serve):
```
npx webpack-serve ./webpack-serve.config.js
```
