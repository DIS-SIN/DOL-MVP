import React from 'react';
import './ActivityBar.css';

function ActivityBar(props) {

    function abbreviateName(name) {
        let nameArray = name.split(" ");
        return `${nameArray[0]} ${nameArray[1][0]}.`;
    }

    function abbreviateEndorsements(num) {
        if (num >= 1000){
            num = num/1000;

            if (num % 1 != 0){
                num = num.toFixed(1);
            }

            return num + "k";
        }
        return num;
    }

    function abbreviateComments(num) {
        if (num > 99){
            return "99+";
        }
        return num;
    }

    return (
        <div className="activityBar">

            <div className="featuredEndorsers">
                <span className="icon">endorsedFilled</span>
                <div className="endorserCover"></div>
                <img className="featuredEndorser" src={props.endorsements.featuredEndorsers[0].profilePic} alt="" title=""/>
                <div className="endorserCover"></div>
                <img className="featuredEndorser" src={props.endorsements.featuredEndorsers[1].profilePic} alt="" title=""/>
            </div>
            <h5>{abbreviateName(props.endorsements.featuredEndorsers[0].name)} <span className="ampersand">&amp;</span> {abbreviateEndorsements(props.endorsements.endorsements)} {props.language.others}</h5>
            <h5><span className="icon">commentFilled</span> { abbreviateComments(props.comments)}</h5>
        </div>
    );
}

export default ActivityBar;