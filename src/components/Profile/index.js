import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

const jwtToken = Cookies.get('jwt_token')

class Profile extends Component {
  state = {status: apiStatus.inProgress, data: {}}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    const apiUrl = 'https://apis.ccbp.in/profile'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()

      const profileData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      console.log(profileData)

      this.setState({status: apiStatus.success, data: {...profileData}})
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderFailure = () => (
    <button type="button" className="retry-button" onClick={this.getProfile}>
      Retry
    </button>
  )

  renderProfile = () => {
    const {data} = this.state
    return (
      <div className="profile-card">
        <img
          className="profile-image"
          src={data.profileImageUrl}
          alt="profile"
        />
        <h1 className="profile-name">{data.name}</h1>
        <p className="profile-short">{data.shortBio}</p>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#000000" height="80" width="80" />
    </div>
  )

  getStatusApi = () => {
    const {status} = this.state

    switch (status) {
      case apiStatus.failure:
        return this.renderFailure()
      case apiStatus.success:
        return this.renderProfile()
      case apiStatus.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return <div className="profile-container">{this.getStatusApi()}</div>
  }
}

export default Profile
