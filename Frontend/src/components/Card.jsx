import React from 'react'
import './Card.css'
const Card = ({events}) => {
    console.log(events)
  return (
    <>
        <div className="container h-100">
            <div className="row align-middle">
                <div className="col-md-6 col-lg-4 column">
                    <div className="card gr-1">
                        <div className="txt">
                            <h1>BRANDING AND <br/>
                            CORPORATE DESIGN</h1>
                            <p>Visual communication and problem-solving</p>
                        </div>
                        <a href="#">more</a>
                        <div className="ico-card">
                            <i className="fa fa-rebel"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Card
