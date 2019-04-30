import React from 'react'
import PropTypes from 'prop-types'
import ReactReCaptcha from 'react-recaptcha'
import { Col, Row } from 'antd'

class ReCaptcha extends React.Component {
    constructor(props) {
        super(props)

        this.ref = React.createRef()

        this.onloadCallback = this.onloadCallback.bind(this)
        this.verifyCallback = this.verifyCallback.bind(this)
    }

    render() {
        return (
            <React.Fragment>
                <Col span={24} className="mt" >
                    <Row type="flex" justify="center" >
                        <ReactReCaptcha
                        ref={this.ref}
                        sitekey={this.props.sitekey}
                        render="explicit"
                        onloadCallback={this.onloadCallback}
                        verifyCallback={this.verifyCallback}
                        />
                    </Row>
                </Col>
            </React.Fragment>
        )
    }

    onloadCallback() {
        this.props.onloadCallback()
    }

    verifyCallback(token) {
        this.props.verifyCallback(token)
    }

    updateReCaptcha() {
        
    }
}

ReCaptcha.propTypes = {
    sitekey: PropTypes.string,
    onloadCallback: PropTypes.func,
    verifyCallback: PropTypes.func,
}

export default ReCaptcha
