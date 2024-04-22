import * as React from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Box from '@mui/material/Box';

function PriceHistory({priceHistory}) {
    // console.log(priceHistory[0].time)

    // This function will parse the priceHistory to get dates and prices
    const parseData = (data) => {
        return data.map(item => ({
            x: new Date(item.time).getDate(),  // Convert date to a timestamp for better handling
            y: item.price
        }));
    };

    const xAxisData = parseData(priceHistory).map(point => point.x);
    const seriesData = parseData(priceHistory).map(point => point.y);

    return (
    <Box>
        <LineChart
        xAxis={[{type: 'time', data: xAxisData }]}
        series={[
            {
                data: seriesData,
            },
        ]}
        width={500}
        height={300}
        />
        <LineChart
            xAxis={[{ type: 'time', data: xAxisData }]}  // Specify that the x-axis should treat data as time
            series={[
                {
                    data: seriesData.map((y, index) => ({ x: xAxisData[index], y })), // Combine x and y for plotting
                },
            ]}
            width={500}
            height={300}
            options={{
                scales: {
                    x: {
                        type: 'time',  // Ensures the x-axis is treated as time scale
                        time: {
                            unit: 'month'  // Sets the scale unit to months for better readability
                        }
                    }
                }
            }}
        />
    </Box>
    );
}

export default PriceHistory;