document.addEventListener("DOMContentLoaded", function() {
    const svg = d3.select("svg"),
          width = +svg.attr("width"),
          height = +svg.attr("height");
  
    const nodes = [
        // Input neurons
        { id: 1, layer: "input", html: `<div class="input-group">
        <label for="chanceOfRain">Chance of Rain:</label>
        <input type="range" id="chanceOfRain" name="chanceOfRain" min="0" max="1" step="0.01" value="0.5" onmousedown="event.stopPropagation()" oninput="updateValue(this)">
        <span class="slider-value" id="chanceOfRainValue">0.5</span>
    </div>`},
        { id: 2, layer: "input", html: `<div class="input-group">
        <label for="temperature">Temperature (Celsius):</label>
        <input type="range" id="temperature" name="temperature" min="-10" max="40" step="1" value="20" onmousedown="event.stopPropagation()"  oninput="updateValue(this)">
        <span class="slider-value" id="temperatureValue">20</span>
    </div>`},
        { id: 3, layer: "input", html: `<div class="input-group">
        <label for="windSpeed">Wind Speed (km/h):</label>
        <input type="range" id="windSpeed" name="windSpeed" min="0" max="100" step="1" value="5" onmousedown="event.stopPropagation()" oninput="updateValue(this)">
        <span class="slider-value" id="windSpeedValue">5</span>
    </div>`}, 
        { id: 4, layer: "input", html: `<div class="input-group">
        <label for="bodyTemperature">Body Temperature (Celsius):</label>
        <input type="range" id="bodyTemperature" name="bodyTemperature" min="35" max="42" step="0.1" value="36.6" onmousedown="event.stopPropagation()" oninput="updateValue(this)">
        <span class="slider-value" id="bodyTemperatureValue">36.6</span>
    </div>`},
        { id: 5, layer: "input", html: `<div class="input-group">
        <label for="coughRate">Cough Rate (per hour):</label>
        <input type="range" id="coughRate" name="coughRate" min="0" max="20" step="1" value="0"  onmousedown="event.stopPropagation()" oninput="updateValue(this)">
        <span class="slider-value" id="coughRateValue">0</span>
    </div>`},
        { id: 6, layer: "input", html: `<div class="input-group">
        <label>
            <input type="checkbox" id="bankHoliday" name="bankHoliday" onchange="calculateDecision()">
            Bank Holiday?
        </label>
    </div>`},
        { id: 7, layer: "input", html: `<div class="input-group">
        <label for="dayOfWeek">Day of Week:</label>
        <select id="dayOfWeek" name="dayOfWeek" onchange="calculateDecision()">
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
            <option value="6">Saturday</option>
            <option value="7">Sunday</option>
        </select>
    </div>`},
        { id: 8, layer: "input", html: `<div class="input-group">
        <label>
            <input type="checkbox" id="tubeStrike" name="tubeStrike" onchange="calculateDecision()">
            Tube Strike?
        </label>
    </div>`},
        { id: 9, layer: "input", html: `<div class="input-group">
        <label>
            <input type="checkbox" id="trainStrike" name="trainStrike" onchange="calculateDecision()">
            Train Strike?
        </label>
    </div>`},
        { id: 10, layer: "input", html: `<div class="input-group">
        <label for="distanceFromOffice">Distance from Office (km):</label>
        <input type="range" id="distanceFromOffice" name="distanceFromOffice" min="0" max="50" step="1" value="1" onmousedown="event.stopPropagation()" oninput="updateValue(this)">
        <span class="slider-value" id="distanceFromOfficeValue">1</span>
    </div>`},
        { id: 11, layer: "input", html: `<div class="input-group">
        <label for="numberOfMeetings">Number of Meetings:</label>
        <input type="range" id="numberOfMeetings" name="numberOfMeetings" min="0" max="10" step="1" value="5" onmousedown="event.stopPropagation()" oninput="updateValue(this)">
        <span class="slider-value" id="numberOfMeetingsValue">5</span>
    </div>`},
        { id: 12, layer: "input", html: `<div class="input-group">
        <label for="internetStatus">Home Internet Status (out of 5):</label>
        <input type="range" id="internetStatus" name="internetStatus" min="0" max="5" step="1" value="3" onmousedown="event.stopPropagation()" oninput="updateValue(this)">
        <span class="slider-value" id="internetStatusValue">3</span>
    </div>` },
        
        // Hidden layer neurons
        { id: 13, layer: "hidden", text: "Neuron 1", html: `<div class="neuron-box" id="neuron1Box">
                Neuron 1: <span id="neuron1">-21.9</span> <span id="neuron1Scaled"></span>
               <input type="text" id="neuron1Text" class="neuron-text" placeholder="Function...">
           </div>`},
        { id: 14, layer: "hidden", text: "Neuron 2", html: `<div class="neuron-box" id="neuron2Box">
                Neuron 2: <span id="neuron2">-1.5</span> <span id="neuron2Scaled"></span>
                <input type="text" id="neuron2Text" class="neuron-text" placeholder="Function...">
           </div>`},
        { id: 15, layer: "hidden", text: "Neuron 3", html: `<div class="neuron-box" id="neuron3Box">
               Neuron 3: <span id="neuron3">-4</span> <span id="neuron3Scaled"></span>
               <input type="text" id="neuron3Text" class="neuron-text" placeholder="Function...">
           </div>`}, 
        { id: 16, layer: "hidden", text: "Neuron 4", html: `<div class="neuron-box" id="neuron4Box">
               Neuron 4: <span id="neuron4">-3</span> <span id="neuron4Scaled"></span>
               <input type="text" id="neuron4Text" class="neuron-text" placeholder="Function...">
            </div>`},
        { id: 17, layer: "hidden", text: "Neuron 5", html: `<div class="neuron-box" id="neuron5Box">
                Neuron 5: <span id="neuron5">-2.9</span> <span id="neuron5Scaled"></span>
               <input type="text" id="neuron5Text" class="neuron-text" placeholder="Function...">
            </div>` },
        
        // Output neuron
        { id: 18, layer: "output", text: "Output", html: `<div class="result" id="result">
            <strong>Output: </strong>
            <span id="output">0</span>
            <strong>Decision: </strong>
            <span id="decision">Should I go to the office?</span>
        </div>`}
    ];

    const links = [
        // Input to hidden layer links
        ...nodes.filter(n => n.layer === "input").map(input => ({ source: input.id, target: 13 })),
        ...nodes.filter(n => n.layer === "input").map(input => ({ source: input.id, target: 14 })),
        ...nodes.filter(n => n.layer === "input").map(input => ({ source: input.id, target: 15 })),
        ...nodes.filter(n => n.layer === "input").map(input => ({ source: input.id, target: 16 })),
        ...nodes.filter(n => n.layer === "input").map(input => ({ source: input.id, target: 17 })),
        
        // Hidden layer to output neuron links
        { source: 13, target: 18 }, { source: 14, target: 18 }, 
        { source: 15, target: 18 }, { source: 16, target: 18 }, 
        { source: 17, target: 18 }
    ];

    // Layout settings
    const layerX = {
        input: width / 6,
        hidden: width / 2,
        output: 5 * width / 6
    };

    const layerY = {
        input: d3.range(12).map(i => (i + 1) * height / 13),
        hidden: d3.range(5).map(i => (i + 1) * height / 7),
        output: [height / 2]
    };

    nodes.forEach(node => {
        node.x = layerX[node.layer];
        node.y = layerY[node.layer].shift();
    });

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(300))
        .force("charge", d3.forceManyBody().strength(-1000))
        .force("x", d3.forceX(d => layerX[d.layer]).strength(1))
        .stop();  // Stop automatic simulation, since we set positions manually

    const chaser = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("class", "chaser");
  
    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("class", "link");

    const node = svg.append("g")
    .attr("class", "nodes")
    .selectAll("g")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node")
    .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

 
  
    

node.filter(d => d)
    .append("foreignObject")
    .attr("x", -100)
    .attr("y", -20)
    .attr("width", 150)
    .attr("height", 100)
    .append("xhtml:div")
    .style("width", "100%")
    .style("height", "100%")
    .style("display", "flex")
    .style("justify-content", "center")
    .style("align-items", "center")
    .style("font-size", "11px")
    .style("color", "black")
    .html(d => d.html);


    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("transform", d => `translate(${d.x},${d.y})`);
    });

    simulation.alpha(1).restart();  // Restart simulation to apply forces

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
    // Define the boundaries for each layer
    const layerBoundaries = {
        input: { minX: 0, maxX: width / 3 },
        hidden: { minX: width / 3, maxX: 2 * width / 3 },
        output: { minX: 2 * width / 3, maxX: width }
    };

    const bounds = layerBoundaries[d.layer];

    // Ensure the neuron stays within its designated area
    d.fx = Math.max(bounds.minX, Math.min(bounds.maxX, event.x));
    d.fy = Math.max(0, Math.min(height, event.y));
}


    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = d.x;
        d.fy = d.y;
    }
});

