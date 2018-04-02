import React from 'react';
import {Bar} from 'react-chartjs-2';
import { getBarGraphData } from '../utility/GraphHelper';

var data = {
    labels: [8,7,6,5,4,3,2,1],
    datasets: [
        {
            label: 'Nucking Figgers',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: () => {
                return fetch('https://4770e0a9.ngrok.io/getData')
                .then(function(myJson) {
                    console.log(myJson);
                    return getBarGraphData(myJson.json());
                });
            }
        }
    ]
};

export class SsimRangeChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dynamicData: [] };
        this.fetchProducts = this.fetchProducts.bind(this);
    }

    componentDidMount() {
        this.refreshTimer = setInterval(this.fetchProducts, 4000);
    }

    componentWillUnmount() {
        clearInterval(this.refreshTimer);
    }

    fetchProducts() {
        //simulate API fetch from server - we'll just create a list with random prices
        var that = this;
        fetch('https://4770e0a9.ngrok.io/getData').then(response =>
            response.json().then(data => ({
                    data: data,
                    status: response.status
                    })
                ).then(res => {
                const data = getBarGraphData(res.data);
                that.setState({dynamicData: data});
                })
        );
    }
    render() {
        return (
            <div>
                <h2>Nucking Figgers</h2>
                <Bar
                    data={{
                        labels: ["(-INF, -0.1)","[-0.1, -0.05)",
                            "[-0.05, 0.0)","[0.0, 0.05)","[0.05, 0.1)","[0.1, INF)"],
                        datasets: [
                            {
                                label: '# Samples',
                                backgroundColor: 'rgba(255,99,132,0.2)',
                                borderColor: 'rgba(255,99,132,1)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                                hoverBorderColor: 'rgba(255,99,132,1)',
                                data: this.state.dynamicData
                            }
                        ]
                    }}
                    width={100}
                    height={450}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
            </div>
        );
    }
}