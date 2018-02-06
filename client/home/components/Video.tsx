import * as React from 'react';
import { Link } from "react-router-dom";

interface VideoProps {

};
class Video extends React.Component<VideoProps> {
    constructor(props, context) {
        super(props, context);
    }
    render() {
        return (<div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog video_box" role="document">
                <div className="modal-content">
                    <video width="100%" controls>
                        <source src="images/elite_video.mp4" type="video/mp4" />
                        <source src="images/elite_video.ogg" type="video/ogg" />
                        Your browser does not support HTML5 video.
                    </video>
                </div>
            </div>
        </div>);
    }
}

export default Video;