import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Container } from '@material-ui/core'
import './DefaultComponent.css'

export default function DefaultComponent() {
    var recentArray = JSON.parse(localStorage.getItem("recentSearch") || "[]");
    if (recentArray.length === 0) {
        recentArray = [{
            name: "Rome",
            secondary_name: "Italy"
        },
        { name: "London", secondary_name: "United Kingdom" },
        { name: 'Sydney', secondary_name: "Australia" },
        { name: "New York", secondary_name: "United States" },
        { name: "Paris", secondary_name: "France" }]
    }
    var recentCities = [], popularCities = [];
    for (let index = 0; index < recentArray.length; index++) {
        recentCities.push(<button key={index}>{recentArray[index].name}</button>)
        popularCities.push(<Col xs={12} key={index} md={4}><Row>
            <p className="City">
                {recentArray[index].name}
            </p>
            <p className="Country">
                {recentArray[index].secondary_name}
            </p>

        </Row></Col>)
    }
    console.log(popularCities)

    return (
        <React.Fragment>
            <p className="SearchHeading">Recent Searches</p>
            <Container >

                <Row>
                    <div className="Btn-group">
                        {recentCities}
                    </div>

                </Row>
            </Container>
            <p className="SearchHeading">Popular Cities</p>
            <Container>
                <Row>
                    {popularCities}
                </Row>
            </Container>
        </React.Fragment>
    )
}
