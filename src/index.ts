import { Chart } from 'chart.js/auto';

window.Webflow ||= [];
window.Webflow.push(() => {
  fetchData().then((data) => {
    const { records } = data;
    const dic = {}; // stage: array of entries

    const categories = [
      'Funding',
      'Space',
      'Program',
      'Course',
      'Mentorship',
      'Internship',
      'Incubator/Accelerator',
    ];

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
    const ctx1 = document.querySelector<HTMLCanvasElement>('[data-element="chart-1"]');
    if (!ctx1) throw new Error('Could not find chart-1 element');

    const ctx2 = document.querySelector<HTMLCanvasElement>('[data-element="chart-2"]');
    if (!ctx2) throw new Error('Could not find chart-2 element');

    const ctx3 = document.querySelector<HTMLCanvasElement>('[data-element="chart-3"]');
    if (!ctx3) throw new Error('Could not find chart-3 element');

    const ctx4 = document.querySelector<HTMLCanvasElement>('[data-element="chart-4"]');
    if (!ctx4) throw new Error('Could not find chart-4 element');

    const ctx5 = document.querySelector<HTMLCanvasElement>('[data-element="chart-5"]');
    if (!ctx5) throw new Error('Could not find chart-5 element');

    createChart(ctx1, dic, 'Learning');
    createChart(ctx2, dic, 'Fuzzy Idea');
    createChart(ctx3, dic, 'Fuzzy Startup');
    createChart(ctx4, dic, 'Defined Startup');
    createChart(ctx5, dic, 'Startup Formed');
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

function createChart(ctx, dic, dicField) {
  const datasetData = dic[dicField].map((entry) => ({
    x: Math.random() * 10,
    y: Math.random() * 100,
    r: Math.random() * 10,
    name: entry.fields['Resource Name'],
    link: entry.fields['Link to Resource'],
    category: entry.fields['Category'],
  }));

  return new Chart(ctx, {
    type: 'bubble',
    data: {
      datasets: [
        {
          label: 'Funding',
          // category: 'Funding',
          data: datasetData.filter((entry) => entry.category === 'Funding'),
          borderWidth: 1,
        },
        {
          label: 'Space',
          // category: 'Funding',
          data: datasetData.filter((entry) => entry.category === 'Space'),
          borderWidth: 1,
        },
        {
          label: 'Program',
          // category: 'Funding',
          data: datasetData.filter((entry) => entry.category === 'Program'),
          borderWidth: 1,
        },
        {
          label: 'Course',
          // category: 'Funding',
          data: datasetData.filter((entry) => entry.category === 'Course'),
          borderWidth: 1,
        },
        {
          label: 'Incubator/Accelerator',
          // category: 'Funding',
          data: datasetData.filter((entry) => entry.category === 'Incubator/Accelerator'),
          borderWidth: 1,
        },
      ],
    },
    options: {
      animation: {
        duration: 1500, // Animation duration in milliseconds
        easing: 'easeInBounce', // Easing function for the animation (optional)
      },
      aspectRatio: 0.6,
      scales: {
        x: {
          // Configure the x-axis (horizontal)
          display: true, // Hide the x-axis labels
          title: {
            display: true,
            text: 'Stage',
          },
        },
        y: {
          // Configure the y-axis (vertical)
          beginAtZero: true, // Start the axis at zero
          display: false, // Hide the y-axis labels
          grid: {
            display: false,
          },
          title: {
            display: true,
            text: 'Values',
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: dicField,
        },
        legend: {
          display: true, // Set display to false to hide the legend
        },
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
}
