import './Header.css'
import iconUrl from '../../styles/languages.png'

export default function Header() {
  return (
    <div className='header-container'>
      <br/>
      <br/>
      <img src={iconUrl} alt="Icon" className="header-icon" width="150" height="150" />
      <br/>
      <br/>
      Explore immersive experiences to enhance your language skills
      </div>
  )
}
