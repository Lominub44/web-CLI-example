const output = document.getElementById('output');
const input = document.getElementById('commandInput');
const user = "user"; // set the username to "user"
input.value = `${user}$ `; // write the username to the command-prompt

input.addEventListener('keyup', function(event) {
    event.preventDefault(); // Prevent the default behavior of the enter key
    if (event.key === 'Enter') {
        const command = input.value.trim().substring(user.length + 2); // Entferne den Benutzernamen und das Leerzeichen
        if (command !== '') { // check, if a prompt was typed
            output.innerHTML += `<p>${user}$ ${command}</p>`; // Display entered command
            executeCommand(command);
        }
        input.value = `${user}$ `; // reset the username
    }
});

function executeCommand(command) {
    const args = command.split(' ');
    const cmd = args[0].toLowerCase();
    switch (cmd) {
        case 'help':
            showHelp();
            break;
        case 'clear':
            clearOutput();
            break;
        case 'date':
            showDate();
            break;
        case 'echo':
            echo(args.slice(1).join(' '));
            break;
        case 'search':
            if (args.length > 1) {
                search(args.slice(1).join(' '));
            } else {
                output.innerHTML += `<p>Usage: search [query]</p>`;
            }
            break;
        case 'open':
            if (args.length > 1) {
                openUrl(args[1]);
            } else {
                output.innerHTML += `<p>Usage: open [url]</p>`;
            }
            break;
        case 'random':
            showRandomNumber();
            break;
        case 'weather':
            if (args.length > 1) {
                getWeather(args.slice(1).join(' '));
            } else {
                output.innerHTML += `<p>Usage: weather [city]</p>`;
            }
            break;
        case 'timer':
            if (args.length > 1 && !isNaN(args[1])) {
                startTimer(parseInt(args[1]));
            } else {
                output.innerHTML += `<p>Usage: timer [seconds]</p>`;
            }
            break;
	case 'web':
            if (args.length > 1) {
                web(args[1]);
            } else {
                output.innerHTML += `<p>Usage: web [url]</p>`;
            }
            break;
	

        default:
            output.innerHTML += `<p>Command not recognized: ${command}</p>`;
    }

    // Scroll to the bottom of the output
    output.scrollTop = output.scrollHeight;
}

function showHelp() {
    output.innerHTML += `
        <p>Available commands:</p>
        <ul>
            <li>help - Display this help message</li>
            <li>clear - Clear the output</li>
            <li>date - Display the current date and time</li>
            <li>echo [message] - Display a message</li>
            <li>search [query] - Perform a Google search</li>
            <li>open [url] - Open a URL in a new tab</li>
            <li>random - Generate a random number</li>
            <li>weather [city] - Display weather information for the specified city</li>
            <li>timer [seconds] - Start a timer for the specified number of seconds</li>
	    <li>web [url] - Create a web-display in your CLI</li>
        </ul>
    `;
}

function clearOutput() {
    output.innerHTML = '';
}

function showDate() {
    const currentDate = new Date().toLocaleString();
    output.innerHTML += `<p>${currentDate}</p>`;
}

function echo(message) {
    output.innerHTML += `<p>${message}</p>`;
}

function search(query) {
    window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
}

function openUrl(url) {
    window.open(url, '_blank');
}

function showRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    output.innerHTML += `<p>Random number: ${randomNumber}</p>`;
}

function getWeather(city) {
    // Implement logic to fetch weather information from an API
    // This is just a funny placeholder
    output.innerHTML += `<p>Weather information for ${city}: Sunny</p>`;
}

function startTimer(seconds) {
    output.innerHTML += `<p>Timer started for ${seconds} seconds</p>`;
    setTimeout(() => {
        output.innerHTML += `<p>Timer expired after ${seconds} seconds</p>`;
    }, seconds * 1000);
}

function web(url) {
    const webCode = `<iframe src="${url}" width="100%" height="800px" frameborder="0"></iframe>`;
    output.innerHTML += webCode;
}



