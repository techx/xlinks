import React, { Component } from 'react';
import '../../css/app.css';
import '../../css/root.css';

export default class Root extends Component {
    constructor(props) {
        super(props);

        this.state = {
            password: "",
            filter: "",
            links: [],
            filteredLinks: [],
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
                    <input className="rootPasswordInput" type="password" name="password" id="password" onChange={this.handleChange} value={this.state.password} placeholder="Input password to view xlinks." />
                    <button onClick={this.submitPassword}>Go!</button>
                </div>
                <div className="rootResult">
                    {this.state.links.length == 0 ? (null) :
                    <div className="xlinkSearch">
                        <input className="rootFilterInput" name="filter" id="filter" onChange={this.handleChange} value={this.state.filter} placeholder="Search for an xlink." />
                    </div>
                    }
                    {filteredLinks.map((link, ind) => (
                        <div className="xlink">
                            <div className="xlinkKey" key={`key${ind}`}>
                                {link.key}
                            </div>
                            <p>-></p>
                            <div className="xlinkValue" key={`value${ind}`}>
                                <a href={link.url}>{link.url}</a>
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
        let result = [];
        let filter = this.state.filter;
        let links = this.state.links;
        links.forEach(link => {
            if (link.key.indexOf(filter) != -1) {
                result.push({
                    key: link.key,
                    url: link.url,
                });
            }
        });
        this.setState({
            filteredLinks: result,
        });
    }

    submitPassword = () => {
        fetch('/api/verify_user?password=' + this.state.password)
        .then(res => {
            if (res.status == 403) {
                this.setState({
                    links: [],
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