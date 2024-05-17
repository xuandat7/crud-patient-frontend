import React from 'react'

const HomeComponent = () => {
  return (
    
    <div className='container'>
        <div className="container mt-lg-4">
  <div className="schedule-inner">
    <div className="row">
      <div className="col-lg-4 col-md-6 col-12">
        {/* single-schedule */}
        <div className="single-schedule first">
          <div className="inner">
            <div className="icon">
              <i className="fa fa-ambulance"></i>
            </div>
            <div className="single-content">
              <span>Lorem Amet</span>
              <h4>Emergency Cases</h4>
              <p>Lorem ipsum sit amet consectetur adipiscing elit. Vivamus et erat in lacus convallis sodales.</p>
              <a href="#">LEARN MORE<i className="fa fa-long-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 col-12">
        {/* single-schedule */}
        <div className="single-schedule middle">
          <div className="inner">
            <div className="icon">
              <i className="icofont-prescription"></i>
            </div>
            <div className="single-content">
              <span>Fusce Porttitor</span>
              <h4>Doctors Timetable</h4>
              <p>Lorem ipsum sit amet consectetur adipiscing elit. Vivamus et erat in lacus convallis sodales.</p>
              <a href="#">LEARN MORE<i className="fa fa-long-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-4 col-md-12 col-12">
        {/* single-schedule */}
        <div className="single-schedule last">
          <div className="inner">
            <div className="icon">
              <i className="icofont-ui-clock"></i>
            </div>
            <div className="single-content">
              <span>Donec luctus</span>
              <h4>Opening Hours</h4>
              <ul className="time-sidual">
                <li className="day">Monday - Fridayp <span>8.00-20.00</span></li>
                <li className="day">Saturday <span>9.00-18.30</span></li>
                <li className="day">Monday - Thusday <span>9.00-15.00</span></li>
              </ul>
              <a href="#">LEARN MORE<i className="fa fa-long-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        <div className="row">
            <div className="col-lg-12">
                <div className="section-title">
                    <h2>We Are Always Ready to Help You & Your Family</h2>
                    <img src="src/assets/section-img.png" alt="#" />
                    <p>Lorem ipsum dolor sit amet consectetur adipiscing elit praesent aliquet. pretiumts</p>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-4 col-12">
                {/* Start Single features */}
                <div className="single-features">
                    <div className="single-icon">
                        <i className="icofont icofont-ambulance-cross"></i>
                    </div>
                    <h3>Emergency Help</h3>
                    <p>Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam vulputate.</p>
                </div>
                {/* End Single features */}
            </div>
            <div className="col-lg-4 col-12">
                {/* Start Single features */}
                <div className="single-features">
                    <div className="signle-icon">
                        <i className="icofont icofont-medical-sign-alt"></i>
                    </div>
                    <h3>Enriched Pharmecy</h3>
                    <p>Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam vulputate.</p>
                </div>
                {/* End Single features */}
            </div>
            <div className="col-lg-4 col-12">
                {/* Start Single features */}
                <div className="single-features last">
                    <div className="signle-icon">
                        <i className="icofont icofont-stethoscope"></i>
                    </div>
                    <h3>Medical Treatment</h3>
                    <p>Lorem ipsum sit, consectetur adipiscing elit. Maecenas mi quam vulputate.</p>
                </div>
                {/* End Single features */}
            </div>
        </div>
        
    </div>
  )
}

export default HomeComponent