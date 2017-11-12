import React, {Component} from 'react';
import * as API from '../api/API';

class StarList extends Component {

    // constructor() {
    //     super();
    //     this.state = {
    //         fileName:''
    //     };
    // }
    //
    //
    // handleShare() {
    //     // API.share({path:'public/uploads/mypic-1508036106835.jpeg'})
    //     //     .then((res) => {
    //     //         alert(res);
    //     //
    //     //     });}
    //     alert("shared");
    // }
    //
    // delete(){
    //     alert("deleted!!");
    // }
    //
    // star(){
    //     API.star({fileName:'asim.png'})
    //         .then((res) => {
    //             if (res.status === 200) {
    //                 alert(res.message);
    //             }
    //         });
    // }


    render(){
        var fileStyle={
            float:'left',
            color: 'skyblue',
            marginRight: '10px',
            marginLeft: '10px',
            padding: '3px',
            fontSize: '20px'
        };

        var fileStyle1={
            float:'right',
            color: 'skyblue',
            marginRight: '10px',
            marginLeft: '10px',
            padding: '3px',
            fontSize: '20px'
        };

        var fileName={
            float: 'left',
            marginRight: '10px',
            marginLeft: '10px',
            padding: '5px'
        };

        const files1= this.props.files;
        console.log(files1);
        const starList = files1.map((file,index) =>
            (file.starVal ===true)?
                file.fileType === 'F' ?
                    <div>
                        <span style={fileStyle} className="glyphicon glyphicon-file" aria-hidden="true"></span>
                        <p style={fileName}>{file.name}</p>
                        <br/>
                        <hr/>
                    </div>:
                    <div>
                        <span style={fileStyle} className="glyphicon glyphicon-folder-close" aria-hidden="true"></span>
                        <p style={fileName}>{file.name}</p>
                        <br/>
                        <hr/>
                    </div>:
                file.fileType === '' ?
                <div>
                </div>:
                    <div></div>
        );
        {
            return(
                <div>
                    <ul>{starList}</ul>
                </div>

            )
        }
    }


}


export default(StarList);