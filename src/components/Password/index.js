import {Component} from 'react'
import {v4} from 'uuid'

import PasswordItem from '../PasswordItem'

import './index.css'

const backgroundColorsList = ['yellow', 'green', 'orange', 'cyan', 'maroon']

class Password extends Component {
  state = {
    website: '',
    userName: '',
    password: '',
    passwordsList: [],
    searchInput: '',
    isActive: false,
  }

  deletePassword = id => {
    const {passwordsList} = this.state

    const filteredPasswordData = passwordsList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({
      passwordsList: filteredPasswordData,
    })

    if (passwordsList === 1) {
      this.setState({isActive: true})
    }
  }

  onAddPasswords = event => {
    event.preventDefault()

    const {website, userName, password} = this.state

    const backgroundColorClassName =
      backgroundColorsList[
        Math.ceil(Math.random() * backgroundColorsList.length - 1)
      ]
    const newPassword = {
      id: v4(),
      website,
      userName,
      password,
      backgroundClass: backgroundColorClassName,
    }

    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPassword],
      website: '',
      userName: '',
      password: '',
    }))
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({userName: event.target.value})
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onCheckBox = () => {
    const {isActive} = this.state
    this.setState({isActive: !isActive})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  render() {
    const {
      website,
      userName,
      password,
      passwordsList,
      isActive,
      searchInput,
    } = this.state

    const searchResults = passwordsList.filter(each =>
      each.website.toLowerCase().includes(searchInput.toLowerCase()),
    )

    const count = searchResults.length

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />

        <div className="card">
          <form className="form" onSubmit={this.onAddPasswords}>
            <h1 className="heading">Add New Password</h1>

            <div className="input-card">
              <div className="website-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="website"
                />
              </div>
              <input
                type="text"
                placeholder="Enter Website"
                value={website}
                className="input"
                onChange={this.onChangeWebsite}
              />
            </div>

            <div className="input-card">
              <div className="website-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="website"
                />
              </div>
              <input
                type="text"
                placeholder="Enter Username"
                value={userName}
                className="input"
                onChange={this.onChangeUsername}
              />
            </div>

            <div className="input-card">
              <div className="website-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="website"
                />
              </div>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                className="input"
                onChange={this.onChangePassword}
              />
            </div>

            <button type="submit" className="add-button">
              Add
            </button>
          </form>

          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png "
            alt="password manager"
            className="password-manager-img"
          />
        </div>

        <div className="bottom-card">
          <div className="search-card">
            <div className="your-card">
              <h1 className="heading">Your Passwords</h1>
              <p className="counts">{count}</p>
            </div>
            <div className="search-img-card">
              <div className="search-input-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                  className="website"
                />
              </div>
              <input
                type="search"
                placeholder="Search"
                className="input"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>

          <hr className="line" />

          <div className="show-password-card">
            <input
              type="checkbox"
              id="showPassword"
              onChange={this.onCheckBox}
            />
            <label htmlFor="showPassword" className="show-passwords">
              Show Passwords
            </label>
          </div>

          {searchResults.length === 0 ? (
            <div className="no-password-card">
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                  alt="no passwords"
                  className="no-passwords"
                />
              </div>
              <p className="no-pass-text">No Passwords</p>
            </div>
          ) : (
            <ul className="list-container">
              {searchResults.map(each => (
                <PasswordItem
                  key={each.id}
                  passwordDetails={each}
                  isActive={isActive}
                  deletePassword={this.deletePassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Password