function updateValue(slider) {
            document.getElementById(slider.id + 'Value').textContent = slider.value;
            calculateDecision();
        }

        function calculateDecision() {
            // Simulate the decision calculation based on the input values
            const chanceOfRain = parseFloat(document.getElementById('chanceOfRain').value);
            const temperature = parseFloat(document.getElementById('temperature').value);
            const windSpeed = parseFloat(document.getElementById('windSpeed').value);
            const bodyTemperature = parseFloat(document.getElementById('bodyTemperature').value);
            const coughRate = parseFloat(document.getElementById('coughRate').value);
            const bankHoliday = document.getElementById('bankHoliday').checked ? 1 : 0;
            const dayOfWeek = parseInt(document.getElementById('dayOfWeek').value);
            const tubeStrike = document.getElementById('tubeStrike').checked ? 1 : 0;
            const trainStrike = document.getElementById('trainStrike').checked ? 1 : 0;
            const distanceFromOffice = parseFloat(document.getElementById('distanceFromOffice').value);
            const numberOfMeetings = parseFloat(document.getElementById('numberOfMeetings').value);
            const internetStatus = parseFloat(document.getElementById('internetStatus').value);

            // Simulate neuron activations
            const neuronActivations = [
                chanceOfRain * 10 - temperature + windSpeed * 0.7 + tubeStrike + trainStrike + distanceFromOffice - 10,
                10 * bankHoliday + dayOfWeek - 5,
                bodyTemperature + 0.5 * coughRate - 37.5,
                numberOfMeetings - 2 * internetStatus - 2,
                2 * tubeStrike + 2 * trainStrike + 0.1 * distanceFromOffice - 3
            ];

            // Update the neuron activation values
            for (let i = 1; i <= 5; i++) {
                const activation = neuronActivations[i-1].toFixed(1);
                const scaledActivation = Math.max(0, neuronActivations[i-1]).toFixed(1);
                document.getElementById(`neuron${i}`).textContent = activation;
                if (scaledActivation > 0) {
                    document.getElementById(`neuron${i}Scaled`).textContent = "ACTIVE";
                } else {
                    document.getElementById(`neuron${i}Scaled`).textContent = "(Inactive)";
                }

                const neuronBox = document.getElementById(`neuron${i}Box`);
                neuronBox.style.backgroundColor = getColorForActivation(activation);
            }

            // Determine the decision based on the scaled neuron values
            const output = 10 - Math.max(0, neuronActivations[0]) - 20 * Math.max(0, neuronActivations[1]) - 5 * Math.max(0, neuronActivations[2]) + 2 * Math.max(0, neuronActivations[3]) - 20 * Math.max(0, neuronActivations[4])
            let decision = "No";
            if (output >= 1) {
                decision = "Yes";
            }
            document.getElementById('result').style.backgroundColor = getColorForActivation(output)
            document.getElementById('output').textContent = output.toFixed(2);
            document.getElementById('decision').textContent = decision;
        }
        
         function getColorForActivation(value) {
            const num = parseFloat(value);
            if (num < 0) {
                return `rgb(255, ${255 + Math.round(num * 10)}, ${255 + Math.round(num * 10)})`;
            } else if (num > 0) {
                return `rgb(${255 - Math.round(num * 10)}, 255, ${255 - Math.round(num * 10)})`;
            } else {
                return 'rgb(255, 245, 245)';
            }
        }

        // Initialize the decision on page load
        calculateDecision();
