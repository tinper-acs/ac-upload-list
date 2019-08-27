import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Table from 'bee-table';
import Checkbox from 'bee-checkbox'
import multiSelect from "bee-table/build/lib/multiSelect.js";
import Btns from 'ac-btns';
import { format } from './util';
import cloneDeep from 'lodash.clonedeep';
import Data from './data';
import Upload from 'bee-upload';


let MultiSelectTable  = multiSelect(Table, Checkbox);

const propTypes = {
    clsfix:PropTypes.string
};

const defaultProps = {
    clsfix:'ac-upload-list'
};
const columns = [{
        title: "附件名称",
        dataIndex: "fileName",
        key: "fileName",
        className: "rowClassName",
        width:300
    },
    {
        title: "文件类型",
        dataIndex: "fileExtension",
        key: "fileExtension",
        width: 100
    },
    {
        title: "文件大小",
        dataIndex: "fileSizeText",
        key: "fileSizeText",
        width: 100
    },
    {
        title: "上传人",
        dataIndex: "userName",
        key: "userName",
        width: 200
    },
    {
        title: "上传时间",
        dataIndex: "ctime",
        key: "ctime",
        width: 200,
        render:(text,record,index)=>{
            return format(new Date(text),'YYYY-MM-DD HH:mm')
        }
    }
];

class UploadList extends Component {
    constructor(props){
        super(props);
        this.state = {
            data:Data,
            selectedList:[]
        }
    }

    getSelectedDataFunc = (selectedList,record,index) => {
        let ids = []
        selectedList.forEach((item,index) => {
            ids.push(item.id)
        });

        let data = cloneDeep(this.state.data);
        data.forEach((item,index)=>{
            if(ids.indexOf(item.id)==-1){
                item._checked=false
            }else{
                item._checked=true
            }
        })
        this.setState({
            data,
            selectedList
        })    
    };
    render(){
        let { clsfix } = this.props;
        let { selectedList,data } = this.state;
        const uploadProps ={
            name: 'file',
            action: 'https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/caep/b0c8fe8b-3c8c-47d8-aa06-a80ada1fba0d/',
            headers: {
                'Cookie':'acw_tc=276aedee15644621392103530e674da5f58de6a4127991cd44d6c8145d00a4; NTKF_T2D_CLIENTID=guest389C0129-7C22-181E-C68C-4135DB01288B; _ga=GA1.2.159860880.1564625296; gr_user_id=32e4f9ec-5cc7-41cb-91b6-3b8218ce9314; grwng_uid=a427bb3f-b5cc-47b6-b0db-53e9d42e107e; PHPSESSID=84n0hju0j4joics0ree62keaq6; Hm_lvt_diwork=1564462121,1564463108,1565663583,1565769421; nTalk_CACHE_DATA={uid:yu_1000_ISME9754_guest389C0129-7C22-18,tid:1565949904353892}; _yyy_localip=-1; locale=zh_CN; JSESSIONID=node0i6k6rnk5obws1fzuknxkyzxi71444.node0; yht_username=ST-421-I0WearBqnuSiutFHkHLn-cas01.example.org__cc5aaab0-31a1-4f15-ad00-fb696ce325f5; yht_usertoken=gdtM8S%2FoNW8%2F8uRcz1ruSwIkcoC1wdHIt5IDNYjJbJtAgFk3VOfBu7gI3brZdUZAAbjIpMoJe1mtudG39U4CcA%3D%3D; _yyy_appid=vTVzdcbJMD6525710007; yht_access_token=bttQk13NjJ1UnJqdjlaUWR0dzBuQ29hMmpkRFRobldLeEY0QkRlelc0czNJVHc5MDBwOUJvTEgyQkFKNmJQYXNKaVFMaGU4WHFURmtXZzE4OEJXeEdlSUhFckJlQ1ViRFZSTFJyNGFLMWpxbTA9__1566785539434; wb_at=LMjqonjBmPdZq4pmtLhts8AjAEmjbZrmnkdwZlokdknqf; Hm_lpvt_diwork=1566809011; ck_safe_chaoke_csrf_token=f6bcd4e435b2226ba4c5235c9c37abc2'
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                console.log(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                console.log(`${info.file.name} file upload failed.`);
                }
            },
        }
        return(
            <div className={clsfix}>
                <div className={`${clsfix}-btns`}>
                    <Btns
                        btns={{
                            upload:{
                                node:<Upload {...uploadProps}>
                                        <Btns btns={{ upload:{} }}/>
                                    </Upload>
                            },
                            download: {
                                disabled:selectedList.length>0?false:true,
                                onClick: () => {
                                    console.log('download')
                                }
                            },
                            delete: {
                                disabled:selectedList.length>0?false:true,
                                onClick: () => {
                                    console.log('delete')
                                }
                            },
                        }}
                    />
                </div>
                <MultiSelectTable  
                    columns={columns} 
                    data={data} 
                    rowKey={(record,index)=>index}
                    multiSelect={{ type: "checkbox" }}
                    rowClassName={(record,index,indent)=>{
                      if (record._checked) {
                          return 'selected';
                      } else {
                          return '';
                      }
                    }}
                    getSelectedDataFunc={this.getSelectedDataFunc}
                
                />
            </div>
        )
    }
};

UploadList.propTypes = propTypes;
UploadList.defaultProps = defaultProps;
export default UploadList;