import React from 'react'
import request from 'superagent'
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
        request
            .post(this.props.url)
            .query(comment)
            .end(function(err, res){
                if (err)
                    console.error(this.props.url, status, err.toString());
                else{
                    let data = JSON.parse(res.text)
                    this.setState({data: data['data']})
                }
            }.bind(this))  
  }

    loadCommentsFromServer() {
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
