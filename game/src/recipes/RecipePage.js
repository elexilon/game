import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchRecipeById } from '../actions/recipes/fetch'

import RecipeItem, { recipeShape } from './RecipeItem'

export class RecipePage extends PureComponent {
  static propTypes = {
    ...recipeShape.isRequired
  }

  componentWillMount() {
    this.props.fetchRecipeById(this.props.match.params.recipeId)
  }

  render() {
    const recipe = this.props
    const hiddenLink = true
        if (!recipe._id) return null

    return(
      <RecipeItem
        key={recipe._id}
        onChange={() => {}}
        hiddenLink={ hiddenLink }
        { ...recipe }
      />
    )
  }
}

const mapStateToProps = ({ recipes }, { match }) => {
  const recipe = recipes.reduce((prev, next) => {
    if (next._id === match.params.recipeId) {
      return next
    }
    return prev
  }, {})

  return {
    ...recipe
  }
}

export default connect(mapStateToProps, { fetchRecipeById })(RecipePage)
