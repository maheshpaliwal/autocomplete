import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Container } from '@material-ui/core'
import { RoomOutlined } from '@material-ui/icons'
import './DropDownComponent.css'
export default function DropDownComponent(props) {
    return (
        <Container>
            <Row>
                <Col xs={3} md={1} >
                    <RoomOutlined className="locationIcon" />
                </Col>
                <Col xs={9} md={11}>
                    <p className="headingColor">{props.name}</p>
                    <p className='suggestionName'>{props.secondary_name}</p>
                </Col>
            </Row>
        </Container>
    )
}
