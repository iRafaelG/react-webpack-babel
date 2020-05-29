import '@babel/polyfill';
import React, { Component } from "react";
import { format } from "timeago.js";

import Heading from './Heading';
import Row from "./Row";

class App extends Component {

    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    componentDidMount() {

        setInterval( async () => {
            let res = await fetch('https://openlibrary.org/recentchanges.json?limit=10');

            let data = await res.json();
    
            let formatData = this.formatData(data)
    
            this.setState({data: formatData})
        }, 1000)
        
    }

    formatData(data) {
        return data.map((data, i) => {
            return {
                when: format(data.timestamp),
                who: data.author.key,
                description: data.comment
            }
        })
    }

    render() {
        
        return (
            <div className="container p-4">
                <h1>{ this.props.title }</h1>
                <table className="table table-bordered">
                    <thead className="table-success">
                        <tr>
                            {
                                this.props.headings.map((heading, i) => {
                                    return <Heading key={i} heading={heading}/>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((row, i) => {
                                return <Row key={i} change={row} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default App;