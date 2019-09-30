import React, {useState, useEffect} from 'react';
import './Tags.css';

function Tags(props) {

    const [tags, setTags] = useState(null);

    useEffect( () => {
        if (props.docRefs){
            getTagData(props.docRefs, setTags, props.attribute);
        }
    },[])

    function getTagData(tagRefs, stateToUpdate, attribute) {
        if (tagRefs){
            let tags = [];
            let tagRefsLength = tagRefs.length;
            let doc = null;
            tagRefs.forEach(async tagRef => {
                doc = await tagRef.get()
                if (!doc.exists) {
                    console.log('No such document!');
                    tagRefsLength--;
                }
                else {
                    tags.push(doc.data()[`${attribute}_${props.language.language.substr(0,2).toLowerCase()}`]);
                    if (tags.length >= tagRefsLength){
                        stateToUpdate(tags);
                    }
                }  
            });
        }
    }

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
        if (!timeEst){
            return;
        }
        if (timeEst < 60){
            return (<div className="tag beginner">{timeEst} min</div>);
        }
        if (timeEst == 60){
            return (<div className="tag beginner">1 hr</div>);
        }
        if (timeEst <= 4.5 * 60){
            return (<div className="tag intermediate">{abbreviateTime(timeEst)} hrs</div>);
        }
        else {
            return (<div className="tag advanced">{abbreviateTime(timeEst)} hrs</div>);
        }
    }

    if (props.docRefs){
        return (
            <React.Fragment>
                <h2>{props.title}</h2>
                {tags && tags.map( (tag, index)=>(
                    <p key={index}>{tag}</p>
                )) }
            </React.Fragment>
        );
    }
    if (props.difficulty || props.timeEstimate){
        return (
            <div className="tags">
                {props.difficulty ? getDifficultyTag() : null}
                {props.timeEstimate ? getTimeTag() : null}
            </div>
        );
    }
    return null;
}

export default Tags;