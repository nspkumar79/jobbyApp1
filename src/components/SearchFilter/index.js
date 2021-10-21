import {BsSearch} from 'react-icons/bs'

import './index.css'

const SearchFilter = props => {
  const {searchInput, onChangeSearchInput, onEnterSearchInput} = props

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
