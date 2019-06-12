// add in css
exports.decorateConfig = (config) => {
    return Object.assign({}, config, {
      css: `
        .header_shorcut {
            height: 34px;
            position: absolute;
            left: 40px;
            top: 0px;
            width: fit-content;
            justify-content: left;
            -webkit-app-region: drag;
        }
        .header_shorcut .header_shape,
        .header_shorcut .header_shape > svg {
            width: 40px;
            height: 34px;
            -webkit-app-region: no-drag;
            color: rgb(255, 255, 255);
            opacity: 0.5;
            shape-rendering: crispEdges;
            padding: 12px 15px;
        }
        .header_shape:hover {
            opacity: 1;
        }
        .header_shape:active {
            opacity: 0.3;
        }
        ${config.css || ''}
        `
    });
}

// add in header
exports.decorateHeader = (Header, { React }) => {

    class HyperShorcutHeader extends React.Component {
        constructor(props, context) {
            super(props, context);
            this.handleTab = this.handleTab.bind(this);
            this.handleVertically = this.handleVertically.bind(this);
            this.handleHorizontally = this.handleHorizontally.bind(this);
        }

        componentDidMount() {}

        componentWillUnmount() {}

        handleTab() {
            // TODO: use last cwd
            rpc.emit('new', { isNewGroup: true });
        }

        handleVertically() {
            // TODO: use last cwd
            rpc.emit('new', { splitDirection: 'VERTICAL' });
        }

        handleHorizontally() {
            // TODO: use last cwd
            rpc.emit('new', { splitDirection: 'HORIZONTAL' });
        }

        // call at draw
        render() {
            this.props.customChildrenBefore =
            React.createElement('div', {
                    className: 'header_shorcut header_windowHeader'
                },
                // new tab
                React.createElement('svg', {
                        xmlnx: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 10 10",
                        className: 'header_shape header_newTab',
                        onClick: this.handleTab
                    },
                    React.createElement('title', {}, 'New tab' ),
                    React.createElement('g', { className: 'header_newTab_icon' },
                        React.createElement('path', {
                                d: "M4,0V4H0v2h4v4H6V6h4V4H6V0Z",
                                fill: "#ffffff"
                            }
                        )
                    )
                ),
                // slit horizontal
                React.createElement('svg', {
                        xmlnx: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 10 10",
                        className: 'header_shape header_splitHorizontal',
                        onClick: this.handleHorizontally
                    },
                    React.createElement('title', {}, 'Split horizontally' ),
                    React.createElement('g', { className: 'header_splitHorizontal_icon' },
                        React.createElement('path', {
                                d: "M0,0V10H10V0ZM9,9H1V6H9ZM9,4H1V1h8z",
                                fill: "#ffffff"
                            }
                        )
                    )
                ),
                // slit vertical
                React.createElement('svg', {
                        xmlnx: "http://www.w3.org/2000/svg",
                        viewBox: "0 0 10 10",
                        className: 'header_shape header_splitVertical',
                        onClick: this.handleVertically
                    },
                    React.createElement('title', {}, 'Split vertically' ),
                    React.createElement('g', { className: 'header_splitVertical_icon' },
                        React.createElement('path', {
                                d: "M0,0V10H10V0ZM9,9H6V1H9ZM4,9H1V1h3z",
                                fill: "#ffffff"
                            }
                        )
                    )
                ),
                this.props.customChildrenBefore
            );
            return React.createElement(
                Header,
                Object.assign({}, this.props, {})
            );
        }
    }
    return HyperShorcutHeader;

};
