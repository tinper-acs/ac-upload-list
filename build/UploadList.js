'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _beeTable = require('bee-table');

var _beeTable2 = _interopRequireDefault(_beeTable);

var _beeCheckbox = require('bee-checkbox');

var _beeCheckbox2 = _interopRequireDefault(_beeCheckbox);

var _multiSelect = require('bee-table/build/lib/multiSelect.js');

var _multiSelect2 = _interopRequireDefault(_multiSelect);

var _acBtns = require('ac-btns');

var _acBtns2 = _interopRequireDefault(_acBtns);

var _util = require('./util');

var _lodash = require('lodash.clonedeep');

var _lodash2 = _interopRequireDefault(_lodash);

var _data = require('./data');

var _data2 = _interopRequireDefault(_data);

var _beeUpload = require('bee-upload');

var _beeUpload2 = _interopRequireDefault(_beeUpload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var MultiSelectTable = (0, _multiSelect2["default"])(_beeTable2["default"], _beeCheckbox2["default"]);

var propTypes = {
    clsfix: _propTypes2["default"].string
};

var defaultProps = {
    clsfix: 'ac-upload-list'
};
var columns = [{
    title: "附件名称",
    dataIndex: "fileName",
    key: "fileName",
    className: "rowClassName",
    width: 300
}, {
    title: "文件类型",
    dataIndex: "fileExtension",
    key: "fileExtension",
    width: 100
}, {
    title: "文件大小",
    dataIndex: "fileSizeText",
    key: "fileSizeText",
    width: 100
}, {
    title: "上传人",
    dataIndex: "userName",
    key: "userName",
    width: 200
}, {
    title: "上传时间",
    dataIndex: "ctime",
    key: "ctime",
    width: 200,
    render: function render(text, record, index) {
        return (0, _util.format)(new Date(text), 'YYYY-MM-DD HH:mm');
    }
}];

var UploadList = function (_Component) {
    _inherits(UploadList, _Component);

    function UploadList(props) {
        _classCallCheck(this, UploadList);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props));

        _this.getSelectedDataFunc = function (selectedList, record, index) {
            var ids = [];
            selectedList.forEach(function (item, index) {
                ids.push(item.id);
            });

            var data = (0, _lodash2["default"])(_this.state.data);
            data.forEach(function (item, index) {
                if (ids.indexOf(item.id) == -1) {
                    item._checked = false;
                } else {
                    item._checked = true;
                }
            });
            _this.setState({
                data: data,
                selectedList: selectedList
            });
        };

        _this.state = {
            data: _data2["default"],
            selectedList: []
        };
        return _this;
    }

    UploadList.prototype.render = function render() {
        var clsfix = this.props.clsfix;
        var _state = this.state,
            selectedList = _state.selectedList,
            data = _state.data;

        var uploadProps = {
            name: 'file',
            action: 'https://ezone-u8c-daily.yyuap.com/cooperation/rest/v1/file/caep/b0c8fe8b-3c8c-47d8-aa06-a80ada1fba0d/',
            headers: {
                'Cookie': 'acw_tc=276aedee15644621392103530e674da5f58de6a4127991cd44d6c8145d00a4; NTKF_T2D_CLIENTID=guest389C0129-7C22-181E-C68C-4135DB01288B; _ga=GA1.2.159860880.1564625296; gr_user_id=32e4f9ec-5cc7-41cb-91b6-3b8218ce9314; grwng_uid=a427bb3f-b5cc-47b6-b0db-53e9d42e107e; PHPSESSID=84n0hju0j4joics0ree62keaq6; Hm_lvt_diwork=1564462121,1564463108,1565663583,1565769421; nTalk_CACHE_DATA={uid:yu_1000_ISME9754_guest389C0129-7C22-18,tid:1565949904353892}; _yyy_localip=-1; locale=zh_CN; JSESSIONID=node0i6k6rnk5obws1fzuknxkyzxi71444.node0; yht_username=ST-421-I0WearBqnuSiutFHkHLn-cas01.example.org__cc5aaab0-31a1-4f15-ad00-fb696ce325f5; yht_usertoken=gdtM8S%2FoNW8%2F8uRcz1ruSwIkcoC1wdHIt5IDNYjJbJtAgFk3VOfBu7gI3brZdUZAAbjIpMoJe1mtudG39U4CcA%3D%3D; _yyy_appid=vTVzdcbJMD6525710007; yht_access_token=bttQk13NjJ1UnJqdjlaUWR0dzBuQ29hMmpkRFRobldLeEY0QkRlelc0czNJVHc5MDBwOUJvTEgyQkFKNmJQYXNKaVFMaGU4WHFURmtXZzE4OEJXeEdlSUhFckJlQ1ViRFZSTFJyNGFLMWpxbTA9__1566785539434; wb_at=LMjqonjBmPdZq4pmtLhts8AjAEmjbZrmnkdwZlokdknqf; Hm_lpvt_diwork=1566809011; ck_safe_chaoke_csrf_token=f6bcd4e435b2226ba4c5235c9c37abc2'
            },
            onChange: function onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    console.log(info.file.name + ' file uploaded successfully');
                } else if (info.file.status === 'error') {
                    console.log(info.file.name + ' file upload failed.');
                }
            }
        };
        return _react2["default"].createElement(
            'div',
            { className: clsfix },
            _react2["default"].createElement(
                'div',
                { className: clsfix + '-btns' },
                _react2["default"].createElement(_acBtns2["default"], {
                    btns: {
                        upload: {
                            node: _react2["default"].createElement(
                                _beeUpload2["default"],
                                uploadProps,
                                _react2["default"].createElement(_acBtns2["default"], { btns: { upload: {} } })
                            )
                        },
                        download: {
                            disabled: selectedList.length > 0 ? false : true,
                            onClick: function onClick() {
                                console.log('download');
                            }
                        },
                        "delete": {
                            disabled: selectedList.length > 0 ? false : true,
                            onClick: function onClick() {
                                console.log('delete');
                            }
                        }
                    }
                })
            ),
            _react2["default"].createElement(MultiSelectTable, {
                columns: columns,
                data: data,
                rowKey: function rowKey(record, index) {
                    return index;
                },
                multiSelect: { type: "checkbox" },
                rowClassName: function rowClassName(record, index, indent) {
                    if (record._checked) {
                        return 'selected';
                    } else {
                        return '';
                    }
                },
                getSelectedDataFunc: this.getSelectedDataFunc

            })
        );
    };

    return UploadList;
}(_react.Component);

;

UploadList.propTypes = propTypes;
UploadList.defaultProps = defaultProps;
exports["default"] = UploadList;
module.exports = exports['default'];