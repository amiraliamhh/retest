import React from 'react'
import ReactDOM from 'react-dom'
import { Input, Row, Col, Button, Alert } from 'antd'

import ReCaptcha from './ReCaptcha'

import GithubIcon from './assets/github.png'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoaded: false,
            loading: false,
            key: null,
            show: false,
            token: null,
        }

        this.ref = React.createRef()
        this.id = "recaptcha"

        this.onLoad = this.onLoad.bind(this)
        this.onVerify = this.onVerify.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleOnClick = this.handleOnClick.bind(this)
        this.mountReCaptcha = this.mountReCaptcha.bind(this)
        this.unmountReCaptcha = this.unmountReCaptcha.bind(this)
    }

    render() {
        const { loading, token } = this.state

        return (
            <React.Fragment>
                <Row className="mt" >
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
                            loading={loading}
                            type="primary" 
                            htmlType="submit">
                            Show ReCaptcha
                            </Button>
                        </Col>
                    </form>

                    <div id={this.id} className="mt" />

                    {
                        token
                        ? <Col span={8} offset={8} className="mt" >
                            Token:
                            <br/>
                            <Alert className="break-words" message={token} type="info" />
                        </Col>
                        : null
                    }

                    <Col span={2} offset={11} className="mt" >
                        <Row type="flex" justify="center" >
                            <a href="https://github.com/amiraliamhh/retest" target="_blank" >
                                <img src={GithubIcon} className="github" alt="github"/>
                            </a>
                        </Row>
                    </Col>
                </Row>
            </React.Fragment>
        )
    }

    onLoad() {
        this.setState({
            isLoaded: true,
            loading: false,
        })
    }

    onVerify(token) {
        console.log(token)
        this.setState({
            token,
        })
    }

    handleChange(event) {
        this.setState({
            key: event.target.value,
        })
    }

    handleOnClick(event) {
        event.preventDefault()
        const { isLoaded, } = this.state
        
        this.setState({
            loading: true,
            show: true,
        }, () => {
            if (isLoaded) {
                this.unmountReCaptcha()
                setTimeout(() => {
                    this.mountReCaptcha()
                }, 0);
                
            } else {
                this.mountReCaptcha()
            }
        })
    }

    mountReCaptcha() {
        const { key } = this.state
        
        ReactDOM.render(<ReCaptcha
        sitekey={key}
        onloadCallback={this.onLoad}
        verifyCallback={this.onVerify}
        />, document.getElementById(this.id))
    }

    unmountReCaptcha() {
        const node = document.getElementById(this.id)

        try {
            ReactDOM.unmountComponentAtNode(node)
        } catch(e) {
            console.error(e)
        }
    }
}

export default App