import Nav from './nav/Nav'
import ContentLeft from './content/Content-left'
import ContentRight from './content/Content-right'
import Footer from './footer/Footer'
import './profile.css'

const ProfileRoot = () => {


  return (
    <div className='container-fluid'>
        <div className='row'>
            <Nav/>
        </div>
        <div className='row'>
            <div className='col-lg-9'><ContentLeft/></div>
            <div className='col-lg-3'><ContentRight/></div>
        </div>
        <div className='row row1'>
            <Footer/>
        </div>
    </div>
  )
}

export default ProfileRoot