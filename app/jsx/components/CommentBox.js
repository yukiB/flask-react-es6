import React from 'react'
import {request} from '../net'
import CommentList from './CommentList'
import CommentForm from './CommentForm'

export default class CommentBox extends React.Component {
    constructor(props) {
        super(props)
        this.loadCommentsFromServer.bind(this)
        this.state = {
            data: []
        };
    }

     handleCommentSubmit(comment) {
         request('/data', comment, (data) => this.setState({data: data['data']}));
  }

    loadCommentsFromServer() {
        request('/data', {}, (data) => this.setState({data: data['data']}), 'GET');
    }

    componentDidMount() {
        this.loadCommentsFromServer();
    }

    render() {
        return(
                <div className='commentBox'>
                <h2>Comments</h2>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
                </div>
        );
    }
}
