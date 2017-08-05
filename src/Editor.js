import React from 'react';
import './Editor.css';// Editor.css 파일 임포트
import Profile from './Profile';

class Editor extends React.Component {
    /*사용되는 메쏘드들을 모두 this 로 사용할 수 있도록 바인딩 해 준다.*/
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onPaste = this.onPaste.bind(this);
        this.editorChange = this.editorChange.bind(this);
        this.getCard = this.getCard.bind(this);
        this.hasValue = this.hasValue.bind(this);
        //embedlyUrl과 content로 분리해 준다. 사용자 추가 전
        this.state = {
            embedlyUrl : undefined,
            content : undefined
        };
    }
    detectURL(text){
        var urls = (text.match(/(https?:\/\/[^\s]+)/g) ||
            text.match(/(www.[^\s]+)/g));
        if (urls.length > 0) return urls[0];
        else return undefined;
    }
    // 복사 붙여넣기에 사용되는 이벤트를 다뤄준다.
    onPaste(event){
        //클립보드 아이템의 첫번째 배열에서 text 를 받는다.
        event.clipboardData.items[0].getAsString( text => {
            //원래는 text가 String 형태인지 확인해 봐야하지만 getAsString이라 에러보다는 비정상 작동
            //이 이루어질 수 있다.
            // detectURL 이라는 dummy function 이 필요하다.
            if (this.detectURL(text)) {
                //content 의 state는 이미 붙여진 상태 이후기 때문에 state를 그대로 가져와도 됨
                this.setState({embedlyUrl:text});
            }
        });
    }
    editorChange(event){
        // detectURL 이라는 dummy function 이 필요하다.
        let checkText = this.detectURL(event.currentTarget.textContent);
        if (!this.state.embedlyUrl &&
            (event.keyCode === 32 || event.keyCode === 13) &&
            checkText){
            this.setState({embedlyUrl:checkText,content:event.currentTarget.textContent});
        } else {
            this.setState({content:event.currentTarget.textContent});
        }
    }
    hasValue(value){
        if((value && (typeof value) === "string"))
            return (!value)?false:(value.trim() === "" ? false : true);
        else return false;
    }
    handleSubmit(event){
        this.props.submit();
    }
    getCard(embedlyUrl){
        if(embedlyUrl){
            return(
                <div>{embedlyUrl}</div>
            );
        }else{
            return(<div/>);
        }
    }
    render() {
        return (
            <div className="wrapEditor">
                <Profile isAnonymous={this.props.isAnonymous}/>
                <div className="textEditor">
                    <div className="innerEdit"
                         contentEditable="true"
                         placeholder="글쓰기..."
                         onPaste={this.onPaste}
                         onKeyUp={this.editorChange}></div>
                </div>
                <div className="actionBar">
                    <button className="upload"
                            onClick={this.props.submit}><span>스탠드업!</span></button>
                </div>
            </div>
        );
    }
}
export default Editor;
