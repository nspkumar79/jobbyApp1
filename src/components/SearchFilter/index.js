import {BsSearch} from 'react-icons/bs'

import './index.css'

const SearchFilter = props => {
  const {searchInput, changeSearchInput, enterSearchInput} = props

  const onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    changeSearchInput(event.target.value)
  }

  return (
    <>
      <input
        value={searchInput}
        type="search"
        className="search-input"
        placeholder="Search"
        onChange={onChangeSearchInput}
        onKeyDown={onEnterSearchInput}
      />
      <BsSearch className="search-icon" />
    </>
  )
}

export default SearchFilter
