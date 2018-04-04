import React from 'react';
import {Bar} from 'react-chartjs-2';
import { getBarGraphData, getStats } from '../utility/GraphHelper';
import {defaults} from 'react-chartjs-2';

defaults.global.defaultFontSize = 28;
defaults.global.defaultFontColor = 'rgb(0,0,0)';
defaults.global.legend.display = false;

const url='http://localhost:44000/';

const buildRow = (row, i) => {
    let td = Object.keys(row).map((k, j) => {
        return <td style={{height: '75px', 'font-size': '28px'}} key={j}>{row[k]}</td>
    })
    return (
        <tr key={i}>{td}</tr>
    )
}
const buildHeader = (header) => {
    let th = header.map((k, j) => {
        return <th style={{height: '75px', 'font-size': '28px'}} key={j}>{k}</th>
    })
    return (
        <tr>{th}</tr>
    )
}

const Table = (props) => {
    if (props.children.ssim == undefined)
        return (
        <table className="table table-striped">
            <thead>
            {buildHeader(["Stat", "SSIM Gain"])}
            </thead>
            <tbody>
            {buildRow(['Min', '', '' + '%'])}
            {buildRow(['Max', '', ''+ '%'])}
            {buildRow(['Average', '', '' + '%'])}
            {buildRow(['Median', '', '' + '%'])}
            {buildRow(['Variance', '', '' + '%'])}
            {buildRow(['Standard Deviation', '', '' + '%'])}
            {buildRow(['# Samples', '', '' + '%'])}
            </tbody>
        </table>
        );
    return (
        <table className="table table-striped">
            <thead>
            {buildHeader(["", ""])}
            </thead>
            <tbody>
            {buildRow(['Min', props.children.ssim.min])}
            {buildRow(['Max', props.children.ssim.max])}
            {buildRow(['Average', props.children.ssim.avrg])}
            {buildRow(['Median', props.children.ssim.median])}
            {buildRow(['Variance', props.children.ssim.vari])}
            {buildRow(['# Samples', props.children.ssim.samples])}
            </tbody>
        </table>
    )
}

export class DataTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dynamicData: '{}' };
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.refreshTimer = setInterval(this.fetchData, 4000);
    }

    componentWillUnmount() {
        clearInterval(this.refreshTimer);
    }

    fetchData() {
        //simulate API fetch from server - we'll just create a list with random prices
        var that = this;
        fetch(url + 'getData').then(response =>
            response.json().then(data => ({
                    data: data,
                    status: response.status
                })
            ).then(res => {
                const data = getStats(res.data);
                that.setState({dynamicData: data});
            })
        );
    }
    render() {
        return (
            <Table>{JSON.parse(this.state.dynamicData)}</Table>
        );
    }
}

export class SsimRangeChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = { dynamicData: [] };
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.refreshTimer = setInterval(this.fetchData, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.refreshTimer);
    }

    fetchData() {
        var that = this;
        fetch(url + 'getData').then(response =>
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
                <Bar
                    data={{
                        labels: ["(-INF, 0]","(0, 0.025]",
                            "(0.025, 0.05]","(0.05, 0.075]","(0.075, 0.1]","(0.1, INF)"],
                        datasets: [
                            {
                                label: '# Samples',
                                backgroundColor: 'rgba(0,0,0,0.75)',
                                borderColor: 'rgba(0,0,0,0.75)',
                                borderWidth: 1,
                                hoverBackgroundColor: 'rgba(0,0,0,0.3)',
                                hoverBorderColor: 'rgba(0,0,0,0.3)',
                                data: this.state.dynamicData
                            }
                        ],
                        title: [{label:'Histogram'}]
                    }}
                    width={100}
                    height={600}
                    options={{
                        maintainAspectRatio: false
                    }}
                />
        );
    }
}