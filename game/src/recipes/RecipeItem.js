// src/recipes/RecipeItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import RecipeCategory from './RecipeCategory'
import LikeButton from '../components/LikeButton'
import './RecipeItem.css'
import { Link } from 'react-router-dom'

const PLACEHOLDER = 'http://via.placeholder.com/500x180?text=No%20Image'

export const recipeShape = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    photo: PropTypes.string,
    vegan: PropTypes.bool,
    vegetarian: PropTypes.bool,
    pescatarian: PropTypes.bool,
    liked: PropTypes.bool,
    hiddenLink: PropTypes.bool
})

class RecipeItem extends PureComponent {
  static propTypes = {
    ...recipeShape.isRequired,
    onChange: PropTypes.func.isRequired
  }

  toggleLike = () => {
    console.log('[RecipeItem]: toggleLike called!')
    const { onChange, _id, liked } = this.props
    onChange(_id, { liked: !liked })
  }

  render() {
    const { _id, title, summary, vegan, vegetarian, pescatarian, photo, liked, hiddenLink } = this.props
    const categories = { vegan, vegetarian, pescatarian }
    const path = "/recipes/" + _id
    return(
      <article className="RecipeItem">
        <header>
          <div
            className="cover"
            style={{ backgroundImage: `url(${photo || PLACEHOLDER })` }} />

          <h1>{title}</h1>

          <ul className="categories">
            <RecipeCategory { ...categories } />
          </ul>
        </header>
        <div>
          <p>{ summary }</p>
        </div>
        <footer>
          <LikeButton
            onChange={this.toggleLike}
            liked={liked}
          />
          <Link hidden={ hiddenLink } to={ path } >Click here</Link>
        </footer>
      </article>
    )
  }
}

export default RecipeItem
