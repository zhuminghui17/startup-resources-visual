import { Chart } from 'chart.js/auto';

window.Webflow ||= [];
window.Webflow.push(() => {
  fetchData().then((data) => {
    const { records } = data;
    const dic = {}; // stage: array of entries

    // Count occurrences
    records.forEach((entry) => {
      const stageArray = entry.fields['Stage'];
      stageArray.forEach((stage) => {
        if (dic[stage] === undefined) {
          dic[stage] = [];
        }
        dic[stage].push(entry);
      });
    });

    // Create a Chart.js chart to visualize the counts
    const ctx = document.querySelector<HTMLCanvasElement>('[data-element="chart-1"]');
    if (!ctx) throw new Error('Could not find chart-1 element');

    new Chart(ctx, {
      type: 'bubble',
      data: {
        // label: 'x',
        datasets: [
          {
            label: 'Points',
            data: dic['Startup Formed'].map((entry) => ({
              x: Math.random() * 10,
              y: Math.random() * 100,
              r: Math.random() * 20,
              name: entry.fields['Resource Name'],
            })),
            // backgroundColor: ['rgba(255, 99, 132, 0.5)', 'rgba(75, 192, 192, 0.5)'],
            // borderColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                const { name } = context.dataset.data[context.dataIndex];

                return `${name}`;
              },
            },
          },
        },
      },
    });
  });
});

const fetchData = async () => {
  try {
    const response = await fetch('http://127.0.0.1:5000/fetchData');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
