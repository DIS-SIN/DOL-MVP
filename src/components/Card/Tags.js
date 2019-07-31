import React from 'react';
import './Tags.css';

function Tags(props) {

    function getDifficultyTag() {
        switch (props.difficulty) {
            case 1:
                return (<div className="tag beginner">{props.language.beginner}</div>);
                break;
            case 2:
                return (<div className="tag intermediate">{props.language.intermediate}</div>);
                break;
            case 3:
                return (<div className="tag advanced">{props.language.advanced}</div>);
                break;
            default:
                console.error(`${props.difficulty} is not a valid difficulty`);
                break;
        }
    }

    function abbreviateTime(time) {
        time = time / 60;
        if (time % 1 != 0){
            return time.toFixed(1);
        }
        return time;
    }

    function getTimeTag() {
        let timeEst = props.timeEstimate;
        if (timeEst <= 60){
            return (<div className="tag beginner">{timeEst} min</div>);
        }
        if (timeEst <= 4.5 * 60){
            return (<div className="tag intermediate">{abbreviateTime(timeEst)} hrs</div>);
        }
        else {
            
            return (<div className="tag advanced">{abbreviateTime(timeEst)} hrs</div>);
        }
    }

    return (
        <div className="tags">
            {getDifficultyTag()}
            {getTimeTag()}
        </div>
    );
}

export default Tags;