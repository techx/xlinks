import React, { Component } from 'react';
import '../../css/App.css';
import '../../css/root.css';

export default class Root extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            filter: "",
            links: {},
            filteredLinks: {},
        };
    }

    componentDidMount() {
        document.title = "Welcome!";
    }
    
    render() {
        let filteredLinks = this.state.filteredLinks;
        return (
            <div className="rootContainer">
                <div className="rootInput">
                    <h1>View XLinks</h1>
                    <label htmlFor="password">Password: </label>
                    <input className="rootPasswordInput" name="password" id="password" onChange={this.handleChange} value={this.state.password} placeholder="Input password to view xlinks." />
                    <button onClick={this.submitPassword}>Go!</button>
                </div>
                <div className="rootResult">
                    {Object.keys(this.state.links).length == 0 ? (null) :
                    <div className="xlinkSearch">
                        <input className="rootFilterInput" name="filter" id="filter" onChange={this.handleChange} value={this.state.filter} placeholder="Search for an xlink." />
                    </div>
                    }
                    {Object.keys(filteredLinks).map((key, ind) => (
                        <div className="xlink">
                            <div className="xlinkKey" key={`key${ind}`}>
                                {key}
                            </div>
                            <p>-></p>
                            <div className="xlinkValue" key={`value${ind}`}>
                                <a href={filteredLinks[key]}>{filteredLinks[key]}</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    handleChange = (event) => {
        let name = event.target.name;
        this.setState({
            [name]: event.target.value,
        }, () => {
            if (name == "filter") {
                this.filterLinks();
            }
        });
    }

    filterLinks = () => {
        let result = {};
        let filter = this.state.filter;
        let links = this.state.links;
        Object.keys(links).forEach(key => {
            if (key.indexOf(filter) != -1) {
                result[key] = links[key];
            }
        });
        this.setState({
            filteredLinks: result,
        });
    }

    submitPassword = () => {
        let body = {
            password: this.state.password,
        };
        fetch('/api/verify_user?password=' + this.state.password)
        .then(res => {
            if (res.status == 403) {
                this.setState({
                    links: {},
                });
            } else if (res.status == 200) {
                res.json()
                .then(res => {
                    this.setState({
                        links: res.links,
                        filteredLinks: res.links,
                        filter: "",
                    });
                });
            }
        });
    }
}