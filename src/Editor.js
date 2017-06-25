import React from 'react';
import './Editor.css';// Editor.css 파일 임포트
import Profile from './Profile';

class Editor extends React.Component {
    render () {
        return (
            <div className="wrapEditor">
                <Profile isAnonymous={this.props.isAnonymous}/>
                isAnonymous 값을 props로 받는다.
                <div className="textEditor">
                    <div className="innerEdit"
                        contentEditable="true"
                        placeholder="글쓰기..."/>
                </div>
                <div className="actionBar">
                    <button className="upload" onClick={this.props.handleSubmit}>
                        Write
                        <span>스탠드업!</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default Editor;
