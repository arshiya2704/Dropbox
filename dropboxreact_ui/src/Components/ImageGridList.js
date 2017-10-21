import React, {Component} from 'react';
import * as API from '../api/API';

class ImageGridList extends Component {

    handleShare(){
        API.share({path:'public/uploads/mypic-1508036106835.jpeg'})
            .then((res) => {
                alert(res);

            });}

    render(){
        var divStyle = {
            width:'100px',
            height:'100px',
            marginRight:'10px',
            marginTop:'5px'
        };

        var glyphStyle = {
            marginRight:'15px',
            marginTop:'5px',
            fontSize: '5.6em',
            float:'left',
            maxWidth: '100%',
            height: 'auto',
            padding: '4px',
            lineHeight: '1.42857143',
            backgroundColor: '#fff',
            borderRadius: '4px',
            WebkitTransition: 'all .2s ease-in-out',
            CTransition: 'all .2s ease-in-out',
            transition:' all .2s ease-in-out',
        };

        var smallLabel = {
            fontSize: 'small',
            padding: '15px',

        };

        var folderStyle ={
           color: 'lightblue',
        };


        const images= this.props.files;

        const imageList = images.map((img) =>
            img.fileType==='F'?
                <div>
                    <img style={divStyle} className="img-responsive pull-left img-thumbnail" src={img.img} alt="pic"/>
                        <a href="#"><span className="glyphicon glyphicon-share" aria-hidden="true"></span></a></div>
                :<div style={glyphStyle} className="row">
                    <span style={folderStyle} className="glyphicon glyphicon-folder-open col-xs-12"></span>
                    <span style={smallLabel} className="col-xs-12">{img.fileName}</span>
                    </div>
        );

        {
            return(
                <div>
                    {imageList}
                </div>

            )
        }
    }


}


export default(ImageGridList);