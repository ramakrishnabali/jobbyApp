import {Component} from 'react'

import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'

import {GoLocation} from 'react-icons/go'

import {BsBriefcaseFill} from 'react-icons/bs'

import {BiLinkExternal} from 'react-icons/bi'

import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class JobItemDetails extends Component {
  state = {
    status: apiStatus.inProgress,
    jobDetails: '',
    lifeAtCompany: '',
    skills: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props

    const {params} = match

    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: ` Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    console.log(response)

    if (response.ok === true) {
      const data = await response.json()

      const jobDetails = {
        companyLogoUrl: data.job_details.companyLogoUrl,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }

      const lifeAtCompany = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }

      const skills = data.job_details.skills.map(eachSkill => ({
        imageUrl: eachSkill.image_url,
        name: eachSkill.name,
      }))

      const similarJobs = data.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        status: apiStatus.success,
        jobDetails,
        lifeAtCompany,
        skills,
        similarJobs,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderLoader = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="80" width="80" />
    </div>
  )

  renderJobDetails = () => {
    const {jobDetails, skills, lifeAtCompany, similarJobs} = this.state

    return (
      <>
        <div className="job-item-details">
          <div className="company-logo-container">
            <img
              src={jobDetails.companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="title-container">
              <h1 className="title">{jobDetails.title}</h1>
              <div className="rating-container">
                <AiFillStar className="star-icon" />
                <p className="rating">{jobDetails.rating}</p>
              </div>
            </div>
          </div>

          <div className="package-container">
            <div className="location-employment-container">
              <div className="location-container">
                <GoLocation className="location-icon" />
                <p className="location">{jobDetails.location}</p>
              </div>
              <div className="location-container">
                <BsBriefcaseFill className="location-icon" />
                <p className="location">{jobDetails.employmentType}</p>
              </div>
            </div>
            <p className="package">{jobDetails.packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="website-container">
            <h1 className="desc-heading">Description</h1>
            <a
              href={jobDetails.companyWebsiteUrl}
              target="_blank"
              rel="noreferrer"
            >
              <p>
                Visit <BiLinkExternal className="visit" />
              </p>
            </a>
          </div>
          <p className="description">{jobDetails.jobDescription}</p>

          <h1 className="title">Skills</h1>
          <ul className="skill-list-container">
            {skills.map(eachSkill => {
              const {imageUrl, name} = eachSkill

              return (
                <li className="skill-container" key={eachSkill.name}>
                  <img src={imageUrl} alt={name} className="skill-image" />
                  <p className="skill-name">{name}</p>
                </li>
              )
            })}
          </ul>

          <h1 className="title">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="description">{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt=" life at company" />
          </div>
        </div>

        <h1 className="similar-heading">Similar Jobs</h1>
        <ul className="similar-job-list-container">
          {similarJobs.map(eachSimilar => (
            <li className="similar-job-container">
              <div className="company-logo-container">
                <img
                  src={eachSimilar.companyLogoUrl}
                  alt="similar job company logo"
                  className="company-logo"
                />
                <div className="title-container">
                  <h1 className="title">{eachSimilar.title}</h1>
                  <div className="rating-container">
                    <AiFillStar className="star-icon" />
                    <p className="rating">{eachSimilar.rating}</p>
                  </div>
                </div>
              </div>

              <h1 className="desc-heading">Description</h1>
              <p className="description">{eachSimilar.jobDescription}</p>
              <div className="package-container">
                <div className="location-employment-container">
                  <div className="location-container">
                    <GoLocation className="location-icon" />
                    <p className="location">{eachSimilar.location}</p>
                  </div>
                  <div className="location-container">
                    <BsBriefcaseFill className="location-icon" />
                    <p className="location">{eachSimilar.employmentType}</p>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </>
    )
  }

  renderFailure = () => (
    <div className="jobs-failure-container">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page your are looking for.
      </p>
      <button
        type="button"
        className="jobs-retry-button"
        onClick={this.getSearchResult}
      >
        Retry
      </button>
    </div>
  )

  getJobsStatus = () => {
    const {status} = this.state

    switch (status) {
      case apiStatus.inProgress:
        return this.renderLoader()
      case apiStatus.success:
        return this.renderJobDetails()
      case apiStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-item-details-container">{this.getJobsStatus()}</div>
      </>
    )
  }
}

export default JobItemDetails
