import React, { Component } from 'react'
import { Container, TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import './AutoComplete.css'
import { Row, Col } from 'react-bootstrap'
import { Search, HighlightOff, ArrowDropDownCircle } from '@material-ui/icons';
import axios from 'axios'
import DropDownComponent from './DropDownComponent'
import DefaultComponent from './DefaultComponent'

export class AutoComplete extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: []
        }
    }

    handleAuto = (event, value) => {
        if (event) {
            if (value.length >= 3) {
                axios.get(` https://base.amberstudent.com/api/v0/regions?limit=5&region_types=locality%2Csublocality%2Cestablishment&sort_key=search_name&sort_order=desc&states=active&only=id%2Cname%2Ccanonical_name%2Cmeta%2Cregion_type%2Csecondary_name&search_name=${event.target.value}`).then((res) => {
                    if (res.status === 200) {
                        var resultArray = [];
                        for (var i = 0; i < res.data.data.result.length; i++) {
                            var option = res.data.data.result[i];
                            option.default = false;
                            resultArray.push(option);
                        }
                        if (resultArray.length > 0) {
                            localStorage.setItem('recentSearch', JSON.stringify(resultArray));
                        }
                        this.setState({
                            options: resultArray
                        })
                    }

                })
                    .catch((error) => {
                        console.log(error)
                    })
            }
            else {
                this.setState({
                    options: []
                })

            }
        }
    }

    render() {
        return (
            <React.Fragment>

                <Container>
                    <Row>
                        <Col sm={0} xs={0} md={1}>
                        </Col>
                        <Col sm={8} xs={8} md={7} className="ColStyle"  >
                            <Autocomplete
                                filterOptions={(options, state) => options}
                                options={this.state.options.map(option => option)}
                                getOptionLabel={(option) => option.name}
                                onInputChange={this.handleAuto}
                                closeIcon={<HighlightOff />}
                                popupIcon={<ArrowDropDownCircle />}
                                renderOption={(option) => (
                                    <DropDownComponent  {...option} />

                                )}
                                noOptionsText={<DefaultComponent />}
                                renderInput={(params) => <TextField {...params}
                                    className="AutoCompleteText"
                                    placeholder="Search by College or City" variant="outlined" />}
                            />

                        </Col>
                        <Col sm={4} xs={4} md={3} className="ColStyle">
                            <button className="SearchButton">
                                <Search className='SearchIcon' />
                                Search </button>
                        </Col>
                        <Col sm={0} xs={0} md={1}>

                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        )
    }
}

export default AutoComplete
