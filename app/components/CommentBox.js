import React from 'react'
import request from 'superagent'
import CommentList from './CommentList'
import CommentForm from './CommentForm'

export default class CommentBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        request
            .get(this.props.url)
            .query({})
            .end(function(err, res){
                if (err)
                    console.error(this.props.url, status, err.toString());
                else{
                    let data = JSON.parse(res.text)
                    this.setState({data: data['data']})
                }
            }.bind(this))
    }

    render() {
        return(
                <div className='commentBox'>
                <h2>Comments</h2>
                <CommentList data={this.state.data} />
                <CommentForm />
                </div>
        );
    }
}
