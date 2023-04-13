

(async function() {
  const data = [
    { day: 'mon', amount: 17.45 },
    { day: 'tue', amount: 34.91 },
    { day: 'wed', amount: 52.36 },
    { day: 'thu', amount: 31.07 },
    { day: 'fri', amount: 23.39 },
    { day: 'sat', amount: 43.28 },
    { day: 'sun', amount: 25.48 },
  ];

  // const maxAmount = Math.max(...data.map(row => row.amount));
  const today = new Date().toLocaleDateString('en-US', {weekday: 'short'}).toLowerCase();
  const ctx = document.getElementById("myChart");

  new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(row => row.day),
        datasets: [
          {
            label: '',
            data: data.map(row => row.amount),
            backgroundColor: (context) => {
              const dayOfWeek = data[context.dataIndex].day.toLowerCase();
              if (dayOfWeek === today) {
                return 'hsl(186, 34%, 60%)';
              } else {
                return 'hsl(10, 79%, 65%)';
              }
            },
            hoverBackgroundColor: function(context) {
              const dayOfWeek = data[context.dataIndex].day.toLowerCase();
              if (dayOfWeek === today) {
                return 'hsl(186, 34%, 65%, 0.7)';
              } 
              else {
                return 'hsl(10, 79%, 65%, 0.7)';
              }
            },
            borderSkipped: false,
            borderRadius: 3
          }
        ]
      },
      options: {
        layout: {
          padding: {
            top: 10
          },
        },
        scales: {
          x: {
            ticks: {
              color: 'hsl(28, 10%, 53%)',
            },
            grid: {
              display: false
            },
            border: {
              display: false
            }
          },
          y: {
            display: false
          }
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            xAlign: 'center',
            yAlign: 'bottom',
            callbacks: {
              title: () => null,
              label: function(context) {
                  let label = context.dataset.label;

                  if (label) {
                      label += ': ';
                  }
                  if (context.parsed.y !== null) {
                      label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                  }
                  return label;
              }
          },
            displayColors: false,
            caretSize: 0,
          }
        },
        
      }
    }
  );
})();
