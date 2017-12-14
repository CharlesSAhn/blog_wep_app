import React, { Component } from 'react';

class PostDetail extends Component{

    render(){

        const { getSelectedPostDetail } = this.props;

        return(
            <div>
                <div>
                    <p>{ getSelectedPostDetail }</p>
                </div>

            </div>
        )
    }
}


export default PostDetail