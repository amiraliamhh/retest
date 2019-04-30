import React from 'react'
import { Input, Row, Col, Button } from 'antd'
import ReCaptcha from 'react-recaptcha'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false,
            key: null,
            show: false,
        }

        this.onLoad = this.onLoad.bind(this)
        this.onVerify = this.onVerify.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleOnClick = this.handleOnClick.bind(this)
    }

    render() {
        const { loading, key, show } = this.state

        return (
            <React.Fragment>
                <Row>
                    <Col span={16} offset={4} className="text-center" >
                        <h1>Retest - Easily Test Google ReCaptcha</h1>
                    </Col>

                    <form onSubmit={this.handleOnClick} >
                        <Col span={8} offset={8} >
                            <Input 
                            required={true} 
                            placeholder="Your Google ReCaptcha Key"
                            onChange={this.handleChange}
                             />
                        </Col>

                        <Col span={6} offset={9} className="text-center mt" >
                            <Button 
                            onClick={this.handleOnClick}
                            loading={loading}
                            type="primary" 
                            htmlType="submit">
                            Show ReCaptcha
                            </Button>
                        </Col>
                    </form>

                    {
                        show
                        ? <Col span={24} className="mt" >
                            <Row type="flex" justify="center" >
                                <ReCaptcha
                                sitekey={key}
                                render="explicit"
                                onloadCallback={this.onLoad}
                                verifyCallback={this.onVerify}
                                />
                            </Row>
                        </Col>
                        : null
                    }
                </Row>
            </React.Fragment>
        )
    }

    onLoad() {
        console.log('loaded')
    }

    onVerify(token) {
        console.log('token: ', token);
    }

    handleChange(event) {
        this.setState({
            key: event.target.value,
        })
    }

    handleOnClick(event) {
        event.preventDefault()

        this.setState({
            show: true,
        })
    }
}

export default App