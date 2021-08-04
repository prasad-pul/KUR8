import React, { Component } from 'react';
import ZingChart from 'zingchart-react';

export class PodsNotReady extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        type: 'line',
        globals: {
          'font-family': 'Roboto',
        },
        utc: true,
        title: {
          text: 'Pods Not Ready Per Namespace',
          'font-size': '24px',
          'adjust-layout': true,
        },
        globals: {
          'font-family': 'Roboto',
          'background-color': '#3B3B3B',
        },
        plotarea: {
          margin: 'dynamic 45 60 dynamic',
          width: '100%',
          height: '100%',
        },
        plot: {
          animation: {
            effect: 'ANIMATION_SLIDE_LEFT',
            width: '100%',
            height: '100%',
          },
        },
        legend: {
          layout: 'float',
          'background-color': 'none',
          'border-width': 0,
          shadow: 0,
          align: 'center',
          'adjust-layout': true,
          'toggle-action': 'remove',
          item: {
            padding: 7,
            marginRight: 17,
            cursor: 'hand',
          },
        },
        'scale-x': {
          // "min-value" : Date.now() - 86400000,
          'min-value': this.findMin(),
          'max-value': this.findMax(),
          step: 'hour',
          // 'max-items':10,
          zooming: true,

          shadow: 0,
          // "step": 83000,
          transform: {
            type: 'date',
            all: '%D, %d %M<br />%h:%i %A',
            guide: {
              visible: false,
            },
            item: {
              visible: false,
            },
          },
          label: {
            visible: false,
          },
          'minor-ticks': 0,
        },
        'scale-y': {
          'line-color': '#f6f7f8',
          shadow: 0,
          progression: 'log',
          'log-base': Math.E,
          // "type": "line",
          plotarea: {
            'adjust-layout': true,
          },
          guide: {
            'line-style': 'dashed',
          },
          label: {
            text: 'Number of Pods',
          },
          'minor-ticks': 0,
          'thousands-separator': ',',
        },
        'crosshair-x': {
          'line-color': '#efefef',
          'plot-label': {
            'border-radius': '5px',
            'border-width': '1px',
            'border-color': '#f6f7f8',
            padding: '10px',
            'font-weight': 'bold',
          },
          'scale-label': {
            'font-color': '#000',
            'background-color': '#f6f7f8',
            'border-radius': '5px',
          },
        },
        tooltip: {
          visible: false,
        },
        plot: {
          highlight: true,
          'tooltip-text': '%t views: %v<br>%k',
          shadow: 0,
          'line-width': '2px',
          marker: {
            visible: false,
          },
          'highlight-state': {
            'line-width': 3,
          },
          animation: {
            effect: 1,
            sequence: 2,
            speed: 10000,
          },
        },
        series: this.stateFormat(),
      },
    };
    this.chartDone = this.chartDone.bind(this);
  }

  findMax = () => {
    let data = this.props.podNotReady;
    let maximumVal = -Infinity;
    let dataVal;

    for (let i = 0; i < data.length; i++) {
      dataVal = data[i][1];

      for (let j = 0; j < dataVal.length; j++) {
        if (dataVal[j][0] > maximumVal) {
          maximumVal = dataVal[j][0];
        }
      }
    }
    return maximumVal * 1000;
  };

  findMin = () => {
    let data = this.props.podNotReady;
    let minimumVal = Infinity;
    let dataVal;

    for (let i = 0; i < data.length; i++) {
      dataVal = data[i][1];

      for (let j = 0; j < dataVal.length; j++) {
        if (dataVal[j][0] < minimumVal) {
          minimumVal = dataVal[j][0];
        }
      }
    }
    return minimumVal * 1000;
  };

  stateFormat = () => {
    let pathLength = this.props.podNotReady.length;

    let outerContainer = [];
    let eachData = [];
    let seriesObj;
    let value;

    let lineColor = [
      '#FF9AA2',
      '#FFB7B2',
      '#FFDAC1',
      '#E2F0CB',
      '#B5EAD7',
      '#C7CEEA',
      '#9ED2F6',
      '#9DDCE0',
      '#ADD4FF',
    ];
    for (let i = 0; i < pathLength; i++) {
      value = this.props.podNotReady[i][1];

      for (let j = 0; j < value.length; j++) {
        eachData.push([Number(value[j][0]) * 1000, Number(value[j][1])]);
      }

      seriesObj = {
        values: eachData,
        text: `${this.props.podNotReady[i][0]}`,
        'line-color': lineColor[i % lineColor.length],
        'legend-item': {
          'background-color': lineColor[i % lineColor.length],
          borderRadius: 5,
          'font-color': 'black',
        },
        'legend-marker': {
          visible: false,
        },
        marker: {
          'background-color': lineColor[i % lineColor.length],
          'border-width': 1,
          shadow: 0,
          'border-color': '#69dbf1',
        },
        'highlight-marker': {
          size: 6,
          'background-color': lineColor[i % lineColor.length],
        },
      };
      outerContainer.push(seriesObj);
      eachData = [];
    }
    return outerContainer;
  };

  render() {
    return (
      <div>
        <ZingChart data={this.state.config} complete={this.chartDone} />
      </div>
    );
  }
  chartDone(event) {
    console.log(`Event "Complete" - The chart is rendered\n`);
  }
}

export default PodsNotReady;
