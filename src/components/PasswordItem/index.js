import './index.css'

const PasswordItem = props => {
  const {passwordDetails, isActive, deletePassword} = props
  const {id, website, userName, password, backgroundClass} = passwordDetails

  const logo = website[0].toUpperCase()
  const background = `logo ${backgroundClass}`

  const onDelete = () => {
    deletePassword(id)
  }

  return (
    <li className="list-item">
      <div className="logo-card">
        <p className={background}>{logo}</p>
        <div>
          <p className="site">{website}</p>
          <p className="name">{userName}</p>
          {isActive ? (
            <p className="text">{password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
              className="text stars"
            />
          )}
        </div>
      </div>

      <button
        type="button"
        className="delete-button"
        onClick={onDelete}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete"
        />
      </button>
    </li>
  )
}

export default PasswordItem
