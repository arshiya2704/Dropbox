import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from 'material-ui/styles';
import * as API from '../api/API';

// const styles = theme => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         justifyContent: 'space-around',
//         overflow: 'hidden',
//         background: theme.palette.background.paper,
//     },
//     gridList: {
//         width: 500,
//         height: 450,
//     },
//     subheader: {
//         width: '100%',
//     },
// });


class ImageGridList extends Component {



    static propTypes = {

        files: PropTypes.array.isRequired
    };
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
            transition:' all .2s ease-in-out'
        };

        var smallLabel = {
            fontSize: 'small',
            padding: '15px',

        };
        const images= this.props.files;
        const imageList = images.map((img) =>

            img.fileType==='F'?
                <div>
                <img style={divStyle} className="img-responsive pull-left img-thumbnail" src={img.img}/>
                    <i className="fa fa-share-alt" aria-hidden="true"></i></div>
                :<div style={glyphStyle} className="row">
                    <div className="col-xs-12"><i className="fa fa-folder-open"></i></div>
                    <span style={smallLabel} className="col-xs-12">{img.fileName}</span>

                    </div>

        );
        {
            return(
                <div>
                    {imageList}
                    <div>
                        {/*<button className="btn btn-primary" onClick={() => this.handleShare()}>share</button>*/}
                    </div>
                </div>

            )
        }
    }


}


export default(ImageGridList);