import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {GoLocation} from 'react-icons/go'

import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobsDetails = props => {
  const {job} = props

  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = job

  return (
    <Link to={`/jobs/${id}`} className="nav-list-items">
      <li className="krishna-container">
        <div className="company-logo-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="company-logo"
          />
          <div className="title-container">
            <h1 className="title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>

        <div className="package-container">
          <div className="location-employment-container">
            <div className="location-container">
              <GoLocation className="location-icon" />
              <p className="location">{location}</p>
            </div>
            <div className="location-container">
              <BsBriefcaseFill className="location-icon" />
              <p className="location">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="line" />
        <h1 className="desc-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsDetails
